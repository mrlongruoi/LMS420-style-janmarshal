import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/public/logo.png"; // Adjust the path as necessary

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          className="flex items-center gap-2 self-center font-medium"
          href="/"
        >
          <Image src={Logo} width={32} height={32} alt="Logo" />
          MrlongLMS.
        </Link>
        {children}
        <div className="text-balance text-center text-xs text-muted-foreground">
          Bằng cách nhấp vào tiếp tục, bạn đồng ý với{" "}
          <span className="hover:text-primary hover:underline">
            Điều khoản dịch vụ
          </span>{" "}
          và{" "}
          <span className="hover:text-primary hover:underline">
            Chính sách bảo mật
          </span>
          .
        </div>
      </div>
    </div>
  );
}
