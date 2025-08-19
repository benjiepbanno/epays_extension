import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PAYROLL_PATHS_DIR = 'D:\\payrollpaths';
const PAYROLL_PATHS_FILE = path.join(PAYROLL_PATHS_DIR, 'path.txt');

async function ensureDirectoryExists(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
  }
}

export async function GET() {
  try {
    await ensureDirectoryExists(PAYROLL_PATHS_DIR);
    
    try {
      const content = await fs.readFile(PAYROLL_PATHS_FILE, 'utf-8');
      const paths = content.split('\n').filter(path => path.trim() !== '');
      return NextResponse.json({ paths });
    } catch (readError) {
      // File doesn't exist yet, return empty array
      return NextResponse.json({ paths: [] });
    }
  } catch (error) {
    console.error('Error reading saved paths:', error);
    return NextResponse.json({ error: 'Failed to read paths' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { path: newPath } = await request.json();
    
    if (!newPath) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    await ensureDirectoryExists(PAYROLL_PATHS_DIR);
    
    // Read existing paths
    let existingPaths: string[] = [];
    try {
      const content = await fs.readFile(PAYROLL_PATHS_FILE, 'utf-8');
      existingPaths = content.split('\n').filter(path => path.trim() !== '');
    } catch (readError) {
      // File doesn't exist yet, start with empty array
    }
    
    // Check if path already exists (case-insensitive)
    const pathExists = existingPaths.some(
      path => path.toLowerCase() === newPath.toLowerCase()
    );
    
    if (!pathExists) {
      const updatedPaths = [...existingPaths, newPath];
      await fs.writeFile(PAYROLL_PATHS_FILE, updatedPaths.join('\n'), 'utf-8');
      return NextResponse.json({ paths: updatedPaths, added: true });
    } else {
      return NextResponse.json({ paths: existingPaths, added: false });
    }
  } catch (error) {
    console.error('Error saving path:', error);
    return NextResponse.json({ error: 'Failed to save path' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { path: pathToDelete } = await request.json();
    
    if (!pathToDelete) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    await ensureDirectoryExists(PAYROLL_PATHS_DIR);
    
    // Read existing paths
    let existingPaths: string[] = [];
    try {
      const content = await fs.readFile(PAYROLL_PATHS_FILE, 'utf-8');
      existingPaths = content.split('\n').filter(path => path.trim() !== '');
    } catch (readError) {
      // File doesn't exist yet, return empty array
      return NextResponse.json({ paths: [] });
    }
    
    // Remove the specified path (case-insensitive)
    const updatedPaths = existingPaths.filter(
      path => path.toLowerCase() !== pathToDelete.toLowerCase()
    );
    
    // Write updated paths back to file
    await fs.writeFile(PAYROLL_PATHS_FILE, updatedPaths.join('\n'), 'utf-8');
    
    return NextResponse.json({ paths: updatedPaths, deleted: true });
  } catch (error) {
    console.error('Error deleting path:', error);
    return NextResponse.json({ error: 'Failed to delete path' }, { status: 500 });
  }
}