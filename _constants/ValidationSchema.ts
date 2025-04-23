import * as yup from "yup";

export const createBlogSchema = yup.object({
  userId: yup.string().optional(),
  image: yup
    .mixed<File>()
    .required("Image is required")
    .test(
      "fileSize",
      "Image is too large",
      (file) => (file ? file.size <= 5 * 1024 * 1024 : false) // max 5MB
    )
    .test("fileType", "Unsupported file type", (file) =>
      file
        ? ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
        : false
    ),
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title can't exceed 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(300, "Description can't exceed 300 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(20, "Content must be at least 20 characters"),
});
