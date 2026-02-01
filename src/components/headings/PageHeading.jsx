import { Sparkles } from "lucide-react";

const PageHeading = ({
  badge = "Featured Services",
  heading = "Expert Care Solutions",
  highlight = "for Your Loved Ones",
  subheading = "Compassionate, professional care services tailored to meet the unique needs of your family",
  icon: Icon = Sparkles,
  trustIndicators = [],
  variant = "gradient", // "gradient" | "solid" | "minimal"
}) => {
  // Variant styles
  const variants = {
    gradient:
      "bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20 border-b border-emerald-100 dark:border-emerald-900/30",
    solid:
      "bg-emerald-50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30",
    minimal:
      "bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800",
  };

  return (
    <section className={`relative overflow-hidden ${variants[variant]}`}>
      {/* Grid Pattern Background (only for gradient variant) */}
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
      )}

      <div className="container mx-auto px-4 py-16 md:py-20 relative">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 shadow-sm">
              <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {badge}
              </span>
            </div>
          )}

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
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
          </h1>

          {/* Supporting Subtitle */}
          {subheading && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}

          {/* Trust Indicators */}
          {trustIndicators.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-gray-500 dark:text-gray-500">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeading;
