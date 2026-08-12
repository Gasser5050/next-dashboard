import { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import UserInfo from "@/components/users/UserInfo";
import UserInfoSkeleton from "@/components/users/UserInfoSkeleton";

export const metadata: Metadata = {
  title: "View User"
};

export async function generateStaticParams() {
  const users = await prisma.user.findMany();

  return users.map(user => {
    return {
      id: user.id.toString()
    };
  });
}

async function User({
  params
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<UserInfoSkeleton />}>
      <UserInfo id={id} />
    </Suspense>
  );
}

export default User;
