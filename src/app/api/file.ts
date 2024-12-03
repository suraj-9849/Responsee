import fs from 'fs';
import path from 'path';
export function getAllFiles(folderName: string) {
  let response: string[] = [];
  const allFilesAndFolders = fs.readdirSync(folderName);
  // gives the specific file or folder so do loop on it and push it to the empty array:
  allFilesAndFolders.forEach((file) => {
    const fullFilePath = path.join(folderName, file);
    if (fs.statSync(fullFilePath).isDirectory()) {
      response = response.concat(getAllFiles(fullFilePath));
      // we dont use the push because we dont want the array to push into the array!
    } else {
      response.push(fullFilePath);
    }
  });
  return response;
}
