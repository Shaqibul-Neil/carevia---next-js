const { dbConnect } = require("@/lib/dbConnect");

const serviceCollection = () => dbConnect("services");

// Find featured services
export const findFeaturedServices = () => {
  return serviceCollection().find({ isFeatured: true }).toArray();
};

// Find all services
export const findAllServices = () => {
  return serviceCollection().find({}).toArray();
};

//Find Single Service by ID
export const findSingleService = (id) => {
  return serviceCollection().findOne({ _id: id });
};

//------------------Admin Actions---------------------
// Create new services
// Update services
// Delete services
