"use client";
import { useEffect, useState } from "react";
import type { Post } from "../../types/Types";
import PostCard from "./PostCard";

function PostList({
  initialPosts,
  query,
  author,
  oneUser
}: {
  initialPosts: Post[];
  query?: string;
  author?: string;
  oneUser?: boolean;
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const filteredPosts = query
    ? posts.filter(post => {
        const matchesQuery = post.title.toLowerCase().includes(query);
        const matchesAuthor = !author || post.userId.toString() === author;

        return matchesQuery && matchesAuthor;
      })
    : posts;

  useEffect(() => {
    if (oneUser) return;

    const localPosts = localStorage.getItem("POSTS");
    if (!localPosts) {
      localStorage.setItem("POSTS", JSON.stringify(initialPosts));
      return;
    }

    try {
      const parsedPosts = JSON.parse(localPosts || "[]");
      if (parsedPosts.length <= 0) return;
      setTimeout(() => setPosts(parsedPosts));
    } catch (error) {
      console.error("Error reading localStorage", error);
    }
  }, [initialPosts, oneUser]);

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-7 lg:mb-10">
      {filteredPosts.map(post => {
        return (
          <li key={post.id} className="h-full flex">
            <PostCard post={post} />
          </li>
        );
      })}
    </ul>
  );
}

export default PostList;
