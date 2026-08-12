import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import PostInfo from "@/components/posts/PostInfo";
import PostInfoSkeleton from "@/components/posts/PostInfoSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Post"
};

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    take: 50,
    orderBy: {
      id: "desc"
    },
    select: {
      id: true
    }
  });

  return posts.map(post => {
    return {
      id: post.id.toString()
    };
  });
}

async function Post({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;

  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<PostInfoSkeleton />}>
        <PostInfo id={id} />
      </Suspense>
    </div>
  );
}

export default Post;
