import React from "react";
import "./homepage.css";

export default function Homepage(props) {
  return (
    <>
      <main>
        <div className="homepage">
          <button className="logoutButton" onClick={props.onLogout}>
            New User
          </button>
          <h3>{props.user.name}</h3>
          <h1 className="title">QUIZ APP</h1>
          <p className="homepageText">
            Want to test your IQ? Take a Quiz today
          </p>

          <button className="homepageButton" onClick={props.clickquiz}>
            Take Quiz
          </button>
          <button className="homepageButton" onClick={props.clickCreate}>
            Create Quiz
          </button>
        </div>
      </main>
    </>
  );
}