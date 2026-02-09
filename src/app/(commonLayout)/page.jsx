import AboutUs from "@/components/home/AboutUs";
import FeaturedServicesSection from "@/components/home/FeaturedServiceSection";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";

// Home page revalidation every 30 minutes
export const revalidate = 1800;

export const metadata = {
  title: "Home",
  description: "Care That Comes Home",
};

export default async function Home() {
  return (
    <div>
      {/* About us */}
      <AboutUs />
      {/* Featured Service */}
      <FeaturedServicesSection />
      {/* Newsletter section */}
      <Newsletter />
      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
