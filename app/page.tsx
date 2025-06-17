"use client";

import { ThemeToggle } from "@/components/ui/themeToggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    <div className="p-24">
      <h1 className="text-2xl font-bold text-red-500">Helo</h1>
      <ThemeToggle />
      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Logout</Button>
        </div>
      ) : (
        <Button>Login</Button>
      )}
    </div>
  );
}
