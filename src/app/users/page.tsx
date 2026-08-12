import Skeleton from "@/components/Skeleton";
import UsersWrapper from "@/components/users/UsersWrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users"
};

async function Users() {
  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="px-2 sm:px-5">
        <h1 className="font-bold text-4xl lg:text-5xl mb-10 text-[hsl(200,100%,10%)] tracking-tight">
          Users
        </h1>
      </header>

      <Suspense fallback={<Skeleton rows={3} height={250} />}>
        <UsersWrapper />
      </Suspense>
    </div>
  );
}

export default Users;
