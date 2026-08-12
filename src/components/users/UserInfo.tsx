import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PostCard from "../posts/PostCard";

async function UserInfo({ id }: { id: string }) {
  const [user, posts, todos] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    }),
    prisma.post.findMany({
      where: {
        userId: Number(id)
      }
    }),
    prisma.todo.findMany({
      where: {
        userId: Number(id)
      }
    })
  ]);

  return (
    <div className="grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="sr-only">User Info</h1>

      {/* User Description */}
      <section className="px-2 sm:px-5">
        <h2 className="text-3xl lg:text-5xl font-bold mb-2 lg:mb-3">
          {user?.name}
        </h2>
        <p className="text-lg lg:text-3xl mb-5">{user?.email}</p>

        <dl>
          <div className="flex space-x-0.5">
            <dt className="lg:text-2xl font-bold">Company:</dt>
            <dd className="lg:text-xl ml-1 lg:ml-2 font-normal">
              {user?.companyName}
            </dd>
          </div>

          <div className="flex space-x-0.5">
            <dt className="lg:text-2xl font-bold">Website:</dt>
            <dd className="lg:text-xl ml-1 lg:ml-2 font-normal">
              {user?.website}
            </dd>
          </div>

          <div className="flex space-x-0.5">
            <dt className="lg:text-2xl font-bold mb-5 md:mb-8">Address:</dt>
            <dd className="lg:text-xl ml-1 lg:ml-2 font-normal">
              {user?.street} {user?.suite} {user?.city} {user?.zipcode}
            </dd>
          </div>
        </dl>
      </section>

      {/* Posts */}
      <section className="px-2 sm:px-5">
        <h3 className="text-3xl font-bold mb-5">Posts</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-7 lg:mb-10">
          {posts.map(post => {
            return (
              <li key={post.id} className="h-full flex">
                <PostCard post={post} />
              </li>
            );
          })}
        </ul>
      </section>

      {/* Todos */}
      <section className="px-2 sm:px-5 mb-8">
        <h3 className="text-3xl font-bold mb-5">Todos</h3>
        <ul className="flex flex-col space-y-2">
          {todos.map(todo => {
            return (
              <li
                key={todo.id}
                className={`px-5 py-4 bg-white border rounded-xl shadow-xs cursor-default  ${
                  todo.completed
                    ? "border-emerald-500 bg-emerald-50/15 line-through decoration-emerald-300"
                    : "font-medium text-gray-700 border-[hsl(200,20%,88%)] hover:border-[hsl(200,20%,80%)] hover:shadow-md"
                }`}
              >
                {todo.title}
              </li>
            );
          })}
        </ul>
      </section>

      <div className="px-2 sm:px-5">
        <Link
          href={"/users"}
          className="bg-white border px-2 py-3 rounded-lg hover:bg-white/10"
        >
          Back to Users
        </Link>
      </div>
    </div>
  );
}

export default UserInfo;
