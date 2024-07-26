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
exports.uploadFile = void 0;
require("dotenv/config");
const aws_sdk_1 = require("aws-sdk"); // It is the bucket provided by the AWS where we can store our output folder 
const fs_1 = __importDefault(require("fs"));
// we are not using the AWS - S3 so we used the easy way which is CloudFlare - R2 
// which also gives the same functionality
const s3 = new aws_sdk_1.S3({
    accessKeyId: process.env.ACCESS_KEY_ID, // Ensure the environment variable names match
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: process.env.ENDPOINT,
});
// filename :  output/12ge5/src/App.jsx
//LocalFilePath:User/Suraj/Vercel/output/12ge5/src/App.jsx
// so we want to store the data in the form of the fileName like structure in the CloudFlare rather than the localFilePath
const uploadFile = (filename, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("called");
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const response = yield s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: filename,
    }).promise();
    return response;
});
exports.uploadFile = uploadFile;
