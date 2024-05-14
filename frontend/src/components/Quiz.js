import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [checked, setChecked] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(60);
  const location = useLocation();
  const questionData = location.state?.question; // Access the question data from the location state
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer <= 0) {
        clearInterval(countdown);
        if (currentQuestionIndex === questionData.questions.length - 1) {
          onSubmit();
        } else {
          onNext();
        }
      } else {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer, currentQuestionIndex]);
function onNext() {
  // Save the answer and move to the next question if it's not the last one
  setAnswers((prevAnswers) => {
    let newAnswers = [...prevAnswers];
    if (checked !== null) {
      newAnswers.push(checked);
    }
    if (currentQuestionIndex < questionData.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(60); // Reset the timer for the next question
    }
    return newAnswers;
  });
  setChecked(null); // Reset the checked state for the next question
}
function onSubmit() {
  // Create a new array that includes the last answer
  let newAnswers = [...answers];
  if (checked !== null) {
    newAnswers.push(checked);
  }

  // Save the last answer
  setAnswers(newAnswers);

  console.log("New answers: ", newAnswers);
  console.log("Question data: ", questionData);

  // Calculate the number of correct and wrong answers
  let correctAnswers = 0;
  let wrongAnswers = 0;
  newAnswers.forEach((answerIndex, questionIndex) => {
    if (questionData.questions[questionIndex].answers[answerIndex] === questionData.questions[questionIndex].correctAnswer) {
      correctAnswers++;
    } else {
      wrongAnswers++;
    }
  });

  console.log("Correct answers: ", correctAnswers);
  console.log("Wrong answers: ", wrongAnswers);

  // Navigate to the result page
  navigate('/result', { state: { newAnswers , questionData } });
}
  function onPrev() {
    // Move to the previous question if it's not the first one
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  }

  function onChecked(value) {
    // Update the checked state when an option is selected
    setChecked(value);
  }


  // function onSubmit() {
  //   // Save the last answer
  //   setAnswers((prevAnswers) => [...prevAnswers, checked]);
  //   // Navigate to the result page
  //   navigate('/result', { state: { answers } });
  // }
  // useEffect(() => {
  //   console.log("🚀 ~ onSubmit ~ answers", answers);
  // }, [answers]);
  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>
       {/* display timer */}
<div className="timer" style={{ position: 'fixed', top: 10, right: 10, fontSize: 24, fontWeight: 'bold', color: '#ff0000' }}>{timer}</div>
      {/* display current question */}
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