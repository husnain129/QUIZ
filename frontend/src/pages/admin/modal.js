import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useState } from "react";

const BASE_URL = "http://localhost:8080";

const Modal = ({ closeModal }) => {
  const [questions, setQuestions] = useState([
    { question: "", options: "", answer: "" },
  ]);
  const [difficulty, setDifficulty] = useState("Easy");

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const data = new FormData(event.target);
      const title = data.get("title");

      const questionsData = questions?.map((_, index) => {
        const question = data.get(`questions[${index}][question]`);
        const options = data.get(`questions[${index}][options]`);
        const answer = data.get(`questions[${index}][answer]`);

        return {
          question,
          answers: options.split(",").map((option) => option.trim()),
          correctAnswer: answer,
        };
      });

      try {
        const response = await axios.post(`${BASE_URL}/api/questions`, {
          title,
          difficulty,
          questions: questionsData,
        });
        console.log(response.data);
        closeModal();
      } catch (error) {
        console.error("Error creating card:", error);
      }
    },
    [questions, difficulty]
  );

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: "", answer: "" }]);
  };
  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Quiz Card</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "20px",
              }}
            >
              <label htmlFor="title" style={{ marginBottom: "10px" }}>
                Quiz Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <label htmlFor="difficulty" style={{ marginBottom: "10px" }}>
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              {questions?.map((_, index) => (
                <div
                  key={index}
                  id="questions"
                  style={{ marginBottom: "20px" }}
                >
                  <div className="question" style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor={`question${index}`}
                      style={{ marginBottom: "10px" }}
                    >
                      Question
                    </label>
                    <input
                      type="text"
                      id={`question${index}`}
                      name={`questions[${index}][question]`}
                      style={{
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />

                    <label
                      htmlFor={`options${index}`}
                      style={{ marginBottom: "10px" }}
                    >
                      Options (comma separated)
                    </label>
                    <input
                      type="text"
                      id={`options${index}`}
                      name={`questions[${index}][options]`}
                      style={{
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />

                    <label
                      htmlFor={`answer${index}`}
                      style={{ marginBottom: "10px" }}
                    >
                      Answer
                    </label>
                    <input
                      type="text"
                      id={`answer${index}`}
                      name={`questions[${index}][answer]`}
                      style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                </div>
              ))}

              <button type="button" onClick={addQuestion}>
                Add Question
              </button>
              <button
                type="submit"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#007BFF",
                  color: "white",
                }}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
