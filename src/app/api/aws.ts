import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; // It is the bucket provided by the AWS where we can store our output folder
import { fromEnv } from '@aws-sdk/credential-providers';

// we are not using the AWS - S3 so we used the easy way which is CloudFlare - R2
// which also gives the same functionality

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.ENDPOINT, // Ensure the environment variable names match
  credentials: fromEnv(),
});

// filename :  output/12ge5/src/App.jsx
//LocalFilePath:User/Suraj/Vercel/output/12ge5/src/App.jsx

// so we want to store the data in the form of the fileName like structure in the CloudFlare rather than the localFilePath

export const uploadFile = async (
  filename: string,
  fileContent: string | Buffer
) => {
  console.log('Uploading file:', filename);

  const command = new PutObjectCommand({
    Body: fileContent,
    Bucket: 'responsee',
    Key: filename,
  });

  try {
    const response = await s3.send(command);
    console.log('File uploaded successfully:', filename);
    return response;
  } catch (error) {
    console.error('Error uploading file:', filename, error);
    throw error;
  }
};
