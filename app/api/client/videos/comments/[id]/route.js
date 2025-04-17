import mongoose from 'mongoose';
import { Comment } from '@/models/videos';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const { userId } = await req.json();

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid comment ID' }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Find the comment
    const comment = await Comment.findById(id);
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Check if the user is the owner
    if (comment.userId.toString() !== userId) {
      return NextResponse.json({ error: 'Unauthorized: You can only delete your own comments' }, { status: 403 });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}