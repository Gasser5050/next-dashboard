import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";
import PostsWrapper from "@/components/posts/PostsWrapper";
import PostsFormWrapper from "@/components/posts/PostsFormWrapper";
import PostsFormSkeleton from "@/components/posts/PostsFormSkeleton";

export const metadata: Metadata = {
  title: "Posts"
};

async function Posts() {
  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Add a new post */}
      <header className="flex justify-between mb-5 lg:mb-7">
        <h1 className="text-4xl lg:text-5xl font-bold text-[hsl(200,100%,10%)] tracking-tight">
          Posts
        </h1>

        <Link
          href={"/posts/new"}
          className="text-xl border p-2 text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 rounded-lg h-fit"
        >
          New
        </Link>
      </header>

      <section className="px-2 sm:px-5">
        {/* Search for a post */}
        <Suspense fallback={<PostsFormSkeleton />}>
          <PostsFormWrapper />
        </Suspense>

        {/* Posts wrapper */}
        <Suspense fallback={<Skeleton height={300} rows={4} />}>
          <PostsWrapper />
        </Suspense>
      </section>
    </div>
  );
}

export default Posts;
