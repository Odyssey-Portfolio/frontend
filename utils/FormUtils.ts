export function toFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      formData.append(key, String(value));
    } else if (value !== null && typeof value === "object") {
      // Optional: Serialize nested object as JSON string if needed
      formData.append(key, JSON.stringify(value));
    } else if (value === null || value === undefined) {
      // Optional: skip or append empty string
      formData.append(key, "");
    }
  });

  return formData;
}
