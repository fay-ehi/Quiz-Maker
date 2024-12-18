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

  return (
    <div>
      {previewingQuiz ? (
        <PreviewQuiz quiz={previewingQuiz} onBack={handleBackFromPreview} />
      ) : (
        <>
          <button onClick={onBack} className="backButton">
            Back to Create Quiz
          </button>
          <h2>Saved Quizzes</h2>
          {savedQuizzes.length === 0 ? (
            <p>No saved quizzes available.</p>
          ) : (
            savedQuizzes.map((quiz, index) => (
              <div key={index} className="categoryContainer">
                <h2 className="category">{quiz.category}</h2>
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
                    <strong>Duration:</strong> 5 mins
                  </p>
                </div>
                <button
                  className="startQuizButton"
                  onClick={() => onDelete(index)}
                >
                  Delete Quiz
                </button>
                <button
                  className="startQuizButton previewButton"
                  onClick={() => handlePreview(quiz)}
                >
                  Preview Quiz
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
