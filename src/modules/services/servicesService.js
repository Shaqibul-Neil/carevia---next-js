import {
  findAllServices,
  findFeaturedServices,
  findServicesByCategory,
  findSingleService,
  findSingleServiceDetails,
} from "./serviceRepository";

//Get all services
export const getAllServices = async () => {
  try {
    const services = await findAllServices();
    return services.map((service) => ({
      ...service,
      _id: service._id.toString(),
    }));
  } catch (error) {
    //console.error("[getAllServices] Error:", error.message);
    return [];
  }
};

//Get Featured services
export const getFeaturedServices = async () => {
  try {
    const services = await findFeaturedServices();
    return services.map((service) => ({
      ...service,
      _id: service._id.toString(),
    }));
  } catch (error) {
    //console.error("[getFeaturedServices] Error:", error.message);
    return [];
  }
};

//Get single service details by ID
export const getSingleServiceDetails = async (slug) => {
  try {
    const service = await findSingleServiceDetails(slug);
    return { ...service, _id: service._id.toString() } || null;
  } catch (error) {
    //console.error("[getSingleServiceDetails] Error:", error.message);
    return null;
  }
};

//Get services by category
export const getServicesByCategory = async (category) => {
  try {
    const services = await findServicesByCategory(category);

    //console.log(services);
    return (
      services.map((service) => ({
        ...service,
        _id: service._id.toString(),
      })) || []
    );
  } catch (error) {
    //console.error("[getServicesByCategory] Error:", error.message);
    return [];
  }
};

//get service for booking page by ID
export const getServiceForBookingPage = async (id) => {
  try {
    const service = await findSingleService(id);
    return { ...service, _id: service._id.toString() } || null;
  } catch (error) {
    //console.error("[getServiceForBookingPage] Error:", error.message);
    return null;
  }
};
