import express from 'express';
import cors from "cors";
import {generate} from './utils'
import simpleGit from "simple-git" // used to write the git commands in the node js
import path from 'path'
import fs from 'fs';
import { getAllFiles } from './file';
import { uploadFile } from './aws';
import {modifyFileContent} from './gptAPI';
const app = express();
app.use(cors());
app.use(express.json()) // This is used to get the req.body other wise it will be undefined.
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Vite.js Server!' });
});

app.post('/api/deploy',async(req,res)=>{
    const repoURL = req.body.repoURL; // This is where u keep the github url ->github/suraj/foodForward
    console.log("Recieved: ",repoURL);
    const id = generate();
   await simpleGit().clone(repoURL,path.join(__dirname,`output/${id}`));

   const files = getAllFiles(path.join(__dirname,`output/${id}`));
//    console.log(files);

   const formattedFiles = files.map(file => file.replace(/\\/g, '/'));
//    console.log(formattedFiles);

const outputFilePath: string = path.join(__dirname, 'Styles.txt');

// Clears the file before writing new data
fs.writeFileSync(outputFilePath, '', 'utf8');

formattedFiles.forEach((every: string) => {
  const ext: string = path.extname(every).toLowerCase();
  console.log(ext);
  if (ext === '.css' || ext === '.sass' || ext === '.scss') {
    // console.log(every);
    fs.readFile(every, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error(err);
        return;
      }
      try {
        fs.appendFileSync(outputFilePath, `/* Content of ${every} */\n${data}\n\n`, 'utf8');
      } catch (err) {
        console.error(`Error writing to output file:`, err);
      }
    });
  }
});

const filePath: string = path.join(__dirname, 'Styles.txt');
modifyFileContent(filePath);
//    AWS CODe to push to the S3 But we are using the cloudflare R2
//    formattedFiles.forEach(async file=>{
//    await uploadFile(file.slice(__dirname.length+1),file) // Where the dirName is like 'C:\\Users\\Suraj\\Documents\\Web Dev\\NEW\\Building-Vercel\\dist
//    })
   
//    we will return the id to the frontend:
    res.json({
        id:id
    });
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');  // Start the server
})