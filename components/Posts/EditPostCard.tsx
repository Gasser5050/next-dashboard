"use client";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { editPost } from "../../lib/editPost";
import type { Post, User } from "../../types/Types";

function EditPostCard({
  users,
  post,
  postId
}: {
  users: User[];
  post: Post;
  postId: string;
}) {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLSelectElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const title = titleRef?.current?.value || "";
    const author = authorRef?.current?.value || "";
    const body = bodyRef?.current?.value || "";

    editPost({ title, author, body, postId });
    router.replace("/posts");
  }

  return (
    <>
      <h1 className="text-4xl lg:text-5xl mb-4 font-bold text-[hsl(200,100%,10%)] tracking-tight">
        Edit Post: {post?.title}
      </h1>
      <form onSubmit={handleSubmit} className="mt-10">
        <fieldset className="grid grid-cols-2 grid-rows-1 gap-2 lg:gap-4">
          <legend className="sr-only">Post Details Form Fields</legend>

          <div className="flex flex-col">
            <label htmlFor="title" className="md:text-xl mb-0.5">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              ref={titleRef}
              defaultValue={post.title}
              autoFocus
              required
              className="border bg-white px-2 py-1 lg:py-1.5 rounded-md h-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="author" className="md:text-xl">
              Author
            </label>
            <select
              id="author"
              name="author"
              ref={authorRef}
              defaultValue={post.userId}
              className="border bg-white px-2 rounded-md h-full"
            >
              <option value="">Any</option>
              {users?.map(user => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col col-span-2 mb-2">
            <label htmlFor="body" className="md:text-xl mb-0.5">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              ref={bodyRef}
              defaultValue={post.body}
              rows={5}
              required
              className="border bg-white px-2 py-1 lg:py-1.5 rounded-md scrollbar-none"
            />
          </div>
        </fieldset>
        <div className="flex items-center justify-end mt-1">
          <div className="flex space-x-2">
            <Link
              href={"/posts"}
              className="text-[hsl(200,100%,30%)] bg-white border px-2 py-1 rounded-sm cursor-pointer hover:scale-105"
            >
              Back
            </Link>
            <button
              className={`bg-[hsl(200,100%,30%)] text-white border px-2 py-1 rounded-sm cursor-pointer hover:scale-105}`}
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditPostCard;
