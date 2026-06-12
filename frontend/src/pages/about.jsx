import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">

      <nav className="navbar">
        <div className="logo">
          🎯 ResumeIQ AI
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className="about-container">

        <h1>About ResumeIQ AI</h1>

        <p>
          ResumeIQ AI is an AI-powered resume optimization platform
          designed to help job seekers improve their ATS score,
          identify missing skills, and prepare for interviews.
        </p>

        <div className="about-grid">

          <div className="about-card">
            <h2>📊 ATS Analysis</h2>
            <p>
              Analyze your resume against job descriptions and
              receive an ATS compatibility score.
            </p>
          </div>

          <div className="about-card">
            <h2>🚀 Resume Improvement</h2>
            <p>
              Generate AI-powered suggestions to improve your
              resume and increase interview chances.
            </p>
          </div>

          <div className="about-card">
            <h2>🎤 Interview Preparation</h2>
            <p>
              Get personalized interview questions based on
              your resume and target role.
            </p>
          </div>

          <div className="about-card">
            <h2>🤖 AI Technology</h2>
            <p>
              Built using React, Node.js, Express,
              Gemini AI, and PDF Parsing.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default About;