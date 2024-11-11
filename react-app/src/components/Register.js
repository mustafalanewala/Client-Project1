import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/register", { username, email, password });
      history.push("/login");
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  const styles = {
    container: {
      width: "100%",
      maxWidth: "400px",
      padding: "20px",
      margin: "10rem auto",
      backgroundColor: "#eee",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      textAlign: "center",
    },
    heading: {
      marginBottom: "20px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    error: {
      color: "red",
      fontSize: "14px",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
    welcomeMessage: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.welcomeMessage}>
        Welcome to the Employee Management System!
      </div>
      <h2 style={styles.heading}>Sign Up</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      <p>
        Already have an account? <Link to="/login" style={styles.link}>Log in</Link>
      </p>
    </div>
  );
};

export default Register;
