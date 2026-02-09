import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const SecondaryButton = ({ label, href, className }) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 font-semibold text-emerald-700 dark:text-emerald-400 transition-all duration-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:scale-[1.02] active:scale-[0.98]",
        className,
      )}
    >
      <span className="text-sm">{label}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
};

export default SecondaryButton;
