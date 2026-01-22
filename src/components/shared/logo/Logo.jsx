import Link from "next/link";
import React from "react";
import { GiHeartInside } from "react-icons/gi";

const Logo = () => {
  return (
    <div>
      <div>
        <Link
          href={"/"}
          className="flex items-center gap-1 text-green-500 group"
        >
          <div className="md:flex items-center justify-center group-hover:text-slate-200 transition-all duration-500 hidden">
            <GiHeartInside className="w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tighter group-hover:text-slate-200 transition-all duration-500">
            Carevia
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
