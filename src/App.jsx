import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Landing from './components/Landing'
import Quiz from './components/Quiz'
import QuizSetup from './components/QuizSetup'
import Result from './components/Result'
import Navbar from './components/Navbar'

function App() {
  const [started, setStarted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizConfig, setQuizConfig] = useState(null);

  if(!started){
    return <><Navbar onGetStarted={() => setStarted(true)} /><Landing onGetStarted={() => setStarted(true)}/></>;
  }

  if( !quizStarted ){
    return(
      <><Navbar onGetStarted={() => setStarted(true)} /><QuizSetup 
        onStart={(config) => {
          setQuizConfig(config);
          setQuizStarted(true);
        }} 
      /></>
    ); 
  }

  if(quizFinished){
    return(
      <><Navbar onGetStarted={() => setStarted(true)} /><Result
        score={finalScore}
        total={totalQuestions}
        onRestart={() => {
          setStarted(false);
          setQuizStarted(false);
          setQuizFinished(false);
        }}
      /></>
    );
  }

  return(
    <><Navbar onGetStarted={() => setStarted(true)} /><Quiz
      config={quizConfig}
      onFinish={(score, total) => {
        setFinalScore(score);
        setTotalQuestions(total);
        setQuizFinished(true);
      }}
    /></>
  );
}

export default App
