// import React, { useEffect } from 'react'
// import '../styles/Result.css';
// import { Link } from 'react-router-dom';

// import ResultTable from './ResultTable';
// import { useDispatch, useSelector } from 'react-redux';
// import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

// /** import actions  */
// import { resetAllAction } from '../redux/question_reducer';
// import { resetResultAction } from '../redux/result_reducer';
// import { usePublishResult } from '../hooks/setResult';


// export default function Result() {


//     const dispatch = useDispatch()
//     const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

//     const totalPoints = queue.length * 10; 
//     const attempts = attempts_Number(result);
//     const earnPoints = earnPoints_Number(result, answers, 10)
//     const flag = flagResult(totalPoints, earnPoints)


//     /** store user result */
//     usePublishResult({ 
//         result, 
//         username : userId,
//         attempts,
//         points: earnPoints,
//         achived : flag ? "Passed" : "Failed" });

//     function onRestart(){
//         dispatch(resetAllAction())
//         dispatch(resetResultAction())
//     }

//   return (
//     <div className='container'>
//         <h1 className='title text-light'>Quiz Application</h1>

//         <div className='result flex-center'>
//             <div className='flex'>
//                 <span>Username</span>
//                 <span className='bold'>{userId || ""}</span>
//             </div>
//             <div className='flex'>
//                 <span>Total Quiz Points : </span>
//                 <span className='bold'>{totalPoints || 0}</span>
//             </div>
//             <div className='flex'>
//                 <span>Total Questions : </span>
//                 <span className='bold'>{ queue.length || 0}</span>
//             </div>
//             <div className='flex'>
//                 <span>Total Attempts : </span>
//                 <span className='bold'>{attempts || 0}</span>
//             </div>
//             <div className='flex'>
//                 <span>Total Earn Points : </span>
//                 <span className='bold'>{earnPoints || 0}</span>
//             </div>
//             <div className='flex'>
//                 <span>Quiz Result</span>
//                 <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
//             </div>
//         </div>

//         <div className="start">
//             <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
//         </div>

//         <div className="container">
//             {/* result table */}
//             <ResultTable></ResultTable>
//         </div>
//     </div>
//   )
// }import React from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';
import '../styles/Result.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { BASE_URL } from '../utils/baseUrl';

export default function Result() {
  const dispatch = useDispatch();
  const location = useLocation();
  const newAnswers = location.state.newAnswers;
  const questions = location.state.questionData.questions;

  const totalQuestions = questions.length;
  const totalAnswered = newAnswers.length;
  const totalCorrect = newAnswers.reduce((count, answerIndex, questionIndex) => {
    const correctAnswerIndex = questions[questionIndex].options.findIndex(option => option === questions[questionIndex].answer);
    return count + (answerIndex === correctAnswerIndex ? 1 : 0);
  }, 0);
  const totalWrong = totalAnswered - totalCorrect;

  // Send the data to the backend API to update/add quizzes taken by the user
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
let userId = user._id;
    console.log("🚀 ~ useEffect ~ userId:", userId)
    const data = {
      quizTitle: location.state.questionData.title,
      difficulty: location.state.questionData.difficulty,
      achievedPoints: totalCorrect,
      totalAnswered: totalAnswered,
      totalQuestions: totalQuestions,
      userId : userId
    };

    axios.post(`${BASE_URL}/user/quizzes/update`, data)
      .then(response => {
        console.log('Quizzes taken updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating quizzes taken:', error);
      });
  }, [location, totalCorrect]);

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>

      <div className='result flex-center'>
        <div className='flex'>
          <span>Total Questions : </span>
          <span className='bold'>{totalQuestions || 0}</span>
        </div>
        <div className='flex'>
          <span>Total Answered : </span>
          <span className='bold'>{totalAnswered || 0}</span>
        </div>
        <div className='flex'>
          <span>Total Correct : </span>
          <span className='bold'>{totalCorrect || 0}</span>
        </div>
        <div className='flex'>
          <span>Total Wrong : </span>
          <span className='bold'>{totalWrong || 0}</span>
        </div>
      </div>

      <div className="start">
        <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
      </div>
    </div>
  );
}

