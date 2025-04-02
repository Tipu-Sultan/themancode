// app/api/admin/blogs/[id]/route.js
import dbConnect from "@/lib/dbconnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const data = await request.json();

    const { title, slug, category, excerpt, content, image, tags, readTime } = data;
    if (!title || !slug || !category || !excerpt || !content || !image || !readTime) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, slug, category, excerpt, content, image, tags, readTime },
      { new: true, runValidators: true }
    );
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog updated successfully', data: blog }, { status: 200 });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}