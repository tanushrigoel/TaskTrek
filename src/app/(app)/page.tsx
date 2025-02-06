"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import "@/app/globals.css";
import { redirect } from "next/navigation";
function page() {
  const handleSignIn = async () => {
    signIn("google", {
      callbackUrl: `${window.location.origin}/list`,
    });
  };

  return (
    <div>
      <Button variant="outline" onClick={handleSignIn}>
        Get Started
      </Button>
    </div>
  );
}

export default page;
