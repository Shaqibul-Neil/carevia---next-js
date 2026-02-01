const { dbConnect } = require("@/lib/dbConnect");

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
export const findAllServices = () => {
  return serviceCollection()
    .find(
      {},
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

//Find Single Service by ID
export const findSingleService = (id) => {
  return serviceCollection().findOne({ _id: id });
};

//Find Single Service Details by Id

//------------------Admin Actions---------------------
// Create new services
// Update services
// Delete services
