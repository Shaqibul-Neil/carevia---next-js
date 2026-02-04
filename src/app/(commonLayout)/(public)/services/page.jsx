import FilterSidebar from "@/components/form/FilterSidebar";
import SearchBar from "@/components/form/SearchBar";
import PageHeading from "@/components/headings/PageHeading";
import ServiceCard from "@/components/shared/card/ServiceCard";
import ServiceCardSkeleton from "@/components/skeleton/ServiceCardSkeleton";
import { getAllServices } from "@/modules/services/servicesService";
import { Heart } from "lucide-react";
import { Suspense } from "react";

// ISR: Revalidate every 30 minutes
export const revalidate = 1800;

export const metadata = {
  title: "All Services",
  description: "Care That Comes Home",
};

const ServicesPage = async () => {
  // Fetch all services
  const services = await getAllServices();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Page Heading */}
      {/* Page Heading */}
      <PageHeading
        badge="All Services"
        heading="Find the Perfect"
        highlight="Care Solution"
        subheading="Browse through our comprehensive range of professional care services designed to support your family's unique needs"
        icon={Heart}
        showTrustIndicators={false}
        trustIndicators={[
          "Instant Confirmation",
          "Flexible Scheduling",
          "100% Satisfaction Guaranteed",
        ]}
        variant="gradient"
      />
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Main Layout: Filter Sidebar + Service Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters (1 column) */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-lg border border-border bg-card shadow-sm">
                <FilterSidebar />
              </div>
            </aside>

            {/* Right Content - Service Cards (3 columns) */}
            <main className="lg:col-span-3 space-y-6">
              {/* Search Bar - Full Width */}
              <SearchBar />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Suspense fallback={<ServiceCardSkeleton />}>
                  {services.length > 0 ? (
                    services.map((service) => (
                      <ServiceCard key={service._id} service={service} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground text-lg">
                        No services found. Please adjust your filters.
                      </p>
                    </div>
                  )}
                </Suspense>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
