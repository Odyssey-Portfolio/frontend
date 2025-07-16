export interface GetBlog {
  id: string;
  image: string;
  title: string;
  content: string;
  description: string;
}

export interface GetBlogAdmin extends GetBlog {
  isDeleted: boolean;
}
