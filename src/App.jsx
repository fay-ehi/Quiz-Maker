import React from "react";
import Homepage from "../Components/Homepage";
import TakeQuiz from "../Components/TakeQuiz";
import CreateQuiz from "../Components/CreateQuiz";
import categorydata from "../data/categorydata";
import StartQuiz from "../Components/StartQuiz";
import Login from "../Components/login";

export default function App() {
  const [page, setPage] = React.useState("home");
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
    if (user) {
      setPage("quiz");
    } else {
      setPage("login");
    }
  }

  function createQuiz(event) {
    event.preventDefault();
    if (user) {
      setPage("createquiz");
    } else {
      setPage("login");
    }
  }

  function startQuiz(category) {
    setSelectedCategory(category);
    setPage("startquiz");
  }

  function handleLoginSuccess(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setPage("home");
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    setPage("login");
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
        <Homepage
          clickquiz={takeQuiz}
          clickCreate={createQuiz}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {page === "login" && <Login onLogin={handleLoginSuccess} />}

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
