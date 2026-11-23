"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
  }

  revalidatePath("/");
  redirect("/");
}

export async function updatePost(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
  } catch (error) {
    console.error("Error updating post:", error);
  }

  revalidatePath("/");
  revalidatePath(`/posts/${id}`);
  redirect("/");
}

export async function deletePost(id: number) {
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting post:", error);
  }

  revalidatePath("/");
  redirect("/");
}
