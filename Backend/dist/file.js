"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getAllFiles(folderName) {
    // localhost:3000/hkirat/Building-Vercel/dist/output
    let response = [];
    const allFilesAndFolders = fs_1.default.readdirSync(folderName);
    // gives the specific file or folder so do loop on it and push it to the empty array:
    allFilesAndFolders.forEach((file) => {
        const fullFilePath = path_1.default.join(folderName, file);
        if (fs_1.default.statSync(fullFilePath).isDirectory()) {
            // localhost:3000/hkirat/Building-Vercel/dist/output/src/assets etc.. means this is the folder/Directory so we use the recursion here to find only the file
            response = response.concat(getAllFiles(fullFilePath));
            // we dont use the push because we dont want the array to push into the array!
        }
        else {
            // localhost:3000/hkirat/Building-Vercel/dist/output/app.jsx
            response.push(fullFilePath);
        }
    });
    return response;
}
exports.getAllFiles = getAllFiles;
