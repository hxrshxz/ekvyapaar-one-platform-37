import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBOxnT8mLe5pxbkj_XbOkrSrxKU3MZfyKg",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();
