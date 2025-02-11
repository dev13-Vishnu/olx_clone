import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../../store/Context";
import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const { loginUser } = useContext(FirebaseContext);

  const validateForm = () => {
    let errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter a valid email";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent login if invalid

    try {
      await loginUser(email, password);
      console.log("User logged in successfully");
      history.push("/");
    } catch (error) {
      console.error("Login error:", error.message);
      setErrors({ login: error.message }); // Show Firebase login errors
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginParentDiv">
        <img width="100px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleLogin}>
          {/* Email */}
          <label>Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          {/* Password */}
          <label>Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          {/* Firebase login errors */}
          {errors.login && <p className="error loginError">{errors.login}</p>}

          <button type="submit">Login</button>
        </form>
        <p className="signupRedirect" onClick={() => history.push("/signup")}>
          Don't have an account? <span>Signup</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
