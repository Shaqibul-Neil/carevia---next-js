import { Sparkles } from "lucide-react";

const SectionHeading = ({
  badge = "Featured Services",
  heading = "Expert Care Solutions for Your Loved Ones",
  subheading = "Compassionate, professional care services tailored to meet the unique needs of your family",
  icon: Icon = Sparkles,
  centered = true,
}) => {
  return (
    <div
      className={`w-full mx-auto space-y-5 mb-12 ${
        centered ? "text-center" : "text-left"
      }`}
    >
      {/* Badge with Icon */}
      <div
        className={`inline-flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gradient-to-r from-green-100 via-emerald-100 to-green-100 dark:from-green-950/40 dark:via-emerald-950/40 dark:to-green-950/40 border border-green-200/70 dark:border-green-800/50 shadow-sm backdrop-blur-sm ${
          centered ? "" : "ml-0"
        }`}
      >
        <Icon
          className="w-4 h-4 text-foreground animate-pulse"
          strokeWidth={2.5}
        />
        <span className="text-xs font-semibold text-foreground tracking-wide uppercase">
          {badge}
        </span>
      </div>

      {/* Main Heading with Gradient */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-50 dark:via-white dark:to-slate-50 bg-clip-text text-transparent">
        {heading}
      </h2>

      {/* Subheading with elegant color */}
      <p
        className={`text-base sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium  ${
          centered ? "text-center" : "text-left"
        }`}
      >
        {subheading}
      </p>

      {/* Decorative underline */}
      <div
        className={`h-1 w-24 bg-gradient-to-r from-primary via-green-400 to-primary rounded-full ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
};

export default SectionHeading;
