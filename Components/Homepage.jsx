export default function Homepage(props) {
  //   function displayQuiz(event) {
  //     event.preventDefault();
  //   }
  return (
    <>
      <main>
        <div className="homepage">
          <h1 className="title">QUIZ APP</h1>
          <p>Want to test your IQ? Take a Quiz today</p>
          <button onClick={props.clickquiz}>Take Quiz</button>
          <button onClick={props.clickCreate}>Create Quiz</button>
        </div>
      </main>
    </>
  );
}
