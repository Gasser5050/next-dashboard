import Link from "next/link";
import { getComments, getPosts, getUsers } from "../../../lib/getData";
import type { Comment, Post, User } from "../../../types/Types";

async function PostInfo({ params }: { params: { id: string } }) {
  const { id } = await params;

  const post: Post = await getPosts(id, true);
  const [user, comments]: [user: User, comments: Comment[]] = await Promise.all(
    [getUsers(post?.userId.toString()), getComments(post.id.toString())]
  );

  return (
    <div className="px-8 md:px-12 xl:px-15 py-10">
      <div className="flex items-center justify-between space-x-3">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">{post.title}</h1>
        <Link
          href={`/posts/${id}/edit`}
          className={
            "text-xl bg-[hsl(200,100%,25%)] hover:bg-[hsl(200,100%,35%)] focus:bg-[hsl(200,100%,35%)] text-[hsl(200,20%,95%)] border px-4 py-3 rounded-xl cursor-pointer duration-150"
          }
        >
          Edit
        </Link>
      </div>
      <h2 className="text-2xl mb-6">
        By:{" "}
        <Link href={`/users/${user.id}`} className={"text-red-500"}>
          {user.name}
        </Link>
      </h2>
      <p className="text-xl md:text-2xl lg:text-3xl">{post.body}</p>
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
