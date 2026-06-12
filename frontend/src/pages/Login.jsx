import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("No account found");
      return;
    }

    if (
      email === user.email &&
      password === user.password
    ) {

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      navigate("/dashboard");

    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Welcome Back </h1>

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
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;