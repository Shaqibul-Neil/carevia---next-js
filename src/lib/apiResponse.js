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
};
