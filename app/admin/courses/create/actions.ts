"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { CourseSchemaType, courseSchema } from "@/lib/zodSchemas";

export async function CreateCourse(values: CourseSchemaType): Promise<ApiResponse> {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        const validation = courseSchema.safeParse(values);
        if(!validation.success){
            return {
                status: "error",
                message: "Invalid Form Data",
            }
        }
        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session?.user.id as string,
            }
        })

        return {
            status: "success",
            message: "Course created successfully",
        }
    } catch (error) {
        return {
            status: "error",
            message: "Failed to create course",
        }
    }
};

