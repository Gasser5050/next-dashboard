import type { Post } from "../types/Types";

type EditPost = {
  title: string;
  author: string;
  body: string;
  postId: string;
};

export function editPost({ title, author, body, postId }: EditPost) {
  try {
    const localPosts = localStorage.getItem("POSTS");
    if (!localPosts) return;

    const parsedPosts: Post[] = JSON.parse(localPosts || "[]");

    const newPosts = parsedPosts.map(post => {
      if (post.id.toString() === postId.toString())
        return {
          id: postId,
          title,
          author,
          body
        };

      return post;
    });

    localStorage.setItem("POSTS", JSON.stringify(newPosts));
  } catch (error) {
    console.error("Failed to save todo to localStorage:", error);
  }
}
