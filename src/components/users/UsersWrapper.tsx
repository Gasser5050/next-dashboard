import { prisma } from "@/lib/prisma";
import UserList from "@/components/users/UserList";

async function UserWrapper() {
  const users = await prisma.user.findMany();

  return <UserList users={users} />;
}

export default UserWrapper;
