import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/dictionary", async (req, res) => {
    const { word } = req.body;

    if (!word) {
      return res.status(400).json({ error: "Word is required" });
    }

    try {
      // Check environment first, then fallback to custom header
      let apiKey = process.env.GEMINI_API_KEY;
      const headerKey = req.headers["x-api-key"];
      
      if (headerKey && typeof headerKey === "string") {
        apiKey = headerKey;
      }

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(401).json({ 
          error: "API_KEY_MISSING",
          message: "GEMINI_API_KEY is not configured." 
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-3-flash-preview";

      const prompt = `Act as a professional dictionary. Provide a detailed definition for the word: "${word}".`;

      const response = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              part_of_speech: { type: Type.STRING },
              phonetic: { type: Type.STRING },
              definitions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    meaning: { type: Type.STRING },
                    example: { type: Type.STRING }
                  },
                  required: ["meaning", "example"]
                }
              },
              synonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
              antonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
              difficulty_level: { type: Type.STRING }
            },
            required: ["word", "part_of_speech", "phonetic", "definitions", "synonyms", "antonyms", "difficulty_level"]
          }
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from AI");
      }

      const dictionaryData = JSON.parse(responseText);
      res.json(dictionaryData);
    } catch (error: any) {
      console.error("Dictionary API Error:", error);
      res.status(500).json({ error: error.message || "Failed to fetch definition" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
