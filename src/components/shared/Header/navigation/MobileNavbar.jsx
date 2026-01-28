"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const MobileNavbar = ({ navLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="lg:hidden flex items-center ">
      {/* Mobile Hamburger */}
      <Button
        size="icon-sm"
        aria-label="Toggle menu"
        variant="outline"
        className="cursor-pointer text-slate-200 hover:text-green-500 hover:bg-transparent dark:bg-slate-800"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X size={24} className="text-green-800 dark:text-green-500" />
        ) : (
          <Menu size={24} className="text-green-800 dark:text-green-500" />
        )}
      </Button>

      {/* SM and md Navigation */}
      <div
        className={`dark:bg-slate-800 bg-slate-100 border  border-green-800 dark:border-green-500 rounded-xl shadow-xl z-20 transform transition-all duration-500 top-full absolute w-40 left-0 ${
          menuOpen
            ? "translate-y-2 opacity-100 pointer-events-auto"
            : "-translate-y-5 opacity-0 pointer-events-none"
        } `}
      >
        <nav className="flex flex-col gap-2 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="dark:text-gray-200 text-slate-600 font-semibold text-[0.7rem] tracking-widest hover:text-green-600 transition-colors"
              onClick={() => setMenuOpen(false)} // close menu on click
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;
