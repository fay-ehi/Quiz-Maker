import React from "react";
import "./homepage.css";

export default function Homepage(props) {
  return (
    <>
      <main>
        <div className="homepage">
          {props.user && (
            <button
              className="logoutButton"
              onClick={() => {
                if (
                  window.confirm("You will lose all existing created quiz?")
                ) {
                  props.onLogout();
                }
              }}
            >
              New User
            </button>
          )}
          <h1 className="title">QUIZ APP</h1>
          <p className="homepageText">
            {props.user
              ? `Welcome, ${props.user.name}! Take a Quiz today `
              : "Want to test your IQ? "}
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
