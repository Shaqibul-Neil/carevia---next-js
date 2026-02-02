export const validateWithSchema = (schema, payload) => {
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    // Format errors for frontend
    const errors = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }
  return { success: true, data: parsed.data };
};
