"use client";
import { cn } from "@/lib/utils";

export const PrimaryButton = ({ className, children, ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        "primary-animated-button relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out",
        "rounded-md border-none outline-none cursor-pointer",
        // Fixed height and min-width instead of padding
        "h-11 w-32",
        // Background - Theme aware (slate-800 in light, white in dark)
        "bg-slate-800 dark:bg-white",
        // Hover & Active states
        "hover:shadow-lg hover:shadow-slate-800/30 dark:hover:shadow-white/20 active:scale-95",
        // Disabled state
        "disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      {/* Before pseudo - Glass effect */}
      <span className="absolute inset-[1px] rounded-[5px] bg-gradient-to-b from-white/10 dark:from-slate-900/10 to-transparent pointer-events-none z-[1]" />

      {/* After pseudo - Inner glow */}
      <span className="absolute inset-[2px] rounded-sm bg-slate-800 dark:bg-white pointer-events-none z-0" />

      {/* Fold effect - Top right corner */}
      <span className="fold absolute top-0 right-0 h-4 w-4 z-[2] transition-all duration-500 ease-in-out bg-gradient-radial from-slate-600/60 dark:from-slate-200/60 to-transparent shadow-[0_0_3px_rgba(0,0,0,0.2)] rounded-tl-none rounded-br-none rounded-bl-md rounded-tr-md before:content-[''] before:absolute before:top-0 before:right-0 before:w-[150%] before:h-[150%] before:rotate-45 before:translate-x-0 before:-translate-y-[18px] before:bg-slate-100 dark:before:bg-slate-800 before:pointer-events-none" />

      {/* Floating points wrapper */}
      <span className="points-wrapper absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {[...Array(10)].map((_, i) => (
          <i
            key={i}
            // ✅ FIXED: Added dark:bg-slate-800 here
            className="point absolute bottom-[-10px] w-0.5 h-0.5 bg-white dark:bg-slate-800 rounded-full animate-floating-points"
            style={{
              left: `${[10, 30, 25, 44, 50, 75, 88, 58, 98, 65][i]}%`,
              opacity: [1, 0.7, 0.8, 0.6, 1, 0.5, 0.9, 0.8, 0.6, 1][i],
              animationDuration: `${[2.35, 2.5, 2.2, 2.05, 1.9, 1.5, 2.2, 2.25, 2.6, 2.5][i]}s`,
              animationDelay: `${[0.2, 0.5, 0.1, 0, 0, 1.5, 0.2, 0.2, 0.1, 0.2][i]}s`,
            }}
          />
        ))}
      </span>

      {/* Inner content - Text & Icon */}
      <span className="inner relative z-[3] flex items-center justify-center gap-2 text-white dark:text-slate-900 font-semibold text-base leading-6 transition-colors duration-200">
        {children}
      </span>
    </button>
  );
};
