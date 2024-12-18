import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (name) {
      onLogin({ name });
    }
  }

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2 className="welcomeUser">Welcome!</h2>
        <input
          className="loginBox"
          type="text"
          placeholder="Enter your UserName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>{" "}
    </div>
  );
}
