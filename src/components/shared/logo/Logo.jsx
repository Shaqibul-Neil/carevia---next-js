import Link from "next/link";
import React from "react";
import { GiHeartInside } from "react-icons/gi";

const Logo = () => {
  return (
    <div>
      <div>
        <Link
          href={"/"}
          className="flex items-center text-green-800 dark:text-green-500"
        >
          <span className="font-black text-2xl tracking-tighter hover:scale-105 transition-all duration-500 transform-gpu will-change-transform flex items-center">
            <span>Carev</span>
            <GiHeartInside className="w-6 h-6 shrink-0" />
            <span className="-ml-1">a</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
