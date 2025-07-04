"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "./UserDropdown";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex min-h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <Image src={Logo} alt="Logo" className="size-9" />
          <span className="font-bold">MrlongLMS.</span>
        </Link>
        {/* destop navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                image={session?.user.image ??
                    `https://avatar.vercel.sh/${session?.user.email}`}
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session?.user.email.split("@")[0]
                }
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Đăng nhập
                </Link>
                <Link href="/login" className={buttonVariants()}>
                  Bắt đầu
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
