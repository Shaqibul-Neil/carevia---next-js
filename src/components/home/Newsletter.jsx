import { ShieldCheck, Sparkles } from "lucide-react";
import NewsLetterForm from "../form/NewsLetterForm";

const Newsletter = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20 border-y border-emerald-100 dark:border-emerald-900/30">
      {/* Grid Pattern Background - Consistent with PageHeading */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">
                Updates
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Join our newsletter for expert health care tips
              </span>
            </h2>

            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay connected with professional advice and exclusive family
              support resources.
            </p>
          </div>
          <NewsLetterForm />
          <div className="flex items-center gap-1 justify-center text-muted-foreground">
            <span>
              <ShieldCheck className="w-3 h-3" />
            </span>{" "}
            <p>No spam, ever. Your privacy is our top priority.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
