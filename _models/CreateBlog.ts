export interface CreateBlog {
  userId?: string;
  isUpdateMode?: boolean;
  image: File | string;
  title: string;
  description: string;
  content: string;
}
