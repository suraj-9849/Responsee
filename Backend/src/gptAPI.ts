import fs from 'fs';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY as string });

export async function modifyFileContent(filePath: string) {
    try {
        const content: string = fs.readFileSync(filePath, 'utf-8');

        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `please make the given CSS of the Pages responsive so that I can use directly into the code: \n\n${content}`
                }
            ],
            model: "llama3-8b-8192",
        });

        const modifiedContent: string = response.choices[0]?.message?.content || "";
        fs.writeFileSync(filePath, modifiedContent, 'utf-8');
        console.log('File content modified successfully.');
    } catch (err) {
        console.error('Error modifying file content:', err);
    }
}

