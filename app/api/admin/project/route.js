import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import Project from '@/models/Project';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().lean();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { title, description, image, tags, category, github, url } = await request.json();

    // Validation
    if (!title || !description || !image || !tags || !tags.length || !category || !github || !url) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const project = new Project({
      title,
      description,
      image,
      tags,
      category,
      github,
      url,
    });

    await project.save();
    return NextResponse.json({ message: 'Project created successfully', data: project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error.message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}