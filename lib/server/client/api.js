import dbConnect from "@/lib/dbconnect";
import Project from "@/models/Project";
import Snippet from "@/models/Snippet";

export async function fetchAllProjects() {
  try {
    await dbConnect();
    const projects = await Project.find().lean();
    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    return [];
  }
}

// Fetch all snippets, grouped by category and section
export async function getAllSnippets() {
  try {
    await dbConnect();

    const snippetDocs = await Snippet.find().lean();

    const snippetsData = snippetDocs.reduce((acc, doc) => {
      const { category, section, snippets } = doc;

      if (!acc[category]) {
        acc[category] = {};
      }

      acc[category][section] = snippets.map((snippet) => ({
        id: snippet._id.toString(),
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        language: snippet.language,
      }));

      return acc;
    }, {});

    return snippetsData;
  } catch (error) {
    console.error("Error fetching all snippets:", error);
    throw new Error("Failed to fetch snippets");
  }
}

// Fetch snippets for a specific category, grouped by section
export async function getSnippetsByCategory(category) {
  try {
    await dbConnect();

    // Decode URL parameter: replace hyphens with spaces, preserve dots, and match DB casing
    const decodedCategory = category
      .replace(/-/g, " ") // Replace hyphens with spaces
      .split(" ") // Split by spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join back with spaces

    console.log(`Fetching snippets for category: ${decodedCategory}`); // Debug log

    // Case-insensitive query to handle potential mismatches
    const snippetDocs = await Snippet.find({
      category: { $regex: new RegExp(`^${decodedCategory}$`, "i") }, // Case-insensitive match
    }).lean();

    if (!snippetDocs.length) {
      console.log(`No snippets found for category: ${decodedCategory}`);
      return null;
    }

    const categoryData = snippetDocs.reduce((acc, doc) => {
      const { section, snippets } = doc;

      acc[section] = snippets.map((snippet) => ({
        id: snippet._id.toString(),
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        language: snippet.language,
      }));

      return acc;
    }, {});

    console.log(`Snippets found for ${decodedCategory}:`, categoryData); // Debug log
    return categoryData;
  } catch (error) {
    console.error(`Error fetching snippets for category ${category}:`, error);
    throw new Error(`Failed to fetch snippets for category ${category}`);
  }
}

// Fetch snippets for a specific category and section
export async function getSnippetsBySection(category, section) {
  try {
    await dbConnect();

    const decodedCategory = category
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    const decodedSection = section
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    console.log(`Fetching snippets for ${decodedCategory}/${decodedSection}`); // Debug log

    const doc = await Snippet.findOne({
      category: { $regex: new RegExp(`^${decodedCategory}$`, "i") },
      section: { $regex: new RegExp(`^${decodedSection}$`, "i") },
    }).lean();

    if (!doc || !doc.snippets.length) {
      console.log(`No snippets found for ${decodedCategory}/${decodedSection}`);
      return [];
    }

    const formattedSnippets = doc.snippets.map((snippet) => ({
      id: snippet._id.toString(),
      title: snippet.title,
      description: snippet.description,
      code: snippet.code,
      language: snippet.language,
    }));

    console.log(`Snippets found:`, formattedSnippets); // Debug log
    return formattedSnippets;
  } catch (error) {
    console.error(`Error fetching snippets for ${category}/${section}:`, error);
    throw new Error(`Failed to fetch snippets for ${category}/${section}`);
  }
}
