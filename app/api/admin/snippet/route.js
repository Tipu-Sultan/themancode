import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import Snippet from '@/models/Snippet';

export async function GET() {
  try {
    await dbConnect();
    const snippets = await Snippet.find().lean();
    return NextResponse.json(snippets, { status: 200 });
  } catch (error) {
    console.error('Error fetching snippets:', error.message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { category, section, snippets } = await request.json();

    // Validate input
    if (!category || !section || !snippets || !Array.isArray(snippets) || snippets.length === 0) {
      return NextResponse.json({ message: 'Category, section, and at least one snippet are required' }, { status: 400 });
    }

    for (const snippet of snippets) {
      if (!snippet.title || !snippet.description || !snippet.language || !snippet.code) {
        return NextResponse.json({ message: 'All snippet fields (title, description, language, code) are required' }, { status: 400 });
      }
    }

    // Check if a document with this category and section already exists
    let doc = await Snippet.findOne({ category, section });
    if (doc) {
      // Append new snippets to the existing document
      doc.snippets.push(...snippets);
      await doc.save();
    } else {
      // Create a new document with the snippets
      doc = new Snippet({
        category,
        section,
        snippets,
      });
      await doc.save();
    }

    return NextResponse.json({ message: 'Snippets created successfully', data: doc }, { status: 201 });
  } catch (error) {
    console.error('Error creating snippets:', error.message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}