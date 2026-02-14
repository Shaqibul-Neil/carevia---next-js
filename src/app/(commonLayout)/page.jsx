import AboutUs from "@/components/home/AboutUs";
import Banner from "@/components/home/Banner";
import FeaturedServicesSection from "@/components/home/FeaturedServiceSection";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

// Home page revalidation every 30 minutes
export const revalidate = 1800;

export const metadata = {
  title: "Home",
  description: "Care That Comes Home",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      {/* Banner */}
      <Banner />
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
