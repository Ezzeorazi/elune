import { NextRequest, NextResponse } from "next/server";
import { getPosts, savePosts } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { Post } from "@/lib/types";

export async function GET() {
  return NextResponse.json(getPosts());
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Post;
  const posts = getPosts();
  posts.unshift(body);
  savePosts(posts);
  revalidatePath("/");
  revalidatePath("/blog");
  return NextResponse.json({ ok: true });
}
