import dbConnect from "@/lib/dbconnect";
import Snippet from "@/models/Snippet";

export async function fetchAllSnippets() {
  try {
    await dbConnect();
    const snippets = await Snippet.find().lean();
    return snippets || [];
  } catch (error) {
    console.error('Error fetching snippets:', error.message);
    return []; // Return empty array on failure
  }
}

export async function fetchSnippetBySlug(category, section) {
  const data = await Snippet.findOne({ category, section }).lean();
  return data;
}

export async function updateSnippet(category, section, updatedSnippet) {
  const result = await Snippet.updateOne(
    { category, section, 'snippets._id': updatedSnippet.id },
    { $set: { 'snippets.$': updatedSnippet } }
  );
  return { ok: result.modifiedCount > 0 };
}