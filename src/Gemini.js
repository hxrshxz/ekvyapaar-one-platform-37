import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDNHmmsmvod1_WQfIAjh5Tq7lu4NyLfo7Q",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();
