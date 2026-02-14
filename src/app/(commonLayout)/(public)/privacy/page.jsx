import PageHeading from "@/components/headings/PageHeading";
import {
  FaUserShield,
  FaDatabase,
  FaShareAlt,
  FaLock,
  FaCookieBite,
} from "react-icons/fa";
import { TbEyeCheck } from "react-icons/tb";

export const metadata = {
  title: "Privacy Policy | Carevia",
  description: "How we collect, use, and protect your personal data.",
};

const PrivacyPolicyPage = () => {
  const policies = [
    {
      icon: FaUserShield,
      title: "Data Collection",
      content:
        "We collect personal information such as name, contact details, and health history strictly to provide tailored care services. All data is encrypted.",
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    {
      icon: FaDatabase,
      title: "How We Use Data",
      content:
        "Your data is used solely for service coordination, personalized care planning, and communication. We never sell your data to third parties.",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      icon: FaShareAlt,
      title: "Information Sharing",
      content:
        "We may share relevant health info with assigned caregivers or medical professionals only when necessary for your care plan execution.",
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      icon: FaLock,
      title: "Security Measures",
      content:
        "We employ industry-standard SSL encryption and strict access controls to safeguard your sensitive information from unauthorized access.",
      color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    },
    {
      icon: FaCookieBite,
      title: "Cookies & Tracking",
      content:
        "We use cookies to improve website functionality and user experience. You can manage your cookie preferences in your browser settings.",
      color:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
    {
      icon: TbEyeCheck,
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal data at any time. Contact our Data Protection Officer for assistance.",
      color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 pb-20">
      <PageHeading
        badge="Legal"
        heading="Privacy Policy"
        highlight="& Data Protection"
        subheading="Your trust is our priority. We are committed to transparency in how we handle your personal information."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies.map((policy, idx) => (
            <div
              key={idx}
              className="group relative bg-slate-50 dark:bg-slate-900 rounded-xs p-8 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent -mr-10 -mt-10 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>

              <div
                className={`w-14 h-14 rounded-xs flex items-center justify-center mb-6 ${policy.color} group-hover:scale-110 transition-transform`}
              >
                <policy.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {policy.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {policy.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-slate-500 dark:text-slate-500">
          Last updated: February 10, 2026. For detailed legal inquiries, please
          contact{" "}
          <a href="#" className="text-emerald-500 hover:underline">
            legal@carevia.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
