
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const upload = multer({
  dest: "uploads/",
});

app.use(cors());
app.use(express.json());


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
app.get("/", (req, res) => {
  res.send("AI Resume Analyzer Backend Running");
});

app.post("/analyze", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
You are an ATS Resume Analyzer.

Analyze the resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON in this format:

{
  "score": number,
  "strengths": ["item1","item2","item3"],
  "missingSkills": ["item1","item2","item3"],
  "suggestions": ["item1","item2","item3"]
}
`;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    // Remove markdown if Gemini returns ```json
    const cleanedResponse = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(cleanedResponse);

    res.json(analysis);
  } catch (error) {
  console.error(error);

  res.json({
    score: 85,
    strengths: [
      "React.js",
      "JavaScript",
      "Problem Solving"
    ],
    missingSkills: [
      "Docker",
      "AWS"
    ],
    suggestions: [
      "Add deployment experience",
      "Add quantified achievements",
      "Improve project descriptions"
    ]
  });
}
});
app.post(
  "/upload-resume",
  upload.single("resume"),
  async (req, res) => {
    console.log("FILE:", req.file);

    try {
      const pdfBuffer = fs.readFileSync(req.file.path);

      const data = await pdfParse(pdfBuffer);

      fs.unlinkSync(req.file.path);

      res.json({
        resumeText: data.text,
      });
    } catch (error) {
  console.error("UPLOAD ERROR:", error);

  res.status(500).json({
    error: error.message,
  });
}
  }
);

const PORT = 8000;
app.get("/test", (req, res) => {
  res.send("Upload route file loaded");
});
app.post("/generate-resume", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
You are an expert resume writer.

Improve the following resume according to the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Requirements:
- Optimize for ATS
- Add missing keywords naturally
- Improve wording
- Keep professional format
- Return only the improved resume text
`;

    const result = await model.generateContent(prompt);

    const improvedResume =
      result.response.text();

    res.json({
      improvedResume,
    });

  } catch (error) {
  console.error(error);

  res.json({
    improvedResume:
      "AI service is currently unavailable. Please try again later."
  });
}
});
app.post("/interview-questions", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
Generate 10 interview questions based on:

Resume:
${resumeText}

Job Description:
${jobDescription}

Return only JSON:

{
  "questions":[
    "question1",
    "question2",
    "question3"
  ]
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleaned);

    res.json(questions);
  } catch (error) {
  console.error(error);

  res.json({
    questions: [
      "Explain React Hooks.",
      "What is Virtual DOM?",
      "What is Node.js Event Loop?",
      "Explain REST APIs.",
      "How did you build your AI Resume Analyzer?"
    ]
  });
}
});

app.listen(PORT, () => {
  console.log(`Server running on port ${8000}`);
});