import Image from "next/image";
import SectionHeading from "../headings/SectionHeadings";
import { Users, CheckCircle2, Heart, ShieldCheck } from "lucide-react";

// Asset Imports
import caregiverImg from "@/assets/caregiver.webp";
import professionalHealthcareImg from "@/assets/professional healthcare.webp";
import qualityHomeCareImg from "@/assets/quality home care.webp";

/**
 * AboutUs Section
 * Professional, elegant, and Dribbble-inspired UI.
 * Consistent with the Carevia design system.
 */
const AboutUs = () => {
  const features = [
    {
      icon: Heart,
      title: "Compassionate Care",
      desc: "Care that treats your family like our own.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Experts",
      desc: "Every caregiver is thoroughly vetted and certified.",
    },
    {
      icon: CheckCircle2,
      title: "Customized Plans",
      desc: "Tailored support strictly following your needs.",
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 overflow-hidden relative">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-50/50 dark:bg-emerald-900/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-teal-50/50 dark:bg-teal-900/5 blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT SIDE: Elegant Image Composition */}
          <div className="relative h-[500px] md:h-[600px] w-full group">
            {/* Background Decorative Element */}
            <div className="absolute top-[10%] left-[5%] w-[80%] h-[80%] border-2 border-emerald-100 dark:border-emerald-900/30 rounded-[3rem] -z-10" />

            {/* Main Image (Deep Back) */}
            <div className="absolute top-0 left-0 w-[65%] h-[75%] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border-4 border-white dark:border-slate-900 ring-1 ring-black/5 dark:ring-white/5">
              <Image
                src={caregiverImg}
                alt="Compassionate Caregiver"
                placeholder="blur"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Secondary Image (Floating Right) */}
            <div className="absolute top-[20%] right-0 w-[55%] h-[55%] rounded-[2.5rem] overflow-hidden shadow-2xl z-20 border-4 border-white dark:border-slate-900 ring-1 ring-black/5 dark:ring-white/5">
              <Image
                src={professionalHealthcareImg}
                alt="Professional Healthcare"
                placeholder="blur"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Accent Small Image (Bottom Center) */}
            <div className="absolute bottom-0 left-[20%] w-[50%] h-[40%] rounded-[2rem] overflow-hidden shadow-2xl z-30 border-4 border-white dark:border-slate-900 ring-1 ring-black/5 dark:ring-white/5">
              <Image
                src={qualityHomeCareImg}
                alt="Quality Home Care"
                placeholder="blur"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute bottom-[10%] -right-4 lg:-right-8 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl z-40 border border-emerald-100 dark:border-emerald-900/50 backdrop-blur-subtle">
              <div className="text-center">
                <span className="block text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  12+
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Years of trust
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Content */}
          <div className="space-y-10">
            <SectionHeading
              badge="About Carevia"
              heading="Excellence in Every"
              highlight="Home Care Moment"
              subheading="We redefine home healthcare by blending medical expertise with unmatched compassion, ensuring your loved ones live with dignity and independence."
              icon={Users}
              centered={false}
            />

            <div className="grid gap-8">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-100 overflow-hidden shadow-sm"
                  >
                    <Image
                      src={`https://images.unsplash.com/photo-${i === 1 ? "1494790108377-be9c29b29330" : i === 2 ? "1535713875002-d1d0cf377fde" : i === 3 ? "1580489944761-15a19d654956" : "1507003211169-0a1dd7228f2d"}?q=80&w=100&auto=format&fit=crop`}
                      alt="User"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Trusted by 5000+ families
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  across Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
