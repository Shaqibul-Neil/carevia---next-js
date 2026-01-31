import SectionHeading from "../headings/SectionHeadings";
import ServiceCard from "../shared/card/ServiceCard";

const FeaturedServicesSection = async () => {
  const data = await fetch(`${process.env.NEXTAUTH_URL}/api/services/featured`);
  console.log(data);
  const json = await data.json();
  console.log(json);
  const services = json.data;
  console.log(services);
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          badge="Top Rated Services"
          heading="Expert Care Solutions for Your Loved Ones"
          subheading="Compassionate, professional care services tailored to meet the unique needs of your family"
        />

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
