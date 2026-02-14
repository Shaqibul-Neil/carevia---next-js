import { Sparkles } from "lucide-react";

const SectionHeading = ({
  badge = "Featured Services",
  heading = "Expert Care Solutions",
  highlight = "for Your Loved Ones",
  subheading = "Compassionate, professional care services tailored to meet the unique needs of your family",
  icon: Icon = Sparkles,
  centered = true,
}) => {
  return (
    <div
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} space-y-4`}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xs bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 ${centered ? "" : ""}`}
        >
          <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {badge}
          </span>
        </div>
      )}

      {/* Main Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
          {heading}
        </span>
        {highlight && (
          <>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {highlight}
            </span>
          </>
        )}
      </h2>

      {/* Supporting Subtitle */}
      {subheading && (
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
