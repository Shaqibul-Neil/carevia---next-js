import Link from "next/link";
import React from "react";
import { GiHeartInside } from "react-icons/gi";

const Logo = () => {
  return (
    <div>
      <div>
        <Link href={"/"} className="flex items-center">
          <span className="font-black text-2xl tracking-tighter hover:scale-105 transition-all duration-500 transform-gpu will-change-transform flex items-center bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            <span>Carev</span>
            <GiHeartInside className="w-6 h-6 shrink-0 text-emerald-600 dark:text-teal-400" />
            <span className="-ml-1">a</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
