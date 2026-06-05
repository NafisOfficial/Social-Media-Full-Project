import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import Story from "@/models/Story";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, context: { params: Promise<{id: string; cid: string}> }) {
  try {
    await connectDB();
    const params = await context.params;

    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const comment = await Comment.findById(params.cid);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.author.toString() !== authResult.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await comment.deleteOne();
    await Story.findByIdAndUpdate(params.id, { $inc: { commentsCount: -1 } });

    return NextResponse.json({ data: { id: params.cid } }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unable to delete comment" },
      { status: 500 },
    );
  }
}