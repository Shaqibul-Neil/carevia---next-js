import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const PrimaryButton = ({
  label,
  type = "button",
  className,
  href,
  icon,
  iconPosition = "left",
  ...props
}) => {
  const baseStyles =
    "w-full py-4 px-6 rounded-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white font-semibold text-lg shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/40 dark:hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 text-center inline-flex items-center justify-center cursor-pointer";

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="flex items-center">{icon}</span>
      )}
      <span>{label}</span>
      {icon && iconPosition === "right" && (
        <span className="flex items-center">{icon}</span>
      )}
    </>
  );
  // If href is passed, render as Link
  if (href) {
    return (
      <Link
        className={cn(baseStyles, className)}
        href={href}
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button type={type} className={cn(baseStyles, className)} {...props}>
      {content}
    </button>
  );
};

export default PrimaryButton;
