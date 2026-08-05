"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { addPost } from "../../lib/addData";
import { postSchema } from "../../lib/schemas";
import type { User } from "../../types/Types";

function AddPostForm({ users }: { users: User[] }) {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLSelectElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const title = titleRef?.current?.value.trim() || "";
    const author = authorRef?.current?.value.trim() || "";
    const body = bodyRef?.current?.value.trim() || "";

    const result = postSchema.safeParse({ title, author, body });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);

    addPost({
      id: Date.now().toString(),
      userId: result.data.author,
      title: result.data.title,
      body: result.data.body
    });

    router.back();
  }

  return (
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
            rows={5}
            required
            className="border bg-white px-2 py-1 lg:py-1.5 rounded-md scrollbar-none"
          />
        </div>
      </fieldset>
      <div className="flex items-center justify-between mt-1">
        <p className="text-red-500 text-sm md:text-md mt-1">{error}</p>
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
            Create
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddPostForm;
