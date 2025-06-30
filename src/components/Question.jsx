import React from 'react'
import { useState } from 'react';

export const Question = ({ quest: {
    question, correct_answer,
}, count, setCount }) => {
    const [localCount, setLocalCount] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const handleClick = (value) => {
        if (selectedAnswer) return; // Prevent changing answer
        setSelectedAnswer(value);

        if(value == correct_answer && !localCount){
            setLocalCount(true);
            setCount(count + 1);
            // console.log(count);
        }else if(localCount){
            console.log('Go to next question !');
        }else{
            console.log("Wrong Answer !");
        }
    }

  return (
    <div className='flex justify-center items-center mt-10 border-3 border-black dark:border-white rounded-3xl p-10 gap-5'>
        <h1 className='text-2xl font-bold'>{question}</h1>
        <div className='flex gap-5'>
            {['True', 'False'].map((option) => (
                    <button
                        key={option}
                        onClick={() => handleClick(option)}
                        className={`cursor-pointer text-2xl drop-shadow-2xl/25 rounded-3xl p-5 w-50 font-bold
                            ${option === 'True' ? 'bg-green-500 hover:bg-green-400 active:bg-green-300' : 'bg-red-500 hover:bg-red-400 active:bg-red-300'}
                            ${selectedAnswer === option ? 'ring-4 ring-white' : ''}`} // Custom style for selected answer
                    >
                        {option}
                    </button>
                ))}
        </div>
        {/* <div>
            {output && <p>{output}</p>}
        </div> */}
    </div>
  )
}
