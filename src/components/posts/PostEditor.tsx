"use client";
import Link from "next/link";
import { useActionState } from "react";
import { createPost, editPost } from "@/actions/savePost";
import { cn } from "@/utils/cn";
import type { PostModel, UserModel } from "@/generated/prisma/models";

function PostEditor({
  users,
  post,
  isEditing
}: {
  users: UserModel[];
  post?: PostModel;
  isEditing?: boolean;
}) {
  const serverAction = isEditing ? editPost : createPost;
  const [error, action, isPending] = useActionState(serverAction, {
    error: "",
    fields: {
      title: "",
      author: "",
      body: ""
    }
  });

  const submitButton = isEditing ? "Edit" : "Create";
  const loadingButton = isEditing ? "Editing..." : "Creating...";

  return (
    <form action={action} className="px-2 sm:px-5 lg:px-8 mt-10">
      {/* Form Fields */}
      <fieldset className="grid grid-cols-2 grid-rows-1 gap-2 lg:gap-4">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="md:text-xl mb-0.5">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            minLength={5}
            defaultValue={error?.fields?.title?.toString() || post?.title || ""}
            required
            className="border bg-white px-2 py-1 lg:py-1.5 rounded-md h-full"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col">
          <label htmlFor="author" className="md:text-xl">
            Author
          </label>
          <select
            id="author"
            name="author"
            required
            key={error?.fields?.author?.toString() || post?.title}
            defaultValue={
              error?.fields?.author?.toString() || post?.userId || ""
            }
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

        {/* Body */}
        <div className="flex flex-col col-span-2 mb-2">
          <label htmlFor="body" className="md:text-xl mb-0.5">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            rows={5}
            minLength={20}
            required
            defaultValue={error?.fields?.body?.toString() || post?.body || ""}
            className="border bg-white px-2 py-1 lg:py-1.5 rounded-md scrollbar-none"
          />
        </div>

        {isEditing && <input type="hidden" name="postId" value={post?.id} />}
      </fieldset>

      <div className="flex items-center justify-between mt-1">
        <p className="text-red-500 text-sm md:text-md">{error.error}</p>

        <div className="flex space-x-2">
          <Link
            href={isEditing ? `/posts/${post?.id}` : "/posts"}
            className="text-[hsl(200,100%,30%)] bg-white border px-2 py-1 rounded-sm cursor-pointer hover:scale-105 transition-transform"
          >
            Back
          </Link>
          <button
            disabled={isPending}
            className={cn(
              "bg-[hsl(200,100%,30%)] text-white border px-2 py-1 rounded-sm cursor-pointer hover:scale-105 transition-transform",
              isPending ? "bg-gray-500 text-white" : ""
            )}
          >
            {isPending ? loadingButton : submitButton}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PostEditor;
