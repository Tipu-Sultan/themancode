import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Snippet from "@/models/Snippet";

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { category, section, snippets } = await request.json();

    if (
      !category ||
      !section ||
      !snippets ||
      !Array.isArray(snippets) ||
      snippets.length === 0
    ) {
      return NextResponse.json(
        { message: "Category, section, and at least one snippet are required" },
        { status: 400 }
      );
    }

    for (const snippet of snippets) {
      if (
        !snippet.title ||
        !snippet.description ||
        !snippet.language ||
        !snippet.code
      ) {
        return NextResponse.json(
          {
            message:
              "All snippet fields (title, description, language, code) are required",
          },
          { status: 400 }
        );
      }
    }

    const doc = await Snippet.findById(id);
    if (!doc) {
      return NextResponse.json(
        { message: "Snippet document not found" },
        { status: 404 }
      );
    }

    // Update the document
    doc.category = category;
    doc.section = section;
    doc.snippets = snippets; // Replace existing snippets with the new array
    await doc.save();

    return NextResponse.json(
      { message: "Snippets updated successfully", data: doc },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating snippets:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const doc = await Snippet.findById(id).lean();
    if (!doc) {
      return NextResponse.json(
        { message: "Snippet document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("Error fetching snippet:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const deletedDoc = await Snippet.findByIdAndDelete(id);

    if (!deletedDoc) {
      return NextResponse.json(
        { message: "Snippet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Snippet deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting snippet:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
