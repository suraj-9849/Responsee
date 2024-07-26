
import fs from "fs";
import path from 'path';
export function getAllFiles(folderName:string){
    // localhost:3000/Responsee/Backend/dist/output
    let response : string[] = []
    const allFilesAndFolders = fs.readdirSync(folderName);
    // gives the specific file or folder so do loop on it and push it to the empty array:
    allFilesAndFolders.forEach((file)=>{
        const fullFilePath = path.join(folderName,file);
        if(fs.statSync(fullFilePath).isDirectory()){
            // localhost:3000/Responsee/Backend/dist/output/src/assets etc.. means this is the folder/Directory so we use the recursion here to find only the file
            response = response.concat(getAllFiles(fullFilePath));
            // we dont use the push because we dont want the array to push into the array!
        }
        else{
            // localhost:3000/Responsee/Backend/dist/output/app.jsx
            response.push(fullFilePath);
        }
    })
    return response
}