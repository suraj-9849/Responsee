"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const simple_git_1 = __importDefault(require("simple-git")); // used to write the git commands in the node js
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const file_1 = require("./file");
const gptAPI_1 = require("./gptAPI");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // This is used to get the req.body other wise it will be undefined.
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Vite.js Server!' });
});
app.post('/api/deploy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoURL = req.body.repoURL; // This is where u keep the github url ->github/suraj/react-boilerplate
    console.log("Recieved: ", repoURL);
    const id = (0, utils_1.generate)();
    yield (0, simple_git_1.default)().clone(repoURL, path_1.default.join(__dirname, `output/${id}`));
    const files = (0, file_1.getAllFiles)(path_1.default.join(__dirname, `output/${id}`));
    //    console.log(files);
    const formattedFiles = files.map(file => file.replace(/\\/g, '/'));
    //    console.log(formattedFiles);
    const outputFilePath = path_1.default.join(__dirname, 'Styles.txt');
    // Clears the file before writing new data
    fs_1.default.writeFileSync(outputFilePath, '', 'utf8');
    formattedFiles.forEach((every) => {
        const ext = path_1.default.extname(every).toLowerCase();
        console.log(ext);
        if (ext === '.css' || ext === '.sass' || ext === '.scss') {
            // console.log(every);
            fs_1.default.readFile(every, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                try {
                    fs_1.default.appendFileSync(outputFilePath, `/* Content of ${every} */\n${data}\n\n`, 'utf8');
                }
                catch (err) {
                    console.error(`Error writing to output file:`, err);
                }
            });
        }
    });
    const filePath = path_1.default.join(__dirname, 'Styles.txt');
    (0, gptAPI_1.modifyFileContent)(filePath);
    //    AWS CODe to push to the S3 But we are using the cloudflare R2
    //    formattedFiles.forEach(async file=>{
    //    await uploadFile(file.slice(__dirname.length+1),file) // Where the dirName is like 'C:\\Users\\Suraj\\Documents\\Web Dev\\NEW\\Building-Vercel\\dist
    //    })
    //    we will return the id to the frontend:
    res.json({
        id: id
    });
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000'); // Start the server
});
