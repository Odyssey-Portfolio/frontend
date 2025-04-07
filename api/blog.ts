import { BLOG_ENDPOINT } from "@/_constants/Endpoints";
import { GetBlogsParams } from "@/_models/GetBlogsParams";
import { queryBuilder } from "@/utils/QueryUtils";
import axios from "axios";
import { CreateBlog } from "../_models/CreateBlog";
import { toFormData } from "../utils/FormUtils";

export async function createBlog(blog: CreateBlog) {
  const blogFormData = toFormData(blog);
  const response = await axios.post(BLOG_ENDPOINT, blogFormData);
  return response;
}

export async function getBlogs(params: GetBlogsParams) {
  const query = queryBuilder(params);
  const response = await axios.get(`${BLOG_ENDPOINT}${query}`);
  return response;
}
