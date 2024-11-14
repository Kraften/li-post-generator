import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

function extractBulletPointsAndHeaders(text) {
  // Regular expression to match headers (e.g., **Resilience:**)
  const headerRegex = /\*\*([^*]+)\:\*\*/g;

  // Regular expression to match bullet points (either ** or * followed by text)
  const bulletPointRegex = /(?:\*\*|[\*\-])\s+([^*]+)/g;

  const headers = [];
  const bulletPoints = [];

  let match;

  // Extract headers first
  while ((match = headerRegex.exec(text)) !== null) {
    headers.push(match[1].trim()); // Capture header content and trim extra spaces
  }

  // Extract bullet points
  let pointsMatch;
  while ((pointsMatch = bulletPointRegex.exec(text)) !== null) {
    bulletPoints.push(pointsMatch[1].trim()); // Capture bullet point text
  }

  // Combine headers with bullet points: associate the header with the subsequent bullet points
  const structuredPoints = [];
  let headerIndex = 0;

  bulletPoints.forEach((point, index) => {
    // If we've reached a new header, update the current header
    if (headers[headerIndex] && index === headerIndex) {
      structuredPoints.push({
        header: headers[headerIndex],
        bulletPoint: point,
      });
      headerIndex++;
    } else {
      // If no new header, continue with the last one
      structuredPoints.push({
        header: headers[headerIndex - 1], // Get the last header
        bulletPoint: point,
      });
    }
  });

  return structuredPoints;
}

const run = async (prompt) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
  if (prompt) {
    console.log(import.meta.env.VITE_GOOGLE_GEMINI_API_KEY)
    const result = await chatSession.sendMessage(prompt.toString());

    return result;
  }
};

export { run, extractBulletPointsAndHeaders };
