"use client";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Maincontent } from "@/components/Maincontent";
function page() {
  return (
    <div data-theme="black" className="font-DM">
      <Navbar />
      <Hero />
    </div>
  );
}
// data-theme="black"
export default page;
