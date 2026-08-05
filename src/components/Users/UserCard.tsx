import Link from "next/link";
import type { User } from "../../types/Types";

function UserCard({ user }: { user: User }) {
  return (
    <article className="flex flex-col space-y-3 bg-white rounded-lg shadow">
      <h2 className="text-3xl p-4 border-b capitalize">{user.name}</h2>
      <div className="pb-4 border-b">
        <p className="px-6 md:px-8 text-2xl">{user.company.name}</p>
        <p className="px-6 md:px-8 text-2xl">{user.website}</p>
        <p className="px-6 md:px-8 text-2xl">{user.email}</p>
      </div>
      <div className="pb-7 py-4 px-4 self-end">
        <Link
          className="text-2xl bg-[hsl(200,100%,25%)] hover:bg-[hsl(200,100%,35%)] focus:bg-[hsl(200,100%,35%)] text-[hsl(200,20%,95%)] border px-4 py-3 rounded-xl cursor-pointer duration-150"
          href={`users/${user.id.toString()}`}
        >
          View
        </Link>
      </div>
    </article>
  );
}

export default UserCard;
