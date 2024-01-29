import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./toggle-mode";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  return (
    <header className="border-b py-4 sticky top-0 z-10 backdrop-blur bg-background w-full">
      <section className="flex items-center justify-between max-w-[100rem] mx-auto">
        <Link href={"/"} className="flex items-center">
          <div>
            <Image
              src={
                "https://download.logo.wine/logo/Google_Storage/Google_Storage-Logo.wine.png"
              }
              alt="FileFlow"
              width={40}
              height={40}
              className="mr-1 aspect-square object-cover"
            />
          </div>
          <h2>FileFlow</h2>
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
          <SignedOut>
            <Button>
              <SignInButton afterSignInUrl="/dashboard" mode="modal" />
            </Button>
          </SignedOut>
        </div>
      </section>
    </header>
  );
};

export default Header;
