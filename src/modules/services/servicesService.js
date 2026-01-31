import { findAllServices, findFeaturedServices } from "./serviceRepository";

//Get all services
export const getAllServices = async () => {
  try {
    const services = await findAllServices();
    return services || [];
  } catch (error) {
    console.error("[getAllServices] Error:", error.message);
    return [];
  }
};
//Get Featured services
export const getFeaturedServices = async () => {
  try {
    const services = await findFeaturedServices();
    return services || [];
  } catch (error) {
    console.error("[getFeaturedServices] Error:", error.message);
    return [];
  }
};

//Get single service by ID
