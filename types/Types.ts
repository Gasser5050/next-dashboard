export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Geo = {
  lat: string;
  lng: string;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type Post = {
  id: `${string}-${string}-${string}-${string}-${string}` | string;
  userId: number | string;
  title: string;
  body: string;
};

export type Todo = {
  id: `${string}-${string}-${string}-${string}-${string}` | string;
  userId: number;
  title: string;
  completed: boolean;
};

export type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type PostPage = {
  comments: Comment[];
  post: Post;
  user: User;
};

export type UserPage = {
  user: User;
  posts: Post[];
  todos: Todo[];
};
