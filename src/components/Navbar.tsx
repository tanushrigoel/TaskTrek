import React from "react";
import logoImage from "@/components/images/logosaas.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
function Navbar() {
    const handleSignIn = async () => {
        signIn("google", {
          callbackUrl: `${window.location.origin}/list`,
        });
      };
  return (
    <div className="container px-4">
      <div className="py-4 flex items-center justify-between">
        <div className="relative">
          <div className="absolute w-full top-2 bottom-0 left-2 bg-gradient-to-r from-[#F87BFF] via-[#FB92CF] via-[#FFDD9B] via-[#C2F0B1] to-[#2FD8FE] blur-md"></div>
          <Image
            src={logoImage}
            alt="logo-image"
            className="h-12 w-12 relative"
          />
        </div>
        <div>
          <Button onClick={handleSignIn} className="bg-white py-2 px-4 rounded-lg text-black border-none hover:bg-white">
            Login / Signup
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
