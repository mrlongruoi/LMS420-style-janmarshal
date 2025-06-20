"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { GithubIcon, Loader, Loader2, Send } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Đăng nhập bằng Github, bạn sẽ được chuyển hướng...");
          },
          onError: () => {
            toast.error("Lỗi máy chủ nội bộ");
          },
        },
      });
    });
  }
  function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email đã gửi");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Lỗi gửi email");
          },
        },
      });
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Chào mừng bạn trở lại!</CardTitle>
        <CardDescription>
          Đăng nhập bằng Email hoặc tài khoản GitHub của bạn
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          className="w-full"
          variant="outline"
        >
          {githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Đang tải...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Đăng nhập bằng Github
            </>
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Hoặc tiếp tục với
          </span>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@example.com"
              required
            />
          </div>
          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Đang tải...</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>Tiếp tục với Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
