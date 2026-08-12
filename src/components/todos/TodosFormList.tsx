"use client";
import { useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function TodosFormList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchRefs = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const searchValue = searchRefs?.current?.value || "";
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      params.set("query", searchValue);
    } else params.delete("query");

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.replace(url);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-end space-x-4 mb-5"
    >
      <div className="flex flex-col grow">
        <label htmlFor="query">Search</label>
        <input
          id="query"
          name="query"
          type="search"
          ref={searchRefs}
          className="border bg-white px-2 py-1 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="text-lg px-2 py-1 border text-[hsl(200,20%,95%)] bg-[hsl(200,100%,20%)] hover:scale-105 transition-transform rounded-lg cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}

export default TodosFormList;
