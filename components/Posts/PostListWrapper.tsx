import { getPosts } from "../../lib/getData";
import PostList from "./PostList";

async function PostListWrapper({
  query,
  author
}: {
  query: string;
  author: string;
}) {
  const posts = await getPosts();

  return <PostList initialPosts={posts} query={query} author={author} />;
}

export default PostListWrapper;
