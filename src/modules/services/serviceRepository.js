const { dbConnect } = require("@/lib/dbConnect");
const { ObjectId } = require("mongodb");

const serviceCollection = () => dbConnect("services");

// Find featured services
export const findFeaturedServices = () => {
  return serviceCollection()
    .find(
      { isFeatured: true },
      {
        projection: {
          _id: 1,
          slug: 1,
          category: 1,
          serviceName: 1,
          image: 1,
          detailedDescription: 1,
          price: 1,
          availability: 1,
          ratingSummary: 1,
          locationCoverage: 1,
        },
      },
    )
    .toArray();
};

// Find all services
export const findAllServices = ({ searchTerm, category, division }) => {
  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (division) {
    const activeDivision = Array.isArray(division) ? division : [division];
    filter["locationCoverage.supportedDivisions"] = {
      $in: [...activeDivision],
    };
  }
  if (searchTerm) filter.serviceName = { $regex: searchTerm, $options: "i" };

  return serviceCollection()
    .find(filter, {
      projection: {
        _id: 1,
        slug: 1,
        category: 1,
        serviceName: 1,
        image: 1,
        detailedDescription: 1,
        price: 1,
        availability: 1,
        ratingSummary: 1,
        locationCoverage: 1,
      },
    })
    .toArray();
};

//Find Single Service by ID for booking page
export const findSingleService = (id) => {
  return serviceCollection().findOne(
    { _id: new ObjectId(id) },
    {
      projection: {
        _id: 1,
        category: 1,
        serviceName: 1,
        image: 1,
        price: 1,
        locationCoverage: 1,
      },
    },
  );
};

//Find Single Service Details by slug
export const findSingleServiceDetails = (slug) => {
  return serviceCollection().findOne({ slug: slug });
};

//Find services by category
export const findServicesByCategory = (category) => {
  return serviceCollection()
    .find(
      { category: category },
      {
        projection: {
          _id: 1,
          slug: 1,
          serviceName: 1,
          image: 1,
          price: 1,
          ratingSummary: 1,
        },
      },
    )
    .limit(5) // Limit to 5 related services
    .toArray();
};

//------------------Admin Actions---------------------
// Create new services
// Update services
// Delete services
