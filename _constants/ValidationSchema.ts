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

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Title is required")
    .min(5, "Name should be at least 5 characters.")
    .max(50, "Name should not exceed 50 characters."),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .max(100, "Email can't exceed 100 characters"),

  password: yup
    .string()
    .required("Password is required")
    .max(100, "Password can't exceed 100 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .max(100, "Email can't exceed 100 characters"),

  password: yup.string().required("Password is required"),
});
