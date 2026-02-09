import PageHeading from "@/components/headings/PageHeading";
import { 
  FaUserCheck, 
  FaCertificate, 
  FaFileMedical, 
  FaFingerprint, 
  FaShieldAlt 
} from "react-icons/fa";
import { TbStethoscope, TbReportMedical } from "react-icons/tb";

export const metadata = {
  title: "Compliance & Safety | Carevia",
  description: "Our rigorous standards for caregiver vetting and service quality.",
};

const CompliancePage = () => {
  const vettingSteps = [
    {
      title: "Identity Verification",
      icon: FaFingerprint,
      desc: "Comprehensive background checks including NID verification and criminal record screening.",
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/40",
    },
    {
      title: "Medical Certification",
      icon: FaCertificate,
      desc: "Validation of nursing degrees, diplomas, and specialized training certificates.",
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900/40",
    },
    {
      title: "Skill Assessment",
      icon: TbStethoscope,
      desc: "Practical exams covering patient handling, emergency response, and equipment usage.",
      color: "text-rose-600 bg-rose-100 dark:bg-rose-900/40",
    },
    {
      title: "Health Screening",
      icon: FaFileMedical,
      desc: "Mandatory health checks and vaccination records ensure patient safety.",
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 pb-20">
      <PageHeading
        badge="Safety First"
        heading="Compliance"
        highlight="& Standards"
        subheading="We adhere to the strictest protocols to ensure every caregiver is qualified, trusted, and ready to serve."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Vetting Process Grid */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Vetting Process</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Only the top 5% of applicants make it onto our platform. Here is how we ensure excellence.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-0"></div>

              {vettingSteps.map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 border-4 border-white dark:border-slate-900 shadow-xl ${step.color} transition-transform duration-500 group-hover:scale-110`}>
                    <step.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                    {step.desc}
                  </p>
                </div>
              ))}
           </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
           <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                 <FaShieldAlt /> Industry Standards
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Licensed & Insured</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Carevia operates in full compliance with local healthcare regulations. We maintain comprehensive liability insurance and adhere to strict data privacy laws (Digital Security Act).
              </p>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <FaUserCheck className="text-emerald-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Verified Pros</span>
                 </div>
                 <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <TbReportMedical className="text-emerald-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Audit Trails</span>
                 </div>
              </div>
           </div>

           <div className="relative h-80 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 shadow-2xl p-10 flex flex-col justify-center items-center text-center text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
              
              <FaShieldAlt className="w-20 h-20 mb-6 drop-shadow-lg" />
              <h3 className="text-3xl font-bold mb-2">100% Compliant</h3>
              <p className="text-emerald-100">Zero compromise on safety and legal standards.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
