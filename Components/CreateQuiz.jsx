import React, { useState, useEffect } from "react";
import SavedQuizzes from "./savedQuizzes";

export default function CreateQuiz(props) {
  const [category, setCategory] = useState("Science");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [isViewingSavedQuizzes, setIsViewingSavedQuizzes] = useState(false);
  const [savedQuizzes, setSavedQuizzes] = useState([]);

  useEffect(() => {
    const savedData =
      JSON.parse(localStorage.getItem(`savedQuizzes_${props.user?.name}`)) ||
      [];
    setSavedQuizzes(savedData);
  }, [props.user]);

  useEffect(() => {
    localStorage.setItem("savedQuizzes", JSON.stringify(savedQuizzes));
  }, [savedQuizzes]);

  const handleAddQuestion = () => {
    if (
      currentQuestion.trim() &&
      currentOptions.every((opt) => opt.trim()) &&
      correctAnswer !== null
    ) {
      const newQuestion = {
        question: currentQuestion,
        options: currentOptions,
        correctAnswer,
        category,
        difficulty,
      };

      if (isEditing) {
        const updatedQuestions = [...questions];
        updatedQuestions[editIndex] = newQuestion;
        setQuestions(updatedQuestions);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setQuestions([...questions, newQuestion]);
      }

      setCurrentQuestion("");
      setCurrentOptions(["", "", "", ""]);
      setCorrectAnswer(0);
      if (!isLocked) setIsLocked(true);
    } else {
      alert(
        "Please complete the question, all options, and select the correct answer."
      );
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    if (updatedQuestions.length === 0) setIsLocked(false);
  };

  const handleEditQuestion = (index) => {
    const questionToEdit = questions[index];
    setCurrentQuestion(questionToEdit.question);
    setCurrentOptions(questionToEdit.options);
    setCorrectAnswer(questionToEdit.correctAnswer);
    setCategory(questionToEdit.category);
    setDifficulty(questionToEdit.difficulty);
    setIsEditing(true);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearQuizzes = () => {
    if (window.confirm("Are you sure you want to clear all quizzes?")) {
      setQuestions([]);
      setIsLocked(false);
    }
  };

  const handleSaveQuiz = () => {
    if (questions.length === 0) {
      alert("You need to add at least one question before saving.");
      return;
    }

    // Append the current quiz to the saved quizzes for this user
    const updatedQuizzes = [
      ...savedQuizzes,
      {
        category,
        difficulty,
        questions,
        creationDate: new Date().toISOString(),
      },
    ];

    setSavedQuizzes(updatedQuizzes);

    if (props.user && props.user.name) {
      localStorage.setItem(
        `savedQuizzes_${props.user.name}`,
        JSON.stringify(updatedQuizzes)
      );
    }

    setQuestions([]);
    setIsLocked(false);
    alert("Quiz saved successfully!");
  };

  const handleViewSavedQuizzes = () => {
    setIsViewingSavedQuizzes(true);
  };

  const handleBackToQuizCreation = () => {
    setIsViewingSavedQuizzes(false);
  };

  const handleDeleteSavedQuiz = (index) => {
    if (window.confirm("Are you sure you want to clear all questions?")) {
      const updatedSavedQuizzes = savedQuizzes.filter((_, i) => i !== index);
      setSavedQuizzes(updatedSavedQuizzes);
      alert("Deleted");
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  if (isViewingSavedQuizzes) {
    return (
      <SavedQuizzes
        savedQuizzes={savedQuizzes}
        onBack={handleBackToQuizCreation}
        onDelete={handleDeleteSavedQuiz}
        formatDate={formatDate}
      />
    );
  }

  return (
    <>
      <div className="createQuizContainer">
        <button className="homeButton" onClick={props.click}>
          Home
        </button>
        <div className="quizPage">
          <div className="globalSettings">
            <div className="categorySection">
              <label className="categoryLabel">Category</label>
              <select
                className="categorySelect"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isLocked || isEditing}
              >
                <option value="Science">Science</option>
                <option value="Geography">Geography</option>
                <option value="History">History</option>
                <option value="Sports">Sports</option>
                <option value="Movies">Movies</option>
              </select>
            </div>
            <div className="difficultySection">
              <label className="difficultyLabel">Difficulty</label>
              <div className="difficultyOptions">
                <input
                  type="radio"
                  name="difficulty"
                  value="Easy"
                  checked={difficulty === "Easy"}
                  onChange={(e) => setDifficulty(e.target.value)}
                  disabled={isLocked || isEditing}
                />
                Easy
                <input
                  type="radio"
                  name="difficulty"
                  value="Medium"
                  checked={difficulty === "Medium"}
                  onChange={(e) => setDifficulty(e.target.value)}
                  disabled={isLocked || isEditing}
                />
                Medium
                <input
                  type="radio"
                  name="difficulty"
                  value="Hard"
                  checked={difficulty === "Hard"}
                  onChange={(e) => setDifficulty(e.target.value)}
                  disabled={isLocked || isEditing}
                />
              </div>
            </div>
          </div>

          <div className="quizCard">
            <form className="quizForm">
              <label>
                <strong>Question</strong>
              </label>
              <input
                type="text"
                className="questionInput"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
              />

              <div className="optionsInput">
                {currentOptions.map((option, index) => (
                  <div key={index} className="optionGroup">
                    <label>
                      <input
                        type="radio"
                        name="correctAnswer"
                        value={index}
                        checked={correctAnswer === index}
                        onChange={() => setCorrectAnswer(index)}
                      />
                      Option {index + 1}:
                    </label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        setCurrentOptions(
                          currentOptions.map((opt, i) =>
                            i === index ? e.target.value : opt
                          )
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </form>
          </div>

          <div className="actionButtons">
            <button className="addQuestionButton" onClick={handleAddQuestion}>
              {isEditing ? "Update Question" : "Add Question"}
            </button>
          </div>

          <div className="questionsList">
            {questions.map((q, index) => (
              <div key={index} className="questionCard">
                <h3>Question {index + 1}</h3>
                <p>
                  <strong>Category:</strong> {q.category}
                </p>
                <p>
                  <strong>Difficulty:</strong> {q.difficulty}
                </p>
                <p>
                  <strong>Question:</strong> {q.question}
                </p>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i}>
                      Option {i + 1}: {opt}
                      {q.correctAnswer === i && " (Correct)"}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleEditQuestion(index)}>EDIT</button>
                <button onClick={() => handleDeleteQuestion(index)}>
                  DELETE
                </button>
              </div>
            ))}
          </div>

          {questions.length > 0 && (
            <div className="bottomButtons">
              <button className="saveQuizButton " onClick={handleSaveQuiz}>
                Save Quiz
              </button>
              <button className="clearAllButton" onClick={handleClearQuizzes}>
                Clear All Questions
              </button>
            </div>
          )}
          <button className="viewQuizButton" onClick={handleViewSavedQuizzes}>
            View Saved Quizzes
          </button>
        </div>
      </div>
    </>
  );
}
