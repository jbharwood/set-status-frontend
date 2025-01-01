"use client";

import { UserButton } from "@clerk/nextjs";
import { useClerkTheme } from "@/hooks/index";

export default function NavBar() {
  const { clerkTheme } = useClerkTheme();

  return (
    <nav className="bg-gray-800 p-4 h-[5%]">
      <div className="flex items-center h-full">
        <div className="text-white text-lg font-semibold">Set Status</div>
        <div className="space-x-2 flex ml-auto">
          <div className="mt-1 space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </div>
          <div className="mt-1.5"></div>
          <div className="mt-2">
            <UserButton
              appearance={{
                baseTheme: clerkTheme,
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
