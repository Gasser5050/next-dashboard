"use server";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = {
  error?: string;
  fields?: {
    title: string;
    author: string;
    body: string;
  };
};

export async function createPost(prevState: FormState, formData: FormData) {
  const title = (formData.get("title") as string) || "";
  const author = (formData.get("author") as string) || "";
  const body = (formData.get("body") as string) || "";

  const validation = postSchema.safeParse({ title, author, body });
  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
      fields: {
        title,
        author,
        body
      }
    };
  }

  await prisma.post.create({
    data: {
      title,
      userId: Number(author),
      body
    }
  });

  revalidatePath("/posts");
  revalidatePath(`/users/${author}`);
  redirect("/posts");
}

export async function editPost(prevState: FormState, formData: FormData) {
  const title = (formData.get("title") as string) || "";
  const author = (formData.get("author") as string) || "";
  const body = (formData.get("body") as string) || "";
  const postId = formData.get("postId");

  const validation = postSchema.safeParse({ title, author, body });
  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
      fields: {
        title,
        author,
        body
      }
    };
  }

  await prisma.post.update({
    where: {
      id: Number(postId)
    },
    data: {
      title,
      userId: Number(author),
      body
    }
  });

  revalidatePath("/posts");
  revalidatePath(`/users/${author}`);
  redirect("/posts");
}
