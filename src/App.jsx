import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css";
// import './App.css'

import React from 'react'
import { Question } from './components/Question';
import { Atom, BlinkBlur, Mosaic } from 'react-loading-indicators';

const API_BASE_URL = "https://opentdb.com/api.php";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(null);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}?amount=10&category=18&difficulty=easy&type=boolean`);
      const data = await response.json();
      // console.log(data.results);
      const quiz = data.results;

      if(!response.ok){
        console.log(response.status);
        throw new Error('too many Requests, try after some time..');
      }
      // console.log(quiz);
      if(quiz.length > 0){
        setQuestions(quiz);
      }else{
        throw new Error('fetching questions failed !, try again later');
      }
      // console.log(results);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }finally{
      setIsLoading(false);
    }
  }

  const handleClick = () => {
    window.scrollTo({ top : 0, behavior : "smooth"});
    setResult(count);
  }

  return (
    <main className='dark:text-white dark:bg-black bg-white'>
      <div className='flex flex-col justify-center items-center gap-2 mt-10'>
        <h1 className='text-5xl font-bold'>Experience The <span className='trivia text-7xl ml-4 font-bold'>Trivia</span></h1>
        <button onClick={() => fetchQuestions()} className='dark:bg-white dark:text-black dark:hover:bg-amber-50 bg-black w-25 p-2 text-white rounded-2xl cursor-pointer shadow-xl/25 transition-all duration-150 ease-in-out hover:bg-midnight active:translate-y-1 active:drop-shadow-xl/50'>
          Start
        </button>
      </div>

      <div>
        {
          result && questions.length > 0 && <p className='text-center my-5 text-4xl font-bold'>Result : {result} / {questions.length}</p>
        }
          {errorMessage && (<p className='text-red-500 font-bold'>{errorMessage}</p>)}
        {
          questions.length > 0 ?
            (
              questions.map((quest, ind) => (
                <Question key={ind} quest={quest} count={count} setCount={setCount}/>
              ))
            ):(
              <div className='flex justify-center mt-5'>
              {isLoading && <BlinkBlur className="mosaic" color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />}
              </div>
            )
        }
        { questions.length > 0 && (
          <div className='flex justify-center items-center mt-5'>
            <button onClick={() => handleClick()} className='dark:bg-white dark:text-black p-3 rounded-3xl cursor-pointer w-50 text-2xl items'>Submit</button>
          </div>
        )}
      </div>
    </main>
  )
}
