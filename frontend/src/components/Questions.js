// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'


// /** Custom Hook */
// import { useFetchQestion } from '../hooks/FetchQuestion'
// import { updateResult } from '../hooks/setResult'


// export default function Questions({ onChecked }) {

//     const [checked, setChecked] = useState(undefined)
//     const { trace } = useSelector(state => state.questions);
//     const result = useSelector(state => state.result.result);
//     const [{ isLoading, apiData, serverError}] = useFetchQestion() 

//     const questions = useSelector(state => state.questions.queue[state.questions.trace])
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(updateResult({ trace, checked}))
//     }, [checked])
    
//     function onSelect(i){
//         onChecked(i)
//         setChecked(i)
//         dispatch(updateResult({ trace, checked}))
//     }


//     if(isLoading) return <h3 className='text-light'>isLoading</h3>
//     // if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>
//     console.log("questions >> ",questions)
//   return (
//     <div className='questions'>
//         <h2 className='text-light'>{questions?.question}</h2>

//         <ul key={questions?.id}>
//             {
//                 questions?.options.map((q, i) => (
//                     <li key={i}>
//                         <input 
//                             type="radio"
//                             value={false}
//                             name="options"
//                             id={`q${i}-option`}
//                             onChange={() => onSelect(i)}
//                         />

//                         <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
//                         <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
//                     </li>
//                 ))
//             }
//         </ul>
//     </div>
//   )
// }

// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useFetchQestion } from '../hooks/FetchQuestion'
// import { updateResult } from '../hooks/setResult'

// export default function Questions({ onChecked , question}) {
//     const [checked, setChecked] = useState(undefined)
//     const { trace } = useSelector(state => state.questions);
//     const result = useSelector(state => state.result.result);
//     const [{ isLoading, apiData, serverError}] = useFetchQestion() 

//     const questionData = useSelector(state => state.questions.queue[state.questions.trace])
//     const questions = question; // Access the questions array
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(updateResult({ trace, checked}))
//     }, [checked])
    
//     function onSelect(i){
//         onChecked(i)
//         setChecked(i)
//         dispatch(updateResult({ trace, checked}))
//     }

//     if(isLoading) return <h3 className='text-light'>isLoading</h3>
//     console.log("questions >> ",questions)
//     return (
//         <div className='questions'>
//             {
//                 questions?.map((question, index) => (
//                     <div key={question._id}>
//                         <h2 className='text-light'>{question.question}</h2>
//                         <ul>
//                             {
//                                 question.answers.map((answer, i) => (
//                                     <li key={i}>
//                                         <input 
//                                             type="radio"
//                                             value={false}
//                                             name={`options${index}`}
//                                             id={`q${i}-option`}
//                                             onChange={() => onSelect(i)}
//                                         />
//                                         <label className='text-primary' htmlFor={`q${i}-option`}>{answer}</label>
//                                         <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
//                                     </li>
//                                 ))
//                             }
//                         </ul>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchQestion } from '../hooks/FetchQuestion'
import { updateResult } from '../hooks/setResult'

export default function Questions({ onChecked , question}) {
    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, apiData, serverError}] = useFetchQestion() 

    const questionData = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateResult({ trace, checked}))
    }, [checked])
    
    function onSelect(i){
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({ trace, checked}))
    }

    if(isLoading) return <h3 className='text-light'>isLoading</h3>
    console.log("question >> ",question)
    return (
        <div className='questions'>
            <div key={question._id}>
                <h2 className='text-light'>{question.question}</h2>
                <ul>
                    {
                        question.answers.map((answer, i) => (
                            <li key={i}>
                                <input 
                                    type="radio"
                                    value={false}
                                    name={`options${question._id}`}
                                    id={`q${i}-option`}
                                    onChange={() => onSelect(i)}
                                />
                                <label className='text-primary' htmlFor={`q${i}-option`}>{answer}</label>
                                <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}