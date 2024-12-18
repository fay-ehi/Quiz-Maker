export default function CreateQuiz(props) {
  return (
    <>
      <button onClick={props.click}>Home</button>
      <form>
        <label htmlFor="title">Quiz Title</label>
        <input id="title" type="text" />
        <label>Pick a category</label>
        <select>
          <option value="Science"></option>
          <option value="Geography"></option>
          <option value="History"></option>
          <option value="Sports"></option>
          <option value="Movies"></option>
        </select>
        <label>Difficulty Level</label>
        <label htmlFor="">Easy</label>
        <input type="radio" name="" id="" />
        <label htmlFor="">Medium</label>
        <input type="radio" name="" id="" />
        <label htmlFor="">Hard</label>
        <input type="radio" name="" id="" />
        <label>QUESTION</label>
        <input type="text" />
        <label htmlFor="">OPTION1</label>
        <input type="text" />
        <label htmlFor="">Option2</label>
        <input type="text" />
        <label htmlFor="">Option3</label>
        <input type="text" />
        <label htmlFor="">Option4</label>
        <input type="text" />
        <label htmlFor="Correct answer"></label>
        <select name="" id="">
          <option value="">Option 1</option>
          <option value="">Option 2</option>
          <option value="">Option 3</option>
          <option value="">Option 4</option>
          <button>Add Question</button>
          <button type="submit">Save Quiz</button>
        </select>
      </form>
    </>
  );
}
