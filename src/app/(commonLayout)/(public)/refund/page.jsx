import PageHeading from "@/components/headings/PageHeading";
import {
  FaFileInvoiceDollar,
  FaRegCheckCircle,
  FaHeadset,
  FaUndoAlt,
} from "react-icons/fa";
import { TbClockHour4, TbAlertTriangle } from "react-icons/tb";

export const metadata = {
  title: "Refund Policy | Carevia",
  description: "Transparent and fair refund process for our valued clients.",
};

const RefundPolicyPage = () => {
  const refundSteps = [
    {
      step: "01",
      title: "Request Submission",
      desc: "Submit a refund request via our Help Center or email within 24 hours of the service issue.",
      icon: FaFileInvoiceDollar,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      step: "02",
      title: "Internal Review",
      desc: "Our support team will review your case and verify the service logs within 1-2 business days.",
      icon: TbClockHour4,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      step: "03",
      title: "Approval Decision",
      desc: "You will receive a formal notification regarding the approval or rejection of your claim.",
      icon: FaRegCheckCircle,
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    {
      step: "04",
      title: "Disbursement",
      desc: "Approved refunds are processed to your original payment method within 5-7 business days.",
      icon: FaUndoAlt,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 pb-20">
      <PageHeading
        badge="Policy"
        heading="Refund Policy"
        highlight="& Guarantee"
        subheading="We are committed to your satisfaction. Here is how our transparent refund process works."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {refundSteps.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-900 p-8 rounded-xs shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`w-14 h-14 rounded-xs flex items-center justify-center ${item.color}`}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <span className="text-4xl font-bold text-slate-100 dark:text-slate-800 select-none">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xs bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600">
                <TbAlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Non-Refundable Items
              </h3>
            </div>
            <ul className="space-y-4 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>
                  Service fees for completed visits where care was delivered as
                  agreed.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>
                  Cancellations made less than 4 hours before the scheduled
                  appointment time.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>
                  Administrative processing fees and platform charges.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-xs bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                <FaHeadset className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Need Assistance?
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              If you believe you have been charged incorrectly or experienced
              subpar service, please contact our support team immediately. We
              are here to help resolve any issues fairly.
            </p>
            <button className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xs hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
