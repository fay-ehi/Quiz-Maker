import React, { useState, useEffect } from "react";
import SavedQuizzes from "./savedQuizzes";
export default function CreateQuiz(props) {
  const [category, setCategory] = useState("Science");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("Option 1");
  const [isLocked, setIsLocked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [isViewingSavedQuizzes, setIsViewingSavedQuizzes] = useState(false);
  const [savedQuizzes, setSavedQuizzes] = useState([]);

  // Load saved quizzes from local storage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("savedQuizzes")) || [];
    setSavedQuizzes(savedData);
  }, []);

  // Save quizzes to local storage whenever savedQuizzes changes
  useEffect(() => {
    localStorage.setItem("savedQuizzes", JSON.stringify(savedQuizzes));
  }, [savedQuizzes]);

  const handleAddQuestion = () => {
    if (
      currentQuestion.trim() &&
      currentOptions.every((opt) => opt.trim()) &&
      correctAnswer
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
      setCorrectAnswer("Option 1");
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
    setSavedQuizzes([...savedQuizzes, { category, difficulty, questions }]);
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
    const updatedSavedQuizzes = savedQuizzes.filter((_, i) => i !== index);
    setSavedQuizzes(updatedSavedQuizzes);
  };

  if (isViewingSavedQuizzes) {
    return (
      <SavedQuizzes
        savedQuizzes={savedQuizzes}
        onBack={handleBackToQuizCreation}
        onDelete={handleDeleteSavedQuiz}
      />
    );
  }

  return (
    <>
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
              Hard
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
                  <label>Option {index + 1}</label>
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

            <label className="correctAnswerLabel">Correct Answer</label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            >
              {currentOptions.map((_, index) => (
                <option key={index} value={`Option ${index + 1}`}>
                  Option {index + 1}
                </option>
              ))}
            </select>
          </form>
        </div>

        <div className="actionButtons">
          <button onClick={handleAddQuestion}>
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
                    {q.correctAnswer === `Option ${i + 1}` && " (Correct)"}
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
            <button onClick={handleSaveQuiz}>Save Quiz</button>
            <button onClick={handleClearQuizzes}>Clear All Quizzes</button>
          </div>
        )}
        <button onClick={handleViewSavedQuizzes}>View Saved Quizzes</button>
      </div>
    </>
  );
}
