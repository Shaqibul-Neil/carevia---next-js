import FilterSidebar from "@/components/form/FilterSidebar";
import SearchBar from "@/components/form/SearchBar";
import PageHeading from "@/components/headings/PageHeading";
import PaginationButton from "@/components/shared/button/PaginationButton";
import ServiceCard from "@/components/shared/card/ServiceCard";
import { getAllServices } from "@/modules/services/servicesService";
import { Heart } from "lucide-react";

// ISR: Revalidate every 30 minutes
export const revalidate = 1800;
//Meta data for seo
export const metadata = {
  title: "All Services",
  description: "Care That Comes Home",
};

const ServicesPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const searchTerm = resolvedParams.searchTerm || "";
  const category = resolvedParams.category || "";
  const division = resolvedParams.division || "";
  const rating = resolvedParams.rating || "";
  const priceSort = resolvedParams.priceSort || "";
  const page = resolvedParams.page || "";
  console.log(resolvedParams);

  // Fetch all services
  const { success, services, totalPage, currentPage } = await getAllServices({
    searchTerm,
    category,
    division,
    rating,
    priceSort,
    page,
  });

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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters (1 column) */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24  rounded-lg border border-border bg-card shadow-sm">
                <FilterSidebar />
              </div>
            </aside>

            {/* Right Content - Service Cards (3 columns) */}
            <main className="lg:col-span-3 space-y-6">
              {/* Search Bar - Full Width */}
              <SearchBar />
              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {!success ? (
                  <div className="col-span-full text-center py-12 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-red-600 dark:text-red-400 font-medium text-lg mb-2">
                      Unable to load services at the moment.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Please try refreshing the page or check your connection.
                    </p>
                  </div>
                ) : services.length > 0 ? (
                  /* Service available */
                  services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))
                ) : (
                  /* If No Service. (Filtered Empty) */
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      No services found. Please adjust your filters.
                    </p>
                  </div>
                )}
              </div>
              {/* Pagination */}
              {success && services.length > 0 && (
                <PaginationButton
                  totalPage={totalPage}
                  currentPage={currentPage}
                />
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
