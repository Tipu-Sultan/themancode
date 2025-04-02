import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import Project from '@/models/Project';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error.message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { title, description, image, tags, category, github, url } = await request.json();

    if (!title || !description || !image || !tags || !tags.length || !category || !github || !url) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, image, tags, category, github, url },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project updated successfully', data: updatedProject }, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error.message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error.message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}