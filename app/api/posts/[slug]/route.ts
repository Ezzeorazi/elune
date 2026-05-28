import { NextRequest, NextResponse } from "next/server";
import { getPosts, savePosts } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { Post } from "@/lib/types";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPosts().find((p) => p.slug === slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = (await request.json()) as Post;
  const posts = getPosts().map((p) => (p.slug === slug ? body : p));
  savePosts(posts);
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
  savePosts(getPosts().filter((p) => p.slug !== slug));
  revalidatePath("/");
  revalidatePath("/blog");
  return NextResponse.json({ ok: true });
}
