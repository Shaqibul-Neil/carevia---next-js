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
const NavbarDropdown = ({ session }) => {
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
          className="w-56 p-2 bg-slate-800 border border-green-500 rounded-xl shadow-xl z-50"
        >
          <div className="px-4 py-3 border-b border-slate-50 mb-2">
            <DropdownMenuLabel className="p-0 font-black text-gray-200 text-sm">
              {session?.user?.name || "Guest"}
            </DropdownMenuLabel>
            <p className="text-xs font-bold text-slate-400 mt-0.5">
              {session?.user?.email}
            </p>
          </div>

          <DropdownMenuItem className="rounded-xl px-4 overflow-hidden bg-transparent focus:bg-transparent hover:bg-transparent text-gray-200">
            <Link
              href={"/dashboard/profile"}
              className="font-semibold text-gray-200 hover:text-green-600 transition-colors duration-500"
            >
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl px-4 overflow-hidden bg-transparent focus:bg-transparent hover:bg-transparent text-gray-200">
            <Link
              href={"/dashboard"}
              className="font-semibold text-gray-200 hover:text-green-600 transition-colors duration-500"
            >
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="rounded-xl px-4 overflow-hidden bg-transparent focus:bg-transparent hover:bg-transparent text-gray-200">
            <button className="font-semibold text-gray-200 hover:text-green-600 transition-colors duration-500 cursor-pointer">
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarDropdown;
