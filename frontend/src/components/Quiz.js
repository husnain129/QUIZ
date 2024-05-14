import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [checked, setChecked] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(60);
  const location = useLocation();
  const questionData = location.state?.question;
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer <= 0) {
        clearInterval(countdown);
        onNext();
      } else {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer, currentQuestionIndex]);

  function onNext() {
    setAnswers((prevAnswers) => {
      let newAnswers = [...prevAnswers];
      if (checked !== null) {
        newAnswers.push(checked);
      }
      if (currentQuestionIndex < questionData.questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimer(60);
      }
      return newAnswers;
    });
    setChecked(null);
  }

  function onSubmit() {
    let newAnswers = [...answers];
    if (checked !== null) {
      newAnswers.push(checked);
    }
    setAnswers(newAnswers);

    navigate('/result', { state: { newAnswers , questionData } });
  }

  function onPrev() {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  }

  function onChecked(value) {
    setChecked(value);
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>
      <div className="timer" style={{ position: 'fixed', top: 10, right: 10, fontSize: 24, fontWeight: 'bold', color: '#ff0000' }}>{timer}</div>
      <Questions question={questionData.questions[currentQuestionIndex]} onChecked={onChecked} />

      <div className="grid">
        {currentQuestionIndex > 0 && (
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
        )}
        {currentQuestionIndex === questionData.questions.length - 1 ? (
          <button className="btn next" onClick={onSubmit}>
            Submit
          </button>
        ) : (
          <button className="btn next" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
