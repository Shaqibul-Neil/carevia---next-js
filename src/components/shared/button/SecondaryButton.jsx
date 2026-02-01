import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const SecondaryButton = ({
  label,
  type = "button",
  className,
  href,
  ...props
}) => {
  const BaseStyles =
    "relative cursor-pointer px-3 py-2 text-center font-barlow inline-flex justify-center text-foreground rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline  focus:outline-white focus:outline-offset-4 overflow-hidden text-sm hover:bg-green-400 dark:hover:bg-green-600 transition-all duration-500 ";
  const innerSpanStyles = (
    <>
      <span className="relative z-20">{label}</span>

      <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

      <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-foreground absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
      <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-foreground absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
      <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-foreground absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
      <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-foreground absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
    </>
  );
  //if href is passed, render as anchor tag
  if (href) {
    return (
      <Link
        className={cn(BaseStyles, className)}
        href={href}
        rel="noopener noreferrer"
        {...props}
      >
        {innerSpanStyles}
      </Link>
    );
  }
  return (
    <button type={type} className={cn(BaseStyles, className)} {...props}>
      {" "}
      {innerSpanStyles}
    </button>
  );
};

export default SecondaryButton;
