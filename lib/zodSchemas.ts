import { z } from "zod";
export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Tiêu đề phải dài ít nhất 3 ký tự" })
    .max(100, { message: "Tiêu đề phải dài tối đa 100 ký tự" }),
  description: z.string().min(3, { message: "Mô tả phải dài ít nhất 3 ký tự" }),
  fileKey: z.string().min(1, { message: "File là bắt buộc" }),
  price: z.coerce.number().min(1, { message: "Giá phải là một số dương" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Thời gian phải ít nhất 1 giờ" })
    .max(500, { message: "Thời gian phải tối đa 500 giờ" }),
  level: z.enum(courseLevels, { message: "Cấp độ là bắt buộc" }),
  category: z.enum(courseCategories, { message: "Danh mục là bắt buộc" }),
  smallDescription: z
    .string()
    .min(3, { message: "Mô tả ngắn phải dài ít nhất 3 ký tự" })
    .max(200, {
      message: "Mô tả ngắn phải dài tối đa 200 ký tự",
    }),
  slug: z.string().min(3, { message: "Slug phải dài ít nhất 3 ký tự" }),
  status: z.enum(courseStatus, { message: "Trạng thái là bắt buộc" }),
});

export const chapterSchema = z.object({
  name: z.string().min(3, { message: "Tên phải dài ít nhất 3 ký tự" }),
  courseId: z.string().uuid({ message: "ID khóa học không hợp lệ" }),
});

export const lessonSchema = z.object({
  name: z.string().min(3, { message: "Tên phải dài ít nhất 3 ký tự" }),
  courseId: z.string().uuid({ message: "ID khóa học không hợp lệ" }),
  chapterId: z.string().uuid({ message: "ID chương không hợp lệ" }),
  description: z
    .string()
    .min(3, { message: "Mô tả phải dài ít nhất 3 ký tự" })
    .optional(),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
