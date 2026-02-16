"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
const NavbarDropdown = ({ session, dashboardUrl }) => {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none focus:ring-0">
          <div className="relative group">
            <Image
              src={session?.user?.image || "/placeholder.webp"}
              loading="eager"
              alt="User"
              width={100}
              height={100}
              className="rounded-full w-10 h-10 cursor-pointer border-2 border-white shadow-lg group-hover:border-green-500 transition-all duration-500"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
          className="w-56 p-2 dark:bg-slate-800 bg-slate-100 border border-green-800 dark:border-green-500 rounded-xs shadow-xl z-50"
        >
          <div className="px-4 py-3 border-b border-slate-50 mb-2">
            <DropdownMenuLabel className="p-0 font-black dark:text-gray-200 text-slate-600 text-sm">
              {session?.user?.name || "Guest"}
            </DropdownMenuLabel>
            <p className="text-xs font-bold dark:text-gray-400 text-slate-400 mt-0.5">
              {session?.user?.email}
            </p>
          </div>

          <DropdownMenuItem className="rounded-xs px-4 overflow-hidden bg-transparent focus:bg-transparent hover:bg-transparent">
            <a
              href={`${dashboardUrl}/my-profile`}
              target="_blank"
              className="font-semibold dark:text-gray-200 text-slate-600 hover:text-green-600 transition-colors duration-500"
            >
              My Profile
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem className="rounded-xs px-4 overflow-hidden bg-transparent focus:bg-transparent hover:bg-transparent ">
            <a
              href={`${dashboardUrl}`}
              target="_blank"
              className="font-semibold dark:text-gray-200 text-slate-600 hover:text-green-600 transition-colors duration-500"
            >
              Dashboard
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem className="rounded-xs px-4 overflow-hidden bg-transparent focus:bg-transparent hover:bg-transparent">
            <button
              onClick={handleSignOut}
              className="font-semibold dark:text-gray-200 text-slate-600 hover:text-green-600 transition-colors duration-500 cursor-pointer"
            >
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarDropdown;
