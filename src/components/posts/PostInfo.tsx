import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getPost } from "@/app/posts/[id]/page";

async function PostInfo({ id }: { id: string }) {
  const post = await getPost(id);

  if (!post) notFound();

  const [user, comments] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: post?.userId
      }
    }),
    prisma.comment.findMany({
      where: {
        postId: post?.id
      }
    })
  ]);

  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-2">
      <div className="flex items-center justify-between space-x-3">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">{post?.title}</h1>
        <Link
          href={`/posts/${id}/edit`}
          className="text-xl bg-[hsl(200,100%,25%)] hover:bg-[hsl(200,100%,35%)] focus:bg-[hsl(200,100%,35%)] text-[hsl(200,20%,95%)] border px-4 py-3 rounded-xl cursor-pointer duration-150"
        >
          Edit
        </Link>
      </div>
      <h2 className="text-2xl mb-6">
        By:{" "}
        <Link href={`/users/${user?.id}`} className={"text-red-500"}>
          {user?.name}
        </Link>
      </h2>
      <p className="text-xl md:text-2xl lg:text-3xl">{post?.body}</p>
      <div className="flex items-center space-x-2 mt-6 mb-4 md:mb-6">
        <h3 className="font-bold text-3xl ">Comments</h3>
        {comments.length === 0 && (
          <p className="text-lg pt-1">&minus;&minus;&gt; No Comments Found</p>
        )}
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8">
        {comments.length !== 0 &&
          comments.map(comment => {
            return (
              <li
                key={comment.id}
                className="bg-white border px-4 md:px-8 py-6 md:py-8 space-y-3 md:space-y-5 rounded-lg"
              >
                <p className="text-lg underline underline-offset-3">
                  {comment.email}
                </p>
                <p className="text-2xl">{comment.body}</p>
              </li>
            );
          })}
      </ul>
      <Link
        href={"/posts"}
        className={"bg-white border px-2 py-3 rounded-lg hover:bg-white/10"}
      >
        Back to Posts
      </Link>
    </div>
  );
}

export default PostInfo;
