import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Account Created Successfully!");

    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1> Create Account </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={handleSignup}
        >
          Create Account
        </button>

      </div>
    </div>
  );
}

export default Signup;