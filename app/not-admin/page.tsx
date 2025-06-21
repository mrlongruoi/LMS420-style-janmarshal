import Link from "next/link";
import { ArrowLeft, ShieldX } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export default function NotAdminRoute() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 rounded-full p-4 w-fil mx-auto">
            <ShieldX className="sizr-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Truy cập bị hạn chế</CardTitle>
          <CardDescription className="max-w-xs mx-auto">
            Chào! Bạn không phải là quản trị viên, có nghĩa là bạn không thể tạo
            bất kỳ khóa học nào Hoặc những thứ như vậy...
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Link href="/" className={buttonVariants({
                className: 'w-full',
            })}>
            <ArrowLeft className="mr-1 size-4"/>
                Quay lại trang chủ
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
