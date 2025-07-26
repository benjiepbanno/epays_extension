import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { path: directoryPath, expectedFiles } = await request.json();

    if (!directoryPath || !expectedFiles || !Array.isArray(expectedFiles)) {
      return NextResponse.json(
        { error: 'Invalid parameters. Path and expectedFiles array are required.' },
        { status: 400 }
      );
    }

    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
      return NextResponse.json(
        { error: 'Directory does not exist' },
        { status: 404 }
      );
    }

    // Check if it's actually a directory
    const stats = fs.statSync(directoryPath);
    if (!stats.isDirectory()) {
      return NextResponse.json(
        { error: 'Path is not a directory' },
        { status: 400 }
      );
    }

    // Check which expected files exist
    const existingFiles: string[] = [];
    const missingFiles: string[] = [];

    for (const fileName of expectedFiles) {
      const filePath = path.join(directoryPath, fileName);
      
      try {
        if (fs.existsSync(filePath)) {
          const fileStats = fs.statSync(filePath);
          if (fileStats.isFile()) {
            existingFiles.push(fileName);
          } else {
            missingFiles.push(fileName);
          }
        } else {
          missingFiles.push(fileName);
        }
      } catch (error) {
        console.error(`Error checking file ${fileName}:`, error);
        missingFiles.push(fileName);
      }
    }

    return NextResponse.json({
      existingFiles,
      missingFiles,
      totalExpected: expectedFiles.length,
      totalExisting: existingFiles.length,
      directoryPath
    });

  } catch (error) {
    console.error('Error checking files in directory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}