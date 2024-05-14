import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizForm.css"; // Assuming you have created QuizForm.css in the same directory
import { BASE_URL } from "../../utils/baseUrl";
import axios from "axios";

const QuizForm = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: "",
    difficulty: "",
    questions: [
      {
        questionText: "",
        options: ["Option 1", "Option 2"],
        answer: "",
      },
    ],
  });

  const addOption = (questionIndex) => {
    const questions = [...quiz.questions];
    questions[questionIndex].options.push(
      `Option ${questions[questionIndex].options.length + 1}`
    );
    setQuiz({ ...quiz, questions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { questionText: "", options: ["Option 1", "Option 2"] },
      ],
    });
  };

  // TODO: Replace with your form submit logic
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(quiz);
    try{
      const response = await axios.post(`${BASE_URL}/questions`, quiz);
      console.log(response.data);
      navigate("/admin");

    }
    catch(error){
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className="quiz-form-container">
      <div className="go_back">
        <button onClick={() => navigate("/admin")}>Go Back</button>
      </div>
      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="form-group">
          <label>Quiz Title:</label>
          <input
            type="text"
            placeholder="Enter Quiz Title"
            className="quiz-form-control"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Difficulty:</label>
          <select
            className="quiz-form-control"
            value={quiz.difficulty}
            onChange={(e) => setQuiz({ ...quiz, difficulty: e.target.value })}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {quiz.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question-group">
            <div className="form-group">
              <label>Question:</label>
              <input
                type="text"
                className="quiz-form-control"
                placeholder="Enter Question"
                value={question.questionText}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    questions: quiz.questions.map((q, i) =>
                      i === questionIndex
                        ? {
                            ...q,
                            questionText: e.target.value,
                          }
                        : q
                    ),
                  })
                }
              />
            </div>

            <div>
              Options:
              {question.options.map((option, optionIndex) => (
                <div className="form-group" key={optionIndex}>
                  <label>Option {optionIndex + 1}:</label>
                  <input
                    className="quiz-form-control"
                    type="text"
                    value={option}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        questions: quiz.questions.map((q, i) =>
                          i === questionIndex
                            ? {
                                ...q,
                                options: q.options.map((o, i) =>
                                  i === optionIndex ? e.target.value : o
                                ),
                              }
                            : q
                        ),
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Answer</label>
              <input
                className="quiz-form-control"
                type="text"
                placeholder="Enter Answer"
                value={question.answer}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    questions: quiz.questions.map((q, i) =>
                      i === questionIndex
                        ? {
                            ...q,
                            answer: e.target.value,
                          }
                        : q
                    ),
                  })
                }
              />
            </div>

            <button
              className="add-option-button"
              type="button"
              onClick={() => addOption(questionIndex)}
            >
              Add Option
            </button>
          </div>
        ))}

        <div className="question_flex">
          <button
            className="add-question-button"
            type="button"
            onClick={addQuestion}
          >
            Add Question
          </button>

          <input type="submit" className="submit-button" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useEffect, useState } from "react";
// import "../../styles/AdminDashboard.css";

// const AdminCreateQuiz = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/questions");
//         console.log(response.data);
//         setQuestions(response.data);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleCreateCard = (question) => {
//     setQuestions([...questions, question]);
//     setIsModalOpen(false);
//   };

//   const handleCardClick = (question) => {
//     setSelectedQuestion(question);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row" style={{ minHeight: "100vh" }}>
//         <div className="col-2 admin-sidebar">
//           <div className="admin-sidebar-item">
//             <i className="fas fa-chart-bar"></i>
//             <span>Quiz</span>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default AdminCreateQuiz;
