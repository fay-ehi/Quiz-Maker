import React from "react";
import Homepage from "../Components/Homepage";
import TakeQuiz from "../Components/TakeQuiz";
import CreateQuiz from "../Components/CreateQuiz";
import categorydata from "../data/categorydata";
import StartQuiz from "../Components/StartQuiz";

export default function App() {
  const [page, setPage] = React.useState("home");
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  function displayHome(event) {
    event.preventDefault();
    setPage("home");
  }

  function goBack(event) {
    event.preventDefault();
    setPage("quiz");
  }

  function takeQuiz(event) {
    event.preventDefault();
    setPage("quiz");
  }

  function createQuiz(event) {
    event.preventDefault();
    setPage("createquiz");
  }

  function startQuiz(category) {
    setSelectedCategory(category);
    setPage("startquiz");
  }

  const categoryEl = categorydata.map((category) => (
    <TakeQuiz
      key={category.id}
      category={category}
      click={() => startQuiz(category)}
    />
  ));

  return (
    <>
      {page === "home" && (
        <Homepage clickquiz={takeQuiz} clickCreate={createQuiz} />
      )}

      {page === "quiz" && (
        <div className="container1">
          <button onClick={displayHome} className="homeButton">
            Back Home
          </button>{" "}
          {categoryEl}
        </div>
      )}

      {page === "createquiz" && <CreateQuiz click={displayHome} />}

      {page === "startquiz" && (
        <>
          {" "}
          <div className="container2">
            <div className="buttons">
              <button className="prevButtons" onClick={goBack}>
                Category
              </button>
              <button className="prevButtons" onClick={displayHome}>
                Go Home
              </button>
            </div>
            <div className="quizQuestions">
              {" "}
              <StartQuiz Selectedcategory={selectedCategory} />{" "}
            </div>
          </div>
        </>
      )}
    </>
  );
}
