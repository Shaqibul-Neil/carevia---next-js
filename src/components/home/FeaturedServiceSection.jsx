import { getFeaturedServices } from "@/modules/services/servicesService";
import SectionHeading from "../headings/SectionHeadings";
import ServiceCard from "../shared/card/ServiceCard";
import { ArrowRight, Heart } from "lucide-react";
import PrimaryButton from "../shared/button/PrimaryButton";

const FeaturedServicesSection = async () => {
  const services = await getFeaturedServices();
  //console.log(services);
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex md:flex-row flex-col gap-3 justify-between md:items-end">
          {/* Section Heading */}
          <SectionHeading
            badge="Top Rated Services"
            heading="Expert Care Solutions for"
            highlight="Your Loved Ones"
            subheading="Compassionate, professional care services tailored to meet the unique needs of your family"
            icon={Heart}
            centered={false}
          />
          <div className="shrink-0">
            <PrimaryButton
              label=" Book a Service"
              className="w-60 py-3 text-base group"
              icon={
                <ArrowRight
                  size={20}
                  className="w-5 h-5 duration-500 group-hover:translate-x-1 transition-transform ml-2"
                />
              }
              iconPosition="right"
              href={"/services"}
            />
          </div>
        </div>
        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServicesSection;
