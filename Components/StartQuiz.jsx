import React, { useRef } from "react";
import { quizData } from "../data/quizData";

export default function StartQuiz(props) {
  const { Selectedcategory } = props;
  const currentCategory = Selectedcategory.category;
  const [index, setIndex] = React.useState(0);
  const [question, setQuestion] = React.useState(
    quizData[currentCategory][index]
  );

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const removeClassesFromOptions = () => {
    Option1.current.classList.remove("wrong", "correct");
    Option2.current.classList.remove("wrong", "correct");
    Option3.current.classList.remove("wrong", "correct");
    Option4.current.classList.remove("wrong", "correct");
  };

  const [lock, setLock] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [result, setResult] = React.useState(false);
  const [userAnswers, setUserAnswers] = React.useState([]);

  const checkAns = (e, ans) => {
    if (lock === false) {
      const isCorrect = question.ans === ans;
      const correctAnswerText = question[`option${question.ans}`];
      const userAnswerText = question[`option${ans}`];

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
    if (lock === true) {
      if (index === quizData[currentCategory].length - 1) {
        setResult(true);
        return;
      }
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(quizData[currentCategory][index + 1]);
      setLock(false);
      removeClassesFromOptions();
    }
  };

  return (
    <>
      <h1 className="header"> {currentCategory}</h1>
      <hr />
      {result ? (
        <>
          <h2 className="result">
            You Scored {score} out of {quizData[currentCategory].length}!
          </h2>
          {score >= 3 ? (
            <h3 className="remarks"> Good Job 👏 </h3>
          ) : (
            <h3 className="remarks"> Try Again ? 😞 </h3>
          )}
         
          <ul className="answers">
            {userAnswers.map((answer, index) => (
              <li key={index} className="answerItem">
                <strong>Question{index + 1}:</strong> {answer.question}
                <br />
                <span className="correctAns">
                  Correct Answer: {answer.correctAnswer}
                </span>
                <br />
                <span className={answer.isCorrect ? "correctAns" : "wrongAns"}>
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
            <li
              ref={Option1}
              onClick={(e) => checkAns(e, 1)}
              className="option"
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => checkAns(e, 2)}
              className="option"
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => checkAns(e, 3)}
              className="option"
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => checkAns(e, 4)}
              className="option"
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next} className="nextButton">
            Next
          </button>
          <p className="index">
            {index + 1} OF {quizData[currentCategory].length} questions
          </p>
        </>
      )}
    </>
  );
}
