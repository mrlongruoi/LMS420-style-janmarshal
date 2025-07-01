"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

export async function editCourse(
  data: CourseSchemaType,
  courseId: string
): Promise<ApiResponse> {
  const user = await requireAdmin();
  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: user.user.id,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Bạn đã bị chặn do giới hạn tỷ lệ",
        };
      } else {
        return {
          status: "error",
          message:
            "Bạn là một bot! Nếu đây là một sai lầm, hãy liên hệ với hỗ trợ của chúng tôi",
        };
      }
    }
    const result = courseSchema.safeParse(data);
    if (!result.success) {
      return {
        status: "error",
        message: "Dữ liệu không hợp lệ",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: "success",
      message: "Khóa học cập nhật thành công",
    };
  } catch {
    return {
      status: "error",
      message: "Đã xảy ra lỗi bất ngờ",
    };
  }
}

export async function reorderLessons(
  chapterId: string,
  lessons: { id: string; position: number }[],
  courseId: string
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: "error",
        message: "Không có bài học được cung cấp để sắp xếp lại",
      };
    }

    const updates = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId: chapterId,
        },
        data: {
          position: lesson.position,
        },
      })
    );

    await prisma.$transaction(updates);
    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Bài học sắp xếp lại thành công",
    };
  } catch {
    return {
      status: "error",
      message: "Không thể sắp xếp lại các bài học",
    };
  }
}

export async function reorderChapters(
  courseId: string,
  chapters: { id: string; position: number }[]
): Promise<ApiResponse> {
  await requireAdmin();
  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: "error",
        message: "Không có chương nào được cung cấp để sắp xếp lại.",
      };
    }

    const updates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId: courseId,
        },
        data: {
          position: chapter.position,
        },
      })
    );

    await prisma.$transaction(updates);
    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Các chương sắp xếp lại thành công",
    };
  } catch {
    return {
      status: "error",
      message: "Không thể sắp xếp lại các chương",
    };
  }
}
