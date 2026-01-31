import FilterSidebar from "@/components/form/FilterSidebar";
import SearchBar from "@/components/form/SearchBar";
import SectionHeading from "@/components/headings/SectionHeadings";
import ServiceCard from "@/components/shared/card/ServiceCard";
import ServiceCardSkeleton from "@/components/skeleton/ServiceCardSkeleton";
import { getAllServices } from "@/modules/services/servicesService";
import { Heart } from "lucide-react";
import { Suspense } from "react";

// ISR: Revalidate every 30 minutes
export const revalidate = 1800;

const ServicesPage = async () => {
  // Fetch all services
  const services = await getAllServices();

  return (
    <div className="min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Page Heading */}
        <SectionHeading
          badge="All Services"
          heading="Find the Perfect Care Solution"
          subheading="Browse through our comprehensive range of professional care services designed to support your family's unique needs"
          icon={Heart}
          centered={true}
        />

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
    </div>
  );
};

export default ServicesPage;
