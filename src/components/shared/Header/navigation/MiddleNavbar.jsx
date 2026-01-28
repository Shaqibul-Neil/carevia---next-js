"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MiddleNavbar = ({ navLinks }) => {
  const path = usePathname();
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="flex gap-6">
        {navLinks.map((link, i) => (
          <NavigationMenuItem key={i}>
            <NavigationMenuLink asChild>
              <Link
                href={link.href}
                className={cn(
                  "px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all relative overflow-hidden group",
                  path === link.href
                    ? "text-green-600"
                    : "text-slate-200 hover:text-green-600 hover:dark:text-green-600 dark:text-slate-800",
                )}
              >
                {link.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MiddleNavbar;
