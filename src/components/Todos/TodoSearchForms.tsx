"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

function SearchForms() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = inputRef?.current?.value || "";
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("query", value);
    } else params.delete("query");

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(url);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-center items-end space-x-4 mb-5 "
    >
      <div className="flex flex-col grow">
        <label htmlFor="query">Search</label>
        <input
          id="query"
          name="query"
          type="search"
          ref={inputRef}
          className="border bg-white px-2 py-1 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="text-lg border px-2 py-1 text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 rounded-lg h-fit cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForms;
