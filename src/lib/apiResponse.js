export const ApiResponse = {
  success: (data, message = "Success", statusCode = 200) => {
    return Response.json(
      { success: true, message, data },
      { status: statusCode },
    );
  },
  created: (data, message = "Created Successfully") => {
    return Response.json({ success: true, message, data }, { status: 201 });
  },
  error: (
    message = "Something went wrong",
    statusCode = 500,
    errors = null,
  ) => {
    return Response.json(
      { success: false, message, errors },
      { status: statusCode },
    );
  },
  validationError: (errors) => {
    return Response.json(
      { success: false, message: "Validation failed", errors },
      { status: 422 },
    );
  },
  unauthorized: (message = "Unauthorized. Please login first.") => {
    return Response.json(
      { success: false, message },
      { status: 401 }
    );
  },
  forbidden: (
    message = "You don't have permission to access this resource.",
  ) => {
    return Response.json({ success: false, message }, { status: 403 });
  },
  notFound: (message = "Resource not found") => {
    return Response.json({ success: false, message }, { status: 404 });
  },
  badRequest: (message = "Bad request", errors = null) => {
    return Response.json({ success: false, message, errors }, { status: 400 });
  },
};
