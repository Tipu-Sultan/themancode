// app/api/admin/dashboard/route.js
import dbConnect from "@/lib/dbconnect";
import Blog from "@/models/Blog";
import Snippet from "@/models/Snippet"; // Assuming you have a Snippet model
import Project from "@/models/Project"; // Assuming you have a Project model
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();

    // Fetch counts
    const blogCount = await Blog.countDocuments();
    const snippetCount = await Snippet.countDocuments();
    const projectCount = await Project.countDocuments();

    // Simple total views (assuming each model has a `views` field)
    const blogViews = await Blog.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]);
    const snippetViews = await Snippet.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]);
    const projectViews = await Project.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]);
    const totalViews = (
      (blogViews[0]?.total || 0) + 
      (snippetViews[0]?.total || 0) + 
      (projectViews[0]?.total || 0)
    ).toLocaleString();

    // Trends (e.g., count of new items this week)
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const blogTrend = `+${await Blog.countDocuments({ createdAt: { $gte: oneWeekAgo } })} this week`;
    const snippetTrend = `+${await Snippet.countDocuments({ createdAt: { $gte: oneWeekAgo } })} this week`;
    const projectTrend = `+${await Project.countDocuments({ createdAt: { $gte: oneWeekAgo } })} this week`;
    const viewsTrend = `+${(
      (await Blog.aggregate([{ $match: { createdAt: { $gte: oneWeekAgo } } }, { $group: { _id: null, total: { $sum: "$views" } } }]))[0]?.total || 0 +
      (await Snippet.aggregate([{ $match: { createdAt: { $gte: oneWeekAgo } } }, { $group: { _id: null, total: { $sum: "$views" } } }]))[0]?.total || 0 +
      (await Project.aggregate([{ $match: { createdAt: { $gte: oneWeekAgo } } }, { $group: { _id: null, total: { $sum: "$views" } } }]))[0]?.total || 0
    ).toLocaleString()} this week`;

    // Recent activities (assuming each model has a `title` and `createdAt` field)
    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5).select('title createdAt');
    const recentSnippets = await Snippet.find().sort({ createdAt: -1 }).limit(5).select('category createdAt');
    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5).select('title createdAt');

    const recentActivities = [
      ...recentBlogs.map(blog => ({
        action: `New blog "${blog.title}" published`,
        time: formatTimeAgo(blog.createdAt),
      })),
      ...recentSnippets.map(snippet => ({
        action: `New snippet "${snippet.category}" added`,
        time: formatTimeAgo(snippet.createdAt),
      })),
      ...recentProjects.map(project => ({
        action: `New project "${project.title}" created`,
        time: formatTimeAgo(project.createdAt),
      })),
    ]
      .sort((a, b) => new Date(b.time) - new Date(a.time)) // Sort by time descending
      .slice(0, 5); // Limit to 5 most recent

    return NextResponse.json({
      blogCount,
      snippetCount,
      projectCount,
      totalViews,
      blogTrend,
      snippetTrend,
      projectTrend,
      viewsTrend,
      recentActivities,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to format time ago
function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
}