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
exports.modifyFileContent = void 0;
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const groq_sdk_1 = __importDefault(require("groq-sdk"));
dotenv_1.default.config();
const groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY });
function modifyFileContent(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const content = fs_1.default.readFileSync(filePath, 'utf-8');
            const response = yield groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: `please make the given CSS of the Pages responsive so that I can use directly into the code: \n\n${content}`
                    }
                ],
                model: "llama3-8b-8192",
            });
            const modifiedContent = ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "";
            fs_1.default.writeFileSync(filePath, modifiedContent, 'utf-8');
            console.log('File content modified successfully.');
        }
        catch (err) {
            console.error('Error modifying file content:', err);
        }
    });
}
exports.modifyFileContent = modifyFileContent;
