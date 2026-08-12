"use client";
import { useRef } from "react";
import { UserModel } from "@/generated/prisma/models";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function PostsFormList({ users }: { users: UserModel[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLSelectElement>(null);

  function handleSearch(e: React.SubmitEvent) {
    e.preventDefault();

    const query = queryRef?.current?.value || "";
    const author = authorRef?.current?.value || "";
    const params = new URLSearchParams(searchParams);

    if (query || author) {
      params.set("query", query);
      params.set("author", author);
    } else {
      params.delete("query");
      params.delete("author");
    }

    const paramsString = params.toString();
    const url = paramsString ? `${pathname}?${paramsString}` : pathname;

    router.replace(url);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col md:flex-row justify-center items-center md:items-end space-y-3 md:space-y-0 md:space-x-2 lg:space-x-4 mb-5"
    >
      <div className="flex flex-col w-full md:grow">
        <label htmlFor="query">Query</label>
        <input
          id="query"
          name="query"
          type="search"
          ref={queryRef}
          className="border bg-white px-2 py-1 rounded-lg"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/3">
        <label htmlFor="author">Author</label>
        <select
          id="author"
          name="author"
          ref={authorRef}
          className="border bg-white px-2 py-1 rounded-lg"
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
      <button
        type="submit"
        className="text-lg border px-2 py-1 text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 rounded-lg h-fit cursor-pointer"
      >
        Filter
      </button>
    </form>
  );
}

export default PostsFormList;
