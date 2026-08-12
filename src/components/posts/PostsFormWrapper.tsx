import { prisma } from "@/lib/prisma";
import PostsFormList from "./PostsFormList";

async function PostsFormWrapper() {
  const users = await prisma.user.findMany();

  return <PostsFormList users={users} />;
}

export default PostsFormWrapper;
