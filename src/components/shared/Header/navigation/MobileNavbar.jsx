"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const MobileNavbar = ({ navLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="lg:hidden flex items-center">
      {/* Mobile Hamburger */}
      <Button
        size="icon-sm"
        aria-label="Toggle menu"
        variant="outline"
        className="cursor-pointer text-slate-200 hover:text-green-500 hover:bg-transparent"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X size={24} className="text-green-600" />
        ) : (
          <Menu size={24} className="text-green-600" />
        )}
      </Button>

      {/* SM and md Navigation */}
      <div
        className={`bg-slate-800 border border-green-500 rounded-xl shadow-xl z-20 transform transition-all duration-500 top-full absolute w-56 left-0 ${
          menuOpen
            ? "translate-y-2 opacity-100 pointer-events-auto"
            : "-translate-y-5 opacity-0 pointer-events-none"
        } `}
      >
        <nav className="flex flex-col gap-2 px-8 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-200 font-black text-[0.7rem] uppercase tracking-widest hover:text-green-600 transition-colors"
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
