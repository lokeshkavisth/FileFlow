import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { PiHardDrivesFill } from "react-icons/pi";
import { ModeToggle } from "./toggle-mode";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  return (
    <header className="border-b  sticky top-0 z-10 backdrop-blur bg-background w-full">
      <section className="flex h-14 items-center justify-between max-w-[100rem] mx-auto">
        <Link href={"/"} className="flex items-center gap-2">
          <PiHardDrivesFill className="size-6" />
          <h2>FileFlow</h2>
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
          <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal">
              <Button variant={"outline"}>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </section>
    </header>
  );
};

export default Header;
