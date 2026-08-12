// import { Metadata } from "next";
import { cache, Suspense } from "react";
import { prisma } from "@/lib/prisma";
import UserInfo from "@/components/users/UserInfo";
import UserInfoSkeleton from "@/components/users/UserInfoSkeleton";

type UserType = {
  params: {
    id: string;
  };
};

export const getUser = cache((id: string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) return null;

  return prisma.user.findUnique({
    where: {
      id: numericId
    }
  });
});

export async function generateMetadata({ params }: UserType) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return { title: "User Not Found" };
  }

  return {
    title: `${user.name}'s Profile`,
    description: `View profile details and posts by ${user.name}.`,
    openGraph: {
      title: `${user.name}'s Profile`,
      description: `View profile details and posts by ${user.name}.`,
      type: "profile"
    }
  };
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();

  return users.map(user => {
    return {
      id: user.id.toString()
    };
  });
}

async function User({ params }: UserType) {
  const { id } = await params;

  return (
    <Suspense fallback={<UserInfoSkeleton />}>
      <UserInfo id={id} />
    </Suspense>
  );
}

export default User;
