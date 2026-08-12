import { prisma } from "@/lib/prisma";
import PostList from "./PostList";

async function PostsWrapper() {
  const posts = await prisma.post.findMany();

  return <PostList posts={posts} />;
}

export default PostsWrapper;
