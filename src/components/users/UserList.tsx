import type { UserModel } from "@/generated/prisma/models";
import UserCard from "@/components/users/UserCard";

function UserList({ users }: { users: UserModel[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-2 sm:px-5">
      {users.map(user => {
        return (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        );
      })}
    </ul>
  );
}

export default UserList;
