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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your UserName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
