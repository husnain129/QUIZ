// Card.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";


const Card = ({ question, handleCardClick }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card text-center"
      style={{
        width: "calc(33.33% - 20px)",
        marginBottom: "20px",
        height: "150px",
        cursor: "pointer",
      }}
      onClick={() => {
      console.log("🚀 ~ file: Card.js ~ line 15 ~ onClick ~ question", question)
      navigate('/main', { state: { question } });

      
      }
    }
    >
      <div className="card-body">
        <h3>{question.title}</h3>
      </div>
    </div>
  );
};

export default Card;
