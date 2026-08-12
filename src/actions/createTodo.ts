"use server";
import { prisma } from "@/lib/prisma";
import { todoSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = {
  error?: string;
  fields?: {
    title: string;
    author: string;
  };
};

export async function CreateTodo(prevState: FormState, formData: FormData) {
  const title = (formData.get("title") as string) || "";
  const author = (formData.get("author") as string) || "";

  const validation = todoSchema.safeParse({ title, author });
  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
      fields: { title, author }
    };
  }

  await prisma.todo.create({
    data: {
      title,
      userId: Number(author)
    }
  });

  revalidatePath("/todos");
  revalidatePath(`/users/${author}`);
  redirect("/todos");
}
