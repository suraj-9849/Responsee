import { generate } from '../utils'; //It Generates New A random ID
import simpleGit from 'simple-git'; // used to write the git commands in the NODEJS
import path from 'path';
import { getAllFiles } from '../file';
import { uploadFile } from '../aws';
import { modifyFileContent } from '../gptAPI';
import { NextRequest, NextResponse } from 'next/server';
import fsPromises from 'fs/promises'; // For the FileSystem!

export async function POST(req: NextRequest) {
  let repoURL: string;
  try {
    const body = await req.json(); // This is where u keep the github url ->github/suraj/foodForward
    repoURL = body.repoURL;
    if (!repoURL) {
      return NextResponse.json(
        { error: 'Repository URL is required' },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Invalid JSON body: ${errorMessage}` },
      { status: 400 }
    );
  }

  // console.log('Received Repository URL: ', repoURL);
  const id = generate();

  // using os.tmpdir() for more reliable temporary directory creation
  const tempDir = path.join(__dirname, `repositories/${id}`);
  console.log(tempDir);
  try {
    // Ensure the parent directories exist
    await fsPromises.mkdir(tempDir, {
      recursive: true,
    });

    await simpleGit().clone(repoURL, tempDir);
    // console.log('cloned successfully:', tempDir);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error cloning repository:', errorMessage);
    return NextResponse.json(
      {
        error: `Failed to clone repository: ${errorMessage}`,
      },
      { status: 500 }
    );
  }

  const files = getAllFiles(tempDir);
  const styleFiles = files.filter((file) =>
    ['.css', '.sass', '.scss'].includes(path.extname(file).toLowerCase())
  );

  //Shows all the files who contains the above extensions
  // console.log(styleFiles);

  let allModifiedContent: string = '';
  const uploadPromises = [];

  try {
    for (const file of styleFiles) {
      const fileContent = await fsPromises.readFile(file, 'utf8');
      // console.log('Processing file:', file);

      const r2Key = `repositories/${id}/${path.basename(file)}`;
      // AWS CODe to push to the S3 But we are using the cloudflare R2
      const uploadPromise = uploadFile(r2Key, fileContent);
      uploadPromises.push(uploadPromise);

      const modifiedContent = await modifyFileContent(fileContent);
      console.log('Modified content for', file);
      allModifiedContent += `/* Content of ${path.basename(file)} */\n${modifiedContent}\n\n`;
    }

    await Promise.all(uploadPromises);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error processing files:', errorMessage);
    return NextResponse.json(
      {
        error: `Failed to upload: ${errorMessage}`,
      },
      { status: 500 }
    );
  }

  // we will return the id, The Processed Files and Modified Content to the frontend
  return NextResponse.json({
    id,
    modifiedContent: allModifiedContent,
    processedFiles: styleFiles.map((file) => path.basename(file)),
  });
}
