import SectionHeading from "../headings/SectionHeadings";
import PrimaryButton from "../shared/button/PrimaryButton";
// Import local images
import people1 from "@/assets/people1.jpg";
import people2 from "@/assets/people2.jpg";
import people3 from "@/assets/people3.jpg";
import people4 from "@/assets/people4.jpg";
import people5 from "@/assets/people5.jpg";
import people6 from "@/assets/people6.jpg";
import people7 from "@/assets/people7.jpg";
import TestimonialSlider from "../slider/TestimonialSlider";

const Testimonials = () => {
  const testimonials = [
    {
      img: people1,
      name: "Linda G.",
      role: "Global Health Inc.",
      date: "Oct 12, 2025",
      review:
        "Exceptional care that truly transformed our family's daily life.",
    },
    {
      img: people2,
      name: "Sarah M.",
      role: "Tech Solutions",
      date: "Nov 05, 2025",
      review:
        "Professional, compassionate, and always reliable when we need them.",
    },
    {
      img: people3,
      name: "James L.",
      role: "Creative Studio",
      date: "Dec 20, 2025",
      review:
        "Highly recommended for anyone seeking top-tier home healthcare services.",
    },
    {
      img: people4,
      name: "Emily R.",
      role: "EduCare Systems",
      date: "Jan 15, 2026",
      review: "The caregivers are kind, skilled, and incredibly supportive.",
    },
    {
      img: people5,
      name: "Michael B.",
      role: "FinGuard Corp",
      date: "Feb 02, 2026",
      review: "A seamless experience from booking to receiving excellent care.",
    },
    {
      img: people6,
      name: "David K.",
      role: "Wellness Co.",
      date: "Feb 18, 2026",
      review: "Truly grateful for the dedication and expertise provided daily.",
    },
    {
      img: people7,
      name: "Robert P.",
      role: "EcoFuture",
      date: "Mar 05, 2026",
      review: "Outstanding service that goes above and beyond expectations.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end items-start mb-12 gap-8">
          <SectionHeading
            badge="Client Stories"
            heading="Trusted by Over"
            highlight="5000+ Families"
            subheading=""
            centered={false}
          />

          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="max-w-md text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              Discover how our dedicated professionals are making a real
              difference in the lives of families across the country through
              compassionate care.
            </div>

            <div className="shrink-0">
              <PrimaryButton
                label="Get Started Now"
                className="w-60 py-2 text-base"
              />
            </div>
          </div>
        </div>

        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
