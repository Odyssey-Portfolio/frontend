export interface CreateBlog {
  userId?: string;
  image: File | string;
  title: string;
  description: string;
  content: string;
}
