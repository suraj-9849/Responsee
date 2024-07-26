import 'dotenv/config'
import {S3} from 'aws-sdk'  // It is the bucket provided by the AWS where we can store our output folder 
import fs from 'fs'

// we are not using the AWS - S3 so we used the easy way which is CloudFlare - R2 
// which also gives the same functionality

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID, // Ensure the environment variable names match
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: process.env.ENDPOINT,
})

// filename :  output/12ge5/src/App.jsx
//LocalFilePath:User/Suraj/Vercel/output/12ge5/src/App.jsx

// so we want to store the data in the form of the fileName like structure in the CloudFlare rather than the localFilePath

export const uploadFile =async(filename:string,localFilePath:string)=>{
    console.log("called");
    const fileContent = fs.readFileSync(localFilePath)
    const response = await s3.upload({
        Body:fileContent,
        Bucket:"vercel",
        Key:filename,
    }).promise();

    return response;
}