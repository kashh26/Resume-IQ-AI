import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [improvedResume, setImprovedResume] = useState("");

  const uploadResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(
        "https://resume-iq-ai.onrender.com/upload-resume",
        formData
      );

      setResumeText(response.data.resumeText);
      alert("Resume uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const analyzeResume = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://resume-iq-ai.onrender.com/analyze",
        {
          resumeText,
          jobDescription,
        }
      );

      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const generateResume = async () => {
    try {
      const response = await axios.post(
        "https://resume-iq-ai.onrender.com/generate-resume",
        {
          resumeText,
          jobDescription,
        }
      );

      setImprovedResume(
        response.data.improvedResume
      );
    } catch (error) {
      console.error(error);
    }
  };

  const generateQuestions = async () => {
    try {
      const response = await axios.post(
        "https://resume-iq-ai.onrender.com/interview-questions",
        {
          resumeText,
          jobDescription,
        }
      );

      setQuestions(response.data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadResume = () => {
    const doc = new jsPDF();

    doc.text(
      improvedResume ||
        "No improved resume generated",
      10,
      10
    );

    doc.save("Improved_Resume.pdf");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>ResumeIQ AI Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div className="profile-box">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <button
            className="secondary-btn"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");

              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>📄 Resume Upload</h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button className="primary-btn" onClick={uploadResume}>
            Upload Resume
          </button>

          <textarea
            placeholder="Resume Content"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        <div className="dashboard-card">
          <h2>🎯 Job Description</h2>

          <textarea
            placeholder="Paste Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <button className="primary-btn" onClick={analyzeResume}>
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      </div>

      {result && (
        <>
          <div className="results-grid">
            <div className="dashboard-card">
              <h2>ATS Score</h2>

              <div className="score-circle">{result.score}%</div>
            </div>

            <div className="dashboard-card">
              <h2>🚀 Improved Resume</h2>

              <button className="primary-btn" onClick={generateResume}>
                Generate Resume
              </button>

              <button className="secondary-btn" onClick={downloadResume}>
                Download PDF
              </button>
            </div>
          </div>

          <div className="dashboard-card">
            <h2>✅ Strengths</h2>

            <ol>
              {result.strengths?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="dashboard-card">
            <h2>❌ Missing Skills</h2>

            <ol>
              {result.missingSkills?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="dashboard-card">
            <h2>💡 Suggestions</h2>

            <ol>
              {result.suggestions?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="dashboard-card">
            <h2>🎤 Interview Questions</h2>

            <button className="primary-btn" onClick={generateQuestions}>
              Generate Questions
            </button>

            <ol>
              {questions.map((q, index) => (
                <li key={index}>{q}</li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;