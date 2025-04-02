// lib/server/client/blogApi.js
import dbConnect from "@/lib/dbconnect";
import Blog from "@/models/Blog";

export async function getAllBlogs() {
  try {
    await dbConnect();
    const blogs = await Blog.find().lean();
    return blogs.map(blog => ({
      _id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      excerpt: blog.excerpt,
      image: blog.image,
      tags: blog.tags,
      readTime: blog.readTime,
      date: blog.date,
    }));
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

export async function getBlogsByCategory(category) {
  try {
    await dbConnect();
    const decodedCategory = category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    const blogs = await Blog.find({ category: decodedCategory }).lean();
    return blogs.map(blog => ({
      _id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      excerpt: blog.excerpt,
      image: blog.image,
      tags: blog.tags,
      readTime: blog.readTime,
      date: blog.date,
    }));
  } catch (error) {
    console.error(`Error fetching blogs for category ${category}:`, error);
    throw new Error(`Failed to fetch blogs for category ${category}`);
  }
}

export async function getBlogBySlug(slug) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return null;
    return {
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
    };
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    throw new Error(`Failed to fetch blog with slug ${slug}`);
  }
}