import { NextRequest, NextResponse } from "next/server";
import { getPosts, insertPost } from "@/lib/data";
import { revalidatePath } from "next/cache";
import type { Post } from "@/lib/types";

export async function GET() {
  return NextResponse.json(await getPosts());
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Post;
  await insertPost(body);
  revalidatePath("/");
  revalidatePath("/blog");
  return NextResponse.json({ ok: true });
}
