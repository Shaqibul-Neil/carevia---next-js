import PageHeading from "@/components/headings/PageHeading";
import SectionHeading from "@/components/headings/SectionHeadings";
import Image from "next/image";
import {
  FaAward,
  FaHeartbeat,
  FaUsers,
  FaHandHoldingHeart,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { TbTargetArrow, TbEye } from "react-icons/tb";
import people7 from "@/assets/people7.jpg";
import people2 from "@/assets/people2.jpg";
import people3 from "@/assets/people3.jpg";
import people6 from "@/assets/people6.jpg";
import people8 from "@/assets/people8.jpg";
import professionalHealthcareImg from "@/assets/professional healthcare.webp";
import qualityHomeCareImg from "@/assets/quality home care.webp";
import Link from "next/link";
import { Cedarville_Cursive } from "next/font/google";

const cedarvilleCursive = Cedarville_Cursive({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "About Us | Carevia",
  description:
    "Learn about our mission, vision, and the dedicated team behind Carevia.",
};

export default function AboutPage() {
  // Update stats to represent "Our Story" details
  const stats = [
    { label: "Community Trust", value: "98%" },
    { label: "Families Served", value: "5000+" },
    { label: "Verified Experts", value: "250+" },
    { label: "Years of Care", value: "12+" },
  ];

  const awards = [
    {
      icon: FaAward,
      title: "Best Home Care 2024",
      org: "Health Excellence Awards",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      icon: FaHeartbeat,
      title: "Quality in Nursing",
      org: "Medical Council",
      color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    },
    {
      icon: FaHandHoldingHeart,
      title: "Compassion Award",
      org: "Care International",
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      icon: FaUsers,
      title: "Top Employer 2023",
      org: "HR Association",
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
  ];

  // Updated Visionaries (2 men, 2 women)
  const visionaries = [
    {
      name: "James Wilson",
      role: "Chief Executive Officer",
      img: people7,
      socials: [FaFacebookF, FaTwitter, FaLinkedinIn],
    },
    {
      name: "Sarah Jenkins",
      role: "Head of Operations",
      img: people2,
      socials: [FaFacebookF, FaTwitter, FaLinkedinIn],
    },
    {
      name: "Dr. Michael Chen",
      role: "Chief Medical Officer",
      img: people6,
      socials: [FaFacebookF, FaTwitter, FaLinkedinIn],
    },
    {
      name: "Emily Roberts",
      role: "Director of Nursing",
      img: people3,
      socials: [FaFacebookF, FaTwitter, FaLinkedinIn],
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* 1. Page Heading */}
      <PageHeading
        badge="Who We Are"
        heading="Redefining Care"
        highlight="with Compassion"
        subheading="We are on a journey to transform home healthcare by bringing professional, dignified, and personalized support directly to your doorstep."
        trustIndicators={[]}
      />

      {/* 2. Zigzag Story & Mission/Vision */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
        {/* Top: Our Story Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              <FaUsers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />{" "}
              Our Story
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Twelve Years of <br /> Unwavering Service
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Founded in 2012, Carevia began with a simple yet powerful promise:
              to treat every patient like family. What started as a small team
              of three nurses has grown into a nationwide network of care
              professionals, but our core values remain unchanged.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              {stats.map((s, idx) => (
                <div key={idx} className="border-l-4 border-emerald-500 pl-4">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {s.value}
                  </p>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {/* Vision  */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xs p-8 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 relative h-48 md:h-full min-h-[200px] rounded-xs overflow-hidden">
                <Image
                  src={professionalHealthcareImg}
                  alt="Vision"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-3">
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xs flex items-center justify-center">
                  <TbEye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Our Vision
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  To be the most trusted home healthcare provider, setting
                  global standards for patient-centered care and family support
                  systems.
                </p>
              </div>
            </div>
            {/* Our Mission */}

            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xs p-8 border border-emerald-100 dark:border-emerald-800 flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="w-full md:w-1/2 relative h-48 md:h-full min-h-[200px] rounded-xs overflow-hidden">
                <Image
                  src={qualityHomeCareImg}
                  alt="Mission"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-3">
                <div className="w-12 h-12 bg-emerald-200 text-emerald-700 rounded-xs flex items-center justify-center">
                  <TbTargetArrow className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  To empower families with high-quality, reliable, and
                  compassionate tailored care that ensures dignity at every
                  stage of life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Awards Section */}
      <section className="py-16 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Recognition"
            heading="Award-Winning Care"
            subheading="Honored for our commitment to excellence in healthcare services."
            centered={true}
          />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-xs bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${award.color}`}
                >
                  <award.icon className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                  {award.title}
                </h4>
                <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {award.org}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Founder's Word - Updated Design */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="flex flex-col items-center space-y-8">
            {/* Founder Image - Smaller */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-100 dark:border-emerald-900 shadow-xl">
              <Image
                src={people8}
                alt="Robert Davidson"
                fill
                className="object-cover"
              />
            </div>

            {/* Content - Cursive & Short */}
            <div className="relative">
              <FaHeartbeat className="absolute -top-6 -left-6 text-emerald-100 text-6xl opacity-50" />
              <p
                className={`${cedarvilleCursive.className} text-3xl md:text-4xl text-slate-800 dark:text-slate-200 leading-relaxed`}
              >
                "We believe that healing happens best at home. Carevia was born
                from a promise to treat every patient with the same love and
                dignity we would want for our own family."
              </p>
              <FaHandHoldingHeart className="absolute -bottom-6 -right-6 text-emerald-100 text-6xl opacity-50" />
            </div>

            {/* Signature - Cursive */}
            <div className="pt-4">
              <p
                className={`${cedarvilleCursive.className} text-5xl text-emerald-600 dark:text-emerald-500`}
              >
                Robert Davidson
              </p>
              <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mt-2">
                Founder & Chairman
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Meet the Visionaries - Balanced Gender */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Leadership"
            heading="Meet the Visionaries"
            subheading="The experienced minds guiding our mission towards excellence."
            centered={true}
          />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visionaries.map((person, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-slate-900 rounded-xs overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={person.img}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Social Icons Overlay */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {person.socials.map((Icon, i) => (
                      <Link
                        key={i}
                        href="#"
                        className="w-10 h-10 rounded-xs bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-emerald-500 hover:border-emerald-500 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 text-center relative z-10 bg-white dark:bg-slate-900">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-medium">
                    {person.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
