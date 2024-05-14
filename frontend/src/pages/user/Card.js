// Card.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";


const Card = ({ question, handleCardClick }) => {
  const navigate = useNavigate();
  return (
    <div
      // className="card text-center"
      style={{
        marginBottom: "20px",
        color: "black",
        height: "150px",
        cursor: "pointer",
        borderRadius: "10px",
        width: "100%",
   
        
      }}
      onClick={() => {
      console.log("🚀 ~ file: Card.js ~ line 15 ~ onClick ~ question", question)
      navigate('/main', { state: { question } });

      
      }
    }
    >
      <div className="card-body"
    style={{
      width: "100%",
      height: "100%",
    backgroundColor: "#444",
    borderRadius: "10px",
    color: "white",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    }}>
        <h3>{question.title}</h3>
      </div>
    </div>
  );
};

export default Card;
