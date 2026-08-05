import Link from "next/link";
import { Suspense } from "react";
import { getUsers } from "../../lib/getData";
import PostSearchForms from "../../components/Posts/PostSearchForms";
import PostListWrapper from "../../components/Posts/PostListWrapper";
import Skeleton from "../../components/Skeleton";
import type { User } from "../../types/Types";

async function Posts({
  searchParams
}: {
  searchParams: { query: string; author: string };
}) {
  const users: User[] = await getUsers();
  const params = await searchParams;
  const query = params?.query?.toLowerCase() || "";
  const author = params.author || "";

  return (
    <div className="px-8 md:px-12 xl:px-15 py-10">
      {/* Add a new post */}
      <div className="flex justify-between mb-5 lg:mb-7">
        <h1 className="text-4xl lg:text-5xl font-bold text-[hsl(200,100%,10%)] tracking-tight">
          Posts
        </h1>

        <Link
          href={"/posts/new"}
          className="text-xl border p-2 text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 rounded-lg h-fit"
        >
          New
        </Link>
      </div>

      {/* Search for a post */}
      <PostSearchForms users={users} />

      {/* Posts wrapper */}
      <Suspense fallback={<Skeleton height={300} rows={4} />}>
        <PostListWrapper query={query} author={author} />
      </Suspense>
    </div>
  );
}

export default Posts;
