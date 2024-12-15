import "./quiz.css";
export default function TakeQuiz(props) {
  return (
    <>
      <div className="categoryContainer">
        <h2 className="category">{props.category.category}</h2>
        <hr className="page2Hr" />
        <h3 className="categoryDescr">
          How well do you know {props.category.category} ? Test your knowledge
          with these quick questions.
        </h3>
        <div className="durationLevel">
          <p>
            {" "}
            <strong>Level:</strong> {props.category.level}
          </p>
          <p>
            {" "}
            <strong>Duration:</strong> {props.category.duration}{" "}
          </p>
        </div>
        <button className="startQuizButton" onClick={props.click}>
          Start Quiz
        </button>
      </div>
    </>
  );
}
