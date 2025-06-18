"use client";

import { ThemeToggle } from "@/components/ui/themeToggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success('Singed out successfully');
        },
      },
    });
  }
  return (
    <>
        <section className="relative py-20">
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge>
                The Future of Online Education
            </Badge>
          </div>
        </section>
    </>
  );
}
