import Link from "next/link";
import Logo from "../logo/Logo";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

/**
 * Footer Component
 * Premium, professional 2-1-1-1 grid layout.
 * Stunning gradient background and elegant hover effects.
 */
const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const footerLinks = {
    company: [
      { title: "About Us", href: "/about" },
      { title: "Our Services", href: "/services" },
      { title: "Caregivers", href: "/team" },
      { title: "Contact Us", href: "/contact" },
    ],
    support: [
      { title: "Help Center", href: "/help" },
      { title: "Safety Guide", href: "/safety" },
      { title: "FAQs", href: "/faq" },
      { title: "Careers", href: "/careers" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Refund Policy", href: "/refund" },
      { title: "Compliance", href: "/payments" },
    ],
  };

  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-slate-50 via-emerald-50/20 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950 border-t border-slate-200/60 dark:border-slate-800/60">
      {/* Background Subtle Shape */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Column 1: Brand (Span 2) */}
          <div className="lg:col-span-2 space-y-8">
            <Logo />
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              Carevia brings professional, compassionate healthcare directly to your home. We&apos;re committed to excellence, dignity, and independence for every family in Bangladesh.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 shadow-xs hover:-translate-y-1.5 hover:text-emerald-500 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-500"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-6 lg:pl-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 w-fit px-3 py-1 rounded-md">
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 underline-offset-4 hover:underline decoration-emerald-500/30 transition-all duration-500 block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-6 lg:pl-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 w-fit px-3 py-1 rounded-md">
              Support
            </h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 underline-offset-4 hover:underline decoration-emerald-500/30 transition-all duration-500 block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-6 lg:pl-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 w-fit px-3 py-1 rounded-md">
              Legal
            </h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 underline-offset-4 hover:underline decoration-emerald-500/30 transition-all duration-500 block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} <span className="font-bold text-slate-900 dark:text-white">Carevia</span> – All rights reserved – <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded text-xs">shaqibul_neil</span>
          </p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 group cursor-help">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-xs text-slate-500 dark:text-slate-500 group-hover:text-emerald-500 transition-colors">Server Status: Online</span>
             </div>
             <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
             <div className="text-xs text-slate-400">Crafted with Precision</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
