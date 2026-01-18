"use client";
import React, { useState } from "react";
import Logo from "../logo/Logo";
import Navbar from "./navigation/Navbar";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Contact", href: "/contact" },
  { title: "Bookings", href: "/booking" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 bg-slate-800 z-50 py-4">
      <div className="mx-auto flex items-center justify-between w-11/12 max-w-360">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-1 relative">
          <div>
            {/* Mobile Hamburger */}
            <Button
              size="icon-sm"
              aria-label="Toggle menu"
              variant="outline"
              className="lg:hidden mt-2 cursor-pointer fixed inset-0 z-10"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {/* SM and md Navigation */}
            <div
              className={`dark:bg-black border-l-4 border-green-500 rounded-[2rem] shadow-2xl z-20 transform transition-all duration-500 top-full absolute w-56 left-0 ${
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
                    className="text-slate-600 dark:text-gray-200 font-black text-[0.7rem] uppercase tracking-widest hover:text-green-600 transition-colors"
                    onClick={() => setMenuOpen(false)} // close menu on click
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          {/* Logo */}
          <div>
            <Logo />
          </div>
        </div>

        {/* Middle: Navigation Menu */}
        <Navbar navLinks={navLinks} />
        {/* Right: Login / Register */}

        <div className="flex gap-6 items-center">
          <Link
            href="/login"
            className="px-8 py-3 bg-green-400 text-slate-800 hover:bg-green-800 rounded-full flex justify-center transition-all duration-500 items-center font-black text-xs uppercase tracking-widest shadow-sm shadow-green-100"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
