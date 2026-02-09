import PageHeading from "@/components/headings/PageHeading";
import { 
  FaHandshake, 
  FaUserCog, 
  FaExclamationTriangle, 
  FaGavel 
} from "react-icons/fa";
import { TbFileCheck, TbShieldCheck } from "react-icons/tb";

export const metadata = {
  title: "Terms of Service | Carevia",
  description: "User agreement and terms of service for using Carevia.",
};

const TermsPage = () => {
  return (
    <div className="bg-white dark:bg-slate-950 pb-20">
      <PageHeading
        badge="Legal"
        heading="Terms of Service"
        highlight="& Conditions"
        subheading="Please read these terms carefully before using our services. By accessing Carevia, you agree to be bound by these conditions."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Card 1: Main Agreement - Span 2 */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <FaHandshake className="w-32 h-32 text-emerald-500" />
            </div>
            <div className="relative z-10 max-w-lg">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 mb-6">
                <FaHandshake className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">User Agreement</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                By creating an account, you confirm that you are at least 18 years old and capable of entering into a binding contract. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
            </div>
          </div>

          {/* Card 2: Account Security */}
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
             <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 mb-6">
                <TbShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Account Security</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                You are responsible for safeguarding your password. You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.
              </p>
          </div>

          {/* Card 3: Service Scope */}
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
             <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 mb-6">
                <FaUserCog className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Service Scope</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our platform connects users with independent caregivers. Carevia is not a medical service provider but a facilitator of home care connections.
              </p>
          </div>

          {/* Card 4: Termination */}
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
             <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-rose-600 mb-6">
                <FaExclamationTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Termination</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We may suspend or terminate your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
          </div>

           {/* Card 5: Governing Law - Span 2 */}
           <div className="md:col-span-2 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
            <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <FaGavel className="w-40 h-40 text-slate-500" />
            </div>
            <div className="relative z-10 max-w-lg">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 mb-6">
                <FaGavel className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Governing Law</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-16 bg-emerald-50 dark:bg-emerald-950/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-100 dark:border-emerald-900/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-200 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
               <TbFileCheck className="w-6 h-6" />
            </div>
            <div>
               <h3 className="font-bold text-slate-900 dark:text-white text-lg">Acceptance of Terms</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400">By clicking "Sign Up", you acknowledge that you have read and understood these terms.</p>
            </div>
          </div>
          <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
             I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
