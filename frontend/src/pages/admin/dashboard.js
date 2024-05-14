import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";


const AdminDashboard = () => {
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

  
  const handleCardClick = (question) => {
    setSelectedQuestion(question);
  };

  function getDifficultyLevel(difficulty) {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 1;
      case 'medium': return 3;
      case 'hard': return 5;
      default: return 0;
    }
  }
return (
  <div className="container-fluid">
  <div className="row" style={{ minHeight: "100vh" }}>
    <div className="col-2 admin-sidebar d-flex flex-column">
      <div>
        <div className="admin-sidebar-item">
          <i className="fas fa-chart-bar"></i>
          <span>Quiz</span>
        </div>
        {/* ... other sidebar items ... */}
      </div>
      <div className="mt-auto admin-sidebar-item" >
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </div>
    </div>
      <div className="col-10 mt-4">
        <div className="d-flex justify-content-between">
          <h2 className="admin-dashboard-heading text-white">Admin Dashboard</h2>
          <button
            className="btn btn-dark mx-3 mt-1"
            onClick={() => navigate("/admin/create-quiz")}
          >
            + Create Card
          </button>
        </div>
        <hr />
        <div className="row">
          <h3 className="col-12 text-white">Total Quiz: {questions.length}</h3>
          {questions.map((question, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 col-sm-12 mb-4"
              onClick={() => handleCardClick(question)}
            >
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="card-title">{question.title}</h2>
                  <div className="card-difficulty">
                    Difficulty: {question.difficulty} 
                    <span>
                      {"★".repeat(getDifficultyLevel(question.difficulty))}
                    </span>
                    <span className="unfilled">
                      {"★".repeat(5 - getDifficultyLevel(question.difficulty))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* ... */}
  </div>
);
};

export default AdminDashboard;
