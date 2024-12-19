import React, { useState } from "react";
import "./quiz.css";
import PreviewQuiz from "./PreviewQuiz";

export default function SavedQuizzes({ savedQuizzes, onBack, onDelete }) {
  const [previewingQuiz, setPreviewingQuiz] = useState(null);

  const handlePreview = (quiz) => {
    setPreviewingQuiz(quiz);
  };

  const handleBackFromPreview = () => {
    setPreviewingQuiz(null);
  };

  const calculateDuration = (difficulty) => {
    const level = difficulty.toLowerCase();

    if (level === "medium") {
      return 5 * 2;
    } else if (level === "hard") {
      return 5 * 3;
    } else {
      return 5;
    }
  };

  return (
    <div>
      {previewingQuiz ? (
        <PreviewQuiz quiz={previewingQuiz} onBack={handleBackFromPreview} />
      ) : (
        <>
          <div className="container1">
            <button onClick={onBack} className="backButton">
              Back to Create Quiz
            </button>

            {savedQuizzes.length === 0 ? (
              <p>No saved quizzes available.</p>
            ) : (
              savedQuizzes.map((quiz, index) => (
                <div key={index} className="categoryContainer">
                  <h2 className="category">{quiz.category}</h2>{" "}
                  <div className="deletButtonPositioning">
                    <button
                      className="startQuizButton"
                      onClick={() => onDelete(index)}
                    >
                      x
                    </button>
                  </div>
                  <hr className="page2Hr" />
                  <h3 className="categoryDescr">
                    How well do you know {quiz.category} ? Test your knowledge
                    with these quick questions.
                  </h3>
                  <div className="durationLevel">
                    <p>
                      <strong>Level:</strong> {quiz.difficulty}
                    </p>
                    <p>
                      <strong>Duration:</strong>{" "}
                      {calculateDuration(quiz.difficulty)} mins
                    </p>
                    <p>
                      <strong>Created On:</strong>{" "}
                      {new Date(quiz.creationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="startQuizButton previewButton"
                    onClick={() => handlePreview(quiz)}
                  >
                    Preview Quiz
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
