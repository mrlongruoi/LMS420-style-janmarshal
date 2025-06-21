import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Khóa học của bạn</h1>
        <Link className={buttonVariants()} href="/admin/courses/create">
          Tạo khóa học
        </Link>
      </div>
      <div>
        <h1>Ở đây bạn sẽ thấy tất cả các khóa học</h1>
      </div>
    </>
  );
}
