import PostEditor from "@/components/posts/PostEditor";
import Skeleton from "@/components/Skeleton";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post"
};

async function NewPost() {
  const users = await prisma.user.findMany();

  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl xs:text-4xl lg:text-5xl px-2 sm:px-5 lg:px-8 font-bold text-[hsl(200,100%,10%)] tracking-tight">
        Add New Post
      </h1>
      <Suspense fallback={<Skeleton height={100} rows={2} marginTop={50} />}>
        <PostEditor users={users} />
      </Suspense>
    </div>
  );
}

export default NewPost;
