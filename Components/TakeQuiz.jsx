import "./quiz.css";
export default function TakeQuiz(props) {
  return (
    <>
      <div className="categoryContainer">
        <h2 className="category">Category: Science</h2>
        <h3 className="categoryDescr">
          How well do you know science? Test your knowledge with these quick
          questions.
        </h3>
        <div className="durationLevel">
          <p>
            {" "}
            <strong>Level:</strong> Easy{" "}
          </p>
          <p>
            {" "}
            <strong>Duration:</strong> 5 mins{" "}
          </p>
        </div>
        <button className="startQuizButton">Start Quiz</button>
      </div>

      <button onClick={props.click}>HomeButton</button>
    </>
  );
}
