"use client";
import { useSearchParams } from "next/navigation";
import PostCard from "./PostCard";
import type { PostModel } from "@/generated/prisma/models";

function PostList({ posts }: { posts: PostModel[] }) {
  const params = useSearchParams();
  const query = params?.get("query")?.toLowerCase() || "";
  const author = params?.get("author")?.toLowerCase() || "";

  const filteredPosts = posts.filter(post => {
    const matchesQuery = post.title.toLowerCase().includes(query);
    const matchesAuthor = !author || post.userId.toString() === author;

    return matchesQuery && matchesAuthor;
  });

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-7 lg:mb-10">
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
