import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";
import { useLocation } from 'react-router-dom';
import "../styles/Main.css";
// import "../components/";

export default function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const question = location.state?.question;
  console.log("🚀 ~ Main ~ question:", question)
  const navigate = useNavigate();
  
  function startQuiz() {
    console.log("🚀 ~ quesyion sent  to main/quin ======>", question)
    navigate("/main/quiz" , { state: { question } });

    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
   
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <ol>
        <li>You will be asked 10 questions one after another.</li>
        <li>10 points is awarded for the correct answer.</li>
        <li>
          Each question has three options. You can choose only one options.
        </li>
        <li>You can review and change answers before the quiz finish.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      <form id="form">
        <input
          ref={inputRef}
          className="userid"
          type="text"
          placeholder="Username*"
        />
      </form>

      <div className="start">
      <div className="start">
        <button className="btn" onClick={startQuiz}>Start Quiz</button>
      </div>
      </div>
    </div>
  );
}
