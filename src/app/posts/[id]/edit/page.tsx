import PostEditor from "@/components/posts/PostEditor";
import Skeleton from "@/components/Skeleton";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Edit Post"
};

async function EditPost({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;

  const [post, users] = await Promise.all([
    prisma.post.findUnique({
      where: {
        id: Number(id)
      }
    }),
    prisma.user.findMany()
  ]);
  if (!post) notFound();

  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl xs:text-4xl lg:text-5xl px-2 sm:px-5 lg:px-8 font-bold text-[hsl(200,100%,10%)] tracking-tight">
        Edit Post: {post?.title}
      </h1>
      <Suspense fallback={<Skeleton height={100} rows={2} marginTop={50} />}>
        <PostEditor users={users} post={post} isEditing />
      </Suspense>
    </div>
  );
}

export default EditPost;
