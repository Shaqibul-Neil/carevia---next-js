import FeaturedServicesSection from "@/components/home/FeaturedServiceSection";
import ServiceCardSkeleton from "@/components/skeleton/ServiceCardSkeleton";

// Home page revalidation every 30 minutes
export const revalidate = 1800;

export default async function Home() {
  return (
    <div>
      Home
      {/* Featured Service */}
      <FeaturedServicesSection />
      <ServiceCardSkeleton  count={6} />
    </div>
  );
}
