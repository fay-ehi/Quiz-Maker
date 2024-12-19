import React, { useRef } from "react";

export default function PreviewQuiz({ quiz, onBack }) {
  const [index, setIndex] = React.useState(0);
  const [question, setQuestion] = React.useState(quiz.questions[index]);

  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const removeClassesFromOptions = () => {
    optionRefs.forEach((ref) =>
      ref.current.classList.remove("wrong", "correct")
    );
  };

  const [lock, setLock] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [result, setResult] = React.useState(false);
  const [userAnswers, setUserAnswers] = React.useState([]);

  const checkAns = (e, ansIndex) => {
    if (!lock) {
      const isCorrect = question.correctAnswer === ansIndex;

      const correctAnswerText = question.options[question.correctAnswer];
      const userAnswerText = question.options[ansIndex];

      if (isCorrect) {
        e.target.classList.add("correct");
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("wrong");
      }

      setUserAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          question: question.question,
          correctAnswer: correctAnswerText,
          userAnswer: userAnswerText,
          isCorrect: isCorrect,
        },
      ]);

      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === quiz.questions.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(quiz.questions[index + 1]);
      setLock(false);
      removeClassesFromOptions();
    }
  };

  return (
    <div className="container2">
      {" "}
      <button onClick={onBack} className="backButton">
        Back
      </button>
      <div className="quizQuestions">
        <h1 className="header">{quiz.category}</h1>
        <hr />
        {result ? (
          <>
            <h2 className="result">
              You Scored {score} out of {quiz.questions.length}!
            </h2>

            <ul className="answers">
              {userAnswers.map((answer, index) => (
                <li key={index} className="answerItem">
                  <strong>Question {index + 1}:</strong> {answer.question}
                  <br />
                  <span className="correctAns">
                    Correct Answer: {answer.correctAnswer}
                  </span>
                  <br />
                  <span
                    className={answer.isCorrect ? "correctAns" : "wrongAns"}
                  >
                    Your Answer: {answer.userAnswer}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2 className="questionText">
              {index + 1}. {question.question}
            </h2>
            <ul className="options">
              {question.options.map((option, optIndex) => (
                <li
                  key={optIndex}
                  ref={optionRefs[optIndex]}
                  onClick={(e) => checkAns(e, optIndex)}
                  className="option"
                >
                  {option}
                </li>
              ))}
            </ul>
            <button onClick={next} className="nextButton">
              Next
            </button>
            <p className="index">
              {index + 1} OF {quiz.questions.length} questions
            </p>
          </>
        )}{" "}
      </div>
    </div>
  );
}
