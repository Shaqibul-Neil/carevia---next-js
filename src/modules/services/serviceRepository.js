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
export const findAllServices = async ({
  searchTerm,
  category,
  division,
  rating,
  priceSort,
  page,
  limit = 6,
}) => {
  //price sorting
  const sortQuery = {};
  if (priceSort === "Low to High") {
    sortQuery["price.perHour"] = 1;
  } else if (priceSort === "High to Low") {
    sortQuery["price.perHour"] = -1;
  }

  const filter = {};

  //category filter
  if (category) {
    filter.category = category;
  }
  //division filter
  if (division) {
    const activeDivision = Array.isArray(division) ? division : [division];
    filter["locationCoverage.supportedDivisions"] = {
      $in: [...activeDivision],
    };
  }
  //rating filter
  if (rating) {
    const r = Number(rating);
    let maxRating;
    if (r === 4) {
      maxRating = 4.5;
    } else if (r === 4.5) {
      maxRating = 4.9;
    } else if (r === 5) {
      maxRating = 5.1;
    } else {
      maxRating = r + 1;
    }

    filter["ratingSummary.averageRating"] = {
      $gte: r,
      $lt: maxRating,
    };
  }
  //search
  if (searchTerm) filter.serviceName = { $regex: searchTerm, $options: "i" };

  //get total service count
  const totalCount = await serviceCollection().countDocuments(filter);
  //will always be dynamic if filter is applied
  const totalPage = Math.ceil(totalCount / Number(limit));
  const currentPage = Number(page) || 1;
  // If current page exceeds total pages after filtering,
  // reset page to 1 to avoid empty results
  const safePage = currentPage > totalPage ? 1 : currentPage;
  const services = await serviceCollection()
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
    .skip((safePage - 1) * Number(limit))
    .limit(Number(limit))
    .sort(sortQuery)
    .toArray();

  return { services, totalPage, totalCount };
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
