import FeaturedServicesSection from "@/components/home/FeaturedServiceSection";

// Home page revalidation every 30 minutes
export const revalidate = 1800;

export const metadata = {
  title: "Home",
  description: "Care That Comes Home",
};

export default async function Home() {
  return (
    <div>
      Home
      {/* Featured Service */}
      <FeaturedServicesSection />
    </div>
  );
}
