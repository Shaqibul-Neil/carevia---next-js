import React from "react";
import Logo from "../logo/Logo";
import Link from "next/link";
import ToggleButton from "../button/ToggleButton";
import MiddleNavbar from "./navigation/MiddleNavbar";
import MobileNavbar from "./navigation/MobileNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import NavbarDropdown from "./navigation/NavbarDropdown";
const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Bookings", href: "/booking" },
  { title: "Contact", href: "/contact" },
];

const Header = async () => {
  const session = await getServerSession(authOptions);
  //console.log(session);
  return (
    <header className="w-full sticky top-0 bg-slate-50 dark:bg-slate-800 z-50 py-4 transition-colors duration-600 border-b border-border">
      <div className="mx-auto flex items-center justify-between w-11/12 max-w-360">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-2 relative">
          <MobileNavbar navLinks={navLinks} />
          {/* Logo */}
          <Logo />
        </div>

        {/* Middle: Navigation Menu */}
        <MiddleNavbar navLinks={navLinks} />
        {/* Right: Login / Register */}

        <div className="flex gap-6 items-center">
          <ToggleButton />
          {session ? (
            <NavbarDropdown session={session} />
          ) : (
            <Link
              href="/login"
              className="px-8 py-3 bg-green-400 text-slate-800 hover:bg-green-800 rounded-full flex justify-center transition-all duration-500 items-center font-black text-xs uppercase tracking-widest shadow-sm shadow-green-100"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
