import { BLOG_ENDPOINT } from "@/_constants/Endpoints";
import { GetBlogsParams } from "@/_models/GetBlogsParams";
import { UpdateBlog } from "@/_models/UpdateBlog";
import axiosInstance from "@/lib/axios";
import { queryBuilder } from "@/utils/QueryUtils";
import { CreateBlog } from "../_models/CreateBlog";
import { toFormData } from "../utils/FormUtils";

export async function createBlog(blog: CreateBlog) {
  const blogFormData = toFormData(blog);
  const response = await axiosInstance.post(BLOG_ENDPOINT, blogFormData);
  return response;
}

export async function getBlogs(params: GetBlogsParams) {
  const query = queryBuilder(params);
  const response = await axiosInstance.get(`${BLOG_ENDPOINT}${query}`);
  return response;
}

export async function updateBlog(blog: UpdateBlog) {
  const blogFormData = toFormData(blog);
  const response = await axiosInstance.put(BLOG_ENDPOINT, blogFormData);
  return response;
}
