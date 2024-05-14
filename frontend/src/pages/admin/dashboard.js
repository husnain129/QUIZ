import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/questions");
        console.log(response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateCard = (question) => {
    setQuestions([...questions, question]);
    setIsModalOpen(false);
  };

  const handleCardClick = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-2 admin-sidebar">
          <div className="admin-sidebar-item">
            <i className="fas fa-chart-bar"></i>
            <span>Quiz</span>
          </div>
        </div>
        <div className="col-10 mt-4">
          <div className="d-flex justify-content-between">
            <h2 className="admin-dashboard-heading">Admin Dashboard</h2>
            <button
              className="btn btn-dark mx-3 mt-1"
              onClick={() => navigate("/admin/create-quiz")}
            >
              + Create Card
            </button>
          </div>
          <hr />
          <div className="row">
            <div className="col d-flex flex-wrap justify-content-between">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="card text-center"
                  style={{
                    width: "calc(33.33% - 20px)",
                    marginBottom: "20px",
                    height: "200px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick(question)}
                >
                  <div className="card-body">
                    <h2>{question.question}</h2>
                    <p>{question.difficulty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* {isModalOpen && (
        <Modal closeModal={closeModal} handleCreateCard={handleCreateCard} />
      )} */}

      {selectedQuestion && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="modal-title">Card Details</h5>
                <button
                  type="button"
                  className="close text-right btn btn-danger btn-sm"
                  onClick={() => setSelectedQuestion(null)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group mb-2">
                    <label htmlFor="language">Quiz:</label>
                    <input
                      type="text"
                      id="language"
                      name="language"
                      value={selectedQuestion.language}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="language">Difficulty:</label>
                    <input
                      type="text"
                      id="language"
                      name="language"
                      value={selectedQuestion.difficulty}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="language">Question:</label>
                    <input
                      type="text"
                      id="language"
                      name="language"
                      value={selectedQuestion.question}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="answers">Answers:</label>
                    {selectedQuestion.answers.map((answer, index) => (
                      <input
                        key={index}
                        type="text"
                        id={`answer${index}`}
                        name={`answer${index}`}
                        value={answer}
                        readOnly
                        className="form-control mb-2"
                      />
                    ))}
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="language">Correct Answer:</label>
                    <input
                      type="text"
                      id="language"
                      name="language"
                      value={selectedQuestion.correctAnswer}
                      readOnly
                      className="form-control"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
