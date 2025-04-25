export interface CreateBlog {
  userId?: string;
  image: File;
  title: string;
  description: string;
  content: string;
}
