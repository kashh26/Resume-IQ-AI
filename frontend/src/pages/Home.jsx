import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <nav className="navbar">
        <div className="logo">
          🎯 ResumeIQ AI
        </div>

        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">
            <button className="signup-btn">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      <section className="hero">

        <h1>
          Land More Interviews
          <br />
          With AI-Powered Resume Analysis
        </h1>

        <p>
          Upload your resume, compare it with
          job descriptions, improve ATS score,
          and prepare for interviews.
        </p>

        <div className="hero-buttons">

          <Link to="/dashboard">
            <button className="primary-btn">
              Analyze Resume
            </button>
          </Link>

          <button className="secondary-btn">
            Watch Demo
          </button>

        </div>

      </section>

      <section className="features">

        <div className="feature-card">
          <h3>📊 ATS Score</h3>
          <p>
            Instantly check how well your resume
            matches the job description.
          </p>
        </div>

        <div className="feature-card">
          <h3>🚀 Resume Improvement</h3>
          <p>
            Get AI-powered suggestions to
            strengthen your resume.
          </p>
        </div>

        <div className="feature-card">
          <h3>🎤 Interview Prep</h3>
          <p>
            Generate interview questions based
            on your skills and projects.
          </p>
        </div>

      </section>

      <section className="how-it-works">

        <h2>How It Works</h2>

        <div className="steps">

          <div className="step">
            <span>1</span>
            <h3>Upload Resume</h3>
          </div>

          <div className="step">
            <span>2</span>
            <h3>Add Job Description</h3>
          </div>

          <div className="step">
            <span>3</span>
            <h3>Get ATS Score</h3>
          </div>

          <div className="step">
            <span>4</span>
            <h3>Improve Resume</h3>
          </div>

        </div>

      </section>

      <footer>
        ResumeIQ AI © 2026
      </footer>

    </div>
  );
}

export default Home;