"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "../../types/Types";
import { useRef } from "react";

function PostSearchForms({ users }: { users: User[] }) {
  const authorRef = useRef<HTMLSelectElement>(null);
  const queryRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const queryValue = queryRef?.current?.value || "";
    const authorValue = authorRef?.current?.value || "";
    const params = new URLSearchParams(searchParams.toString());

    if (queryValue) params.set("query", queryValue);
    else params.delete("query");

    if (authorValue) params.set("author", authorValue);
    else params.delete("author");

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
      <button className="text-lg border px-2 py-1 text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 rounded-lg h-fit cursor-pointer">
        Filter
      </button>
    </form>
  );
}

export default PostSearchForms;
