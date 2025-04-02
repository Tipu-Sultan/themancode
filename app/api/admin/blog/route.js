// app/api/admin/blogs/route.js
import dbConnect from "@/lib/dbconnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    const blogs = await Blog.find().lean();
    const formattedBlogs = blogs.map(blog => ({
      _id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      tags: blog.tags,
      readTime: blog.readTime,
      date: blog.date,
    }));
    return NextResponse.json(formattedBlogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    const { title, slug, category, excerpt, content, image, tags, readTime } = data;
    if (!title || !slug || !category || !excerpt || !content || !image || !readTime) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const blog = new Blog({ title, slug, category, excerpt, content, image, tags, readTime });
    await blog.save();

    return NextResponse.json({ message: 'Blog created successfully', data: blog }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}