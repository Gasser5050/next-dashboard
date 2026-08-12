import { cache, Suspense } from "react";
import { prisma } from "@/lib/prisma";
import PostInfo from "@/components/posts/PostInfo";
import PostInfoSkeleton from "@/components/posts/PostInfoSkeleton";

type PostType = {
  params: {
    id: string;
  };
};

export const getPost = cache(async (id: string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) return null;

  return prisma.post.findUnique({
    where: { id: numericId }
  });
});

export async function generateMetadata({ params }: PostType) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = post.body ? post.body.slice(0, 160) : "";

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article"
    }
  };
}

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

async function Post({ params }: PostType) {
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
