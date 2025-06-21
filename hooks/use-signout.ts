"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function useSignOut() {
    const router = useRouter();
    const handleSignOut = async function signOut() {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
              toast.success("Đăng xuất thành công");
            },
            onError: () => {
              toast.error("Đăng xuất thất bại");
            },
          },
        });
      }
    return (
        handleSignOut
    )
};