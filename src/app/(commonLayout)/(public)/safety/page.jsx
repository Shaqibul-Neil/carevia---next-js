import PageHeading from "@/components/headings/PageHeading";
import {
  FaUserNurse,
  FaUsers,
  FaLock,
  FaPhoneAlt,
  FaFirstAid,
  FaMobile,
} from "react-icons/fa";
import { TbShieldCheck, TbAlertCircle } from "react-icons/tb";

export const metadata = {
  title: "Safety Guide | Carevia",
  description:
    "Guidelines to ensure a safe and secure experience for everyone.",
};

const SafetyGuidePage = () => {
  // Safety Tip Card Component
  const SafetyCard = ({ icon: Icon, title, desc, color }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xs border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div
        className={`w-12 h-12 rounded-xs flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-950 pb-20">
      <PageHeading
        badge="Community"
        heading="Safety Guide"
        highlight="& Best Practices"
        subheading="Your wellbeing is paramount. Follow these guidelines for a secure, respectful, and trusted care experience."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* For Families Section */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xs flex items-center justify-center text-emerald-600">
                <FaUsers className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                For Families
              </h2>
            </div>

            <div className="space-y-6">
              <SafetyCard
                icon={TbShieldCheck}
                title="Verify Profiles"
                desc="Always communicate through the Carevia platform to ensure your interactions are logged and protected."
                color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
              />
              <SafetyCard
                icon={FaLock}
                title="Secure Payments"
                desc="Never pay caregivers directly in cash. Use Carevia's secure payment system to be eligible for support."
                color="bg-teal-50 text-teal-600 dark:bg-teal-900/20"
              />
              <SafetyCard
                icon={TbAlertCircle}
                title="Report Issues"
                desc="If you feel uncomfortable or notice policy violations, report the profile immediately via the Help Center."
                color="bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20"
              />
            </div>
          </div>

          {/* For Caregivers Section */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xs flex items-center justify-center text-blue-600">
                <FaUserNurse className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                For Caregivers
              </h2>
            </div>

            <div className="space-y-6">
              <SafetyCard
                icon={FaFirstAid}
                title="Emergency Protocols"
                desc="Always have emergency contacts handy and know the nearest medical facilities for your patient."
                color="bg-blue-50 text-blue-600 dark:bg-blue-900/20"
              />
              <SafetyCard
                icon={FaPhoneAlt}
                title="Clear Communication"
                desc="Set clear expectations regarding duties and hours before accepting a booking request."
                color="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20"
              />
              <SafetyCard
                icon={TbShieldCheck}
                title="Personal Safety"
                desc="Trust your instincts. If a location or situation feels unsafe, contact support and leave the premises."
                color="bg-violet-50 text-violet-600 dark:bg-violet-900/20"
              />
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="mt-20 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-xs p-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 animate-pulse">
              <FaFirstAid className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-rose-700 dark:text-rose-400">
                In an Emergency?
              </h3>
              <p className="text-rose-600/80 dark:text-rose-300/80">
                If you or someone else is in immediate danger, please call local
                emergency services immediately.
              </p>
            </div>
          </div>
          <a
            href="tel:999"
            className="px-8 py-4 bg-rose-600 text-white font-bold rounded-xs shadow-lg hover:bg-rose-700 transition-colors flex gap-1 items-center"
          >
            <span>
              <FaMobile />
            </span>{" "}
            <span>Call 999</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidePage;
