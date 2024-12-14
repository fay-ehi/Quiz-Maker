import React from "react";
import Homepage from "../Components/Homepage";
import TakeQuiz from "../Components/TakeQuiz";
import CreateQuiz from "../Components/CreateQuiz";
export default function App() {
  const [page, setPage] = React.useState("home");

  function displayHome(event) {
    event.preventDefault();
    setPage("home");
  }

  function takeQuiz(event) {
    event.preventDefault();
    setPage("quiz");
  }

  function createQuiz(event) {
    event.preventDefault();
    setPage("createquiz");
  }

  return (
    <>
      {page === "home" && (
        <Homepage clickquiz={takeQuiz} clickCreate={createQuiz} />
      )}
      {page === "quiz" && <TakeQuiz click={displayHome} />}
      {page === "createquiz" && <CreateQuiz click={displayHome} />}
    </>
  );
}
