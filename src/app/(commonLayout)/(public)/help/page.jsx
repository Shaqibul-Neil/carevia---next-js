import PageHeading from "@/components/headings/PageHeading";
import {
  FaSearch,
  FaUserGraduate,
  FaUserFriends,
  FaComments,
  FaPhoneAlt,
} from "react-icons/fa";
import {
  TbMessageQuestion,
  TbSettings,
  TbCurrencyDollar,
} from "react-icons/tb";

export const metadata = {
  title: "Help Center | Carevia",
  description: "Find answers and support for all your home care needs.",
};

const HelpCenterPage = () => {
  const categories = [
    {
      title: "Getting Started",
      icon: FaUserFriends,
      color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600",
    },
    {
      title: "Account & Profile",
      icon: TbSettings,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
    },
    {
      title: "Payments & Billing",
      icon: TbCurrencyDollar,
      color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
    },
    {
      title: "Trust & Safety",
      icon: TbMessageQuestion,
      color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600",
    },
    {
      title: "For Caregivers",
      icon: FaUserGraduate,
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
    },
    {
      title: "Feedback",
      icon: FaComments,
      color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 pb-20">
      {/* Search Hero Section */}
      <div className="relative bg-emerald-50 dark:bg-slate-900 pt-16 pb-24 md:pt-24 md:pb-32 px-4 border-b border-slate-200 dark:border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            How can we help?
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Search our knowledge base or browse categories below.
          </p>

          <div className="relative max-w-xl mx-auto mt-8">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-700 shadow-xl shadow-emerald-500/5 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-700 dark:text-white dark:bg-slate-800"
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 blur-3xl rounded-full -z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-900 p-8 rounded-xs border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-xs flex items-center justify-center mb-6 ${cat.color} group-hover:scale-110 transition-transform`}
              >
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                View articles &rarr;
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Still need support?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xs hover:opacity-90 shadow-lg transition-all">
              <FaComments /> Start Live Chat
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold rounded-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <FaPhoneAlt /> Call Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
