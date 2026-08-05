import UserCard from "../../components/Users/UserCard";
import { getUsers } from "../../lib/getData";
import type { User } from "../../types/Types";

async function Users() {
  const users: User[] = await getUsers();

  return (
    <div className="px-8 md:px-12 xl:px-15 py-10">
      <h1 className="font-bold text-4xl lg:text-5xl mb-10 text-[hsl(200,100%,10%)] tracking-tight">
        Users
      </h1>

      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user: User) => {
          return (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Users;
