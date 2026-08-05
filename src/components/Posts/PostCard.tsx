import Link from "next/link";
import { Post } from "../../types/Types";

function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col space-y-3 bg-white rounded-lg shadow w-full">
      <h2 className="text-3xl px-5 pt-3 py-2 border-b text-center line-clamp-1 leading-12 capitalize">
        {post.title}
      </h2>
      <p className="py-2.5 px-6 md:px-8 -mt-2 text-2xl border-b leading-10 line-clamp-5 grow">
        {post.body}
      </p>
      <div className="pb-7 py-4 px-4 self-end">
        <Link
          className="text-2xl bg-[hsl(200,100%,25%)] hover:bg-[hsl(200,100%,35%)] focus:bg-[hsl(200,100%,35%)] text-[hsl(200,20%,95%)] border px-4 py-3 rounded-xl cursor-pointer duration-150"
          href={`/posts/${post.id.toString()}`}
        >
          View
        </Link>
      </div>
    </article>
  );
}

export default PostCard;
