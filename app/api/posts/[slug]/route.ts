import { NextRequest, NextResponse } from "next/server";
import { getPosts, getPost, updatePost, deletePost } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { Post } from "@/lib/types";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = (await request.json()) as Post;
  await updatePost(slug, body);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  await deletePost(slug);
  revalidatePath("/");
  revalidatePath("/blog");
  return NextResponse.json({ ok: true });
}
