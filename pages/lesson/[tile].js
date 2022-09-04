// import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TopNavigation from '../../components/TopNavigation';
import { useAuth } from '../../utils/context/authContext';
import {
  createScore, getScoreFirebaseKeysByUid, getScoresByUid, updateScoreByFirebaseKey,
} from '../../api/scores';
import questions from '../../sampleData/questions.json';

// const initialState = {
//   score: '',
// };

export default function Lesson() {
  const { user } = useAuth();
  const router = useRouter();
  const { tile } = router.query;
  const [questionNumber, setQuestionNumber] = useState(0);
  const selectedResponses = {};
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [scores, setScores] = useState({});
  const [firebaseKeys, setFirebaseKeys] = useState({});
  let responseTimer = {};
  // const [formInput, setFormInput] = useState(initialState);
  useEffect(() => {
    getScoresByUid(user.uid).then(setScores);
    getScoreFirebaseKeysByUid(user.uid).then(setFirebaseKeys);
  }, [user.uid]);

  const calculateAndWriteScore = () => {
    if (scores[tile]) {
      const payload = {
        score: Math.ceil((parseInt(scores[tile], 10) + parseInt(numberCorrect, 10)) / 2),
      };
      updateScoreByFirebaseKey(firebaseKeys[tile], payload).then(() => router.push('/'));
    } else {
      const payload = {
        tile,
        uid: user.uid,
        score: Math.ceil((parseInt(numberCorrect, 10)) / 2),
      };
      createScore(payload).then(() => router.push('/'));
    }
  };

  const showReport = () => {
    document.getElementById('quizContainer').classList.add('displayNone');
    document.getElementById('reportContainer').classList.remove('displayNone');
  };

  const advanceToNextQuestion = () => {
    const nextQuestionTasks = () => {
      if (questionNumber === questions.length - 1) {
        showReport();
        return;
      }
      setQuestionNumber(questionNumber + 1);
      document.getElementById('afterQuestionButtons').classList.add('hiddenLessonElement');
      document.getElementById('responseContainer').classList.remove('disabledLessonElement');
      setTimeout(document.getElementById('quizContainer').classList.remove('quizContainerFaded'), 500);
    };
    document.getElementById('constructedSpanish').classList.add('hiddenLessonElement');
    document.getElementById('quizContainer').classList.add('quizContainerFaded');
    setTimeout(nextQuestionTasks, 500);
  };

  const updateResponseHighlights = () => {
    const responsesToUnhighlight = [];
    Object.keys(questions[questionNumber].responses).map((key, index) => (
      questions[questionNumber].responses[key].map((item, index2) => (
        responsesToUnhighlight.push(`${index}--${index2}`)
      ))
    ));
    responsesToUnhighlight.map((ID) => document.getElementById(ID).classList.remove('responseButtonSelected'));

    const responsesToHighlight = [];
    Object.keys(selectedResponses).map((key) => (
      responsesToHighlight.push(`${key}--${selectedResponses[key]}`)
    ));
    responsesToHighlight.map((ID) => document.getElementById(ID).classList.add('responseButtonSelected'));
  };

  const isResponseComplete = () => {
    if (Object.keys(questions[questionNumber].correct).length === Object.keys(selectedResponses).length) {
      return true;
    }
    return false;
  };

  const checkAnswerDisplayCorrection = () => {
    clearInterval(responseTimer);
    const isCorrect = Object.keys(questions[questionNumber].correct).every(
      (key) => Object.prototype.hasOwnProperty.call(selectedResponses, key)
                  && questions[questionNumber].correct[key] === selectedResponses[key],
    );

    const wrongResponses = [];
    Object.keys(questions[questionNumber].correct).forEach(
      (key) => {
        if (!(Object.prototype.hasOwnProperty.call(selectedResponses, key)
        && questions[questionNumber].correct[key] === selectedResponses[key])) {
          wrongResponses.push(`${key}--${selectedResponses[key]}`);
        }
      },
    );

    const responsesToCircle = [];
    Object.keys(questions[questionNumber].correct).map((key) => (
      responsesToCircle.push(`${key}--${questions[questionNumber].correct[key]}`)
    ));
    responsesToCircle.map((ID) => document.getElementById(ID).classList.add('responseButtonCorrect'));

    document.getElementById('constructedSpanish').classList.remove('hiddenLessonElement');
    document.getElementById('afterQuestionButtons').classList.remove('hiddenLessonElement');
    document.getElementById('responseContainer').classList.add('disabledLessonElement');
    wrongResponses.forEach((ID) => document.getElementById(ID)?.classList.add('responseButtonWrong'));
    if (isCorrect) {
      setNumberCorrect(numberCorrect + 1);
    }
  };

  const handleSelect = (e) => {
    const [column, word] = e.target.id.split('--');
    selectedResponses[column] = word;
    updateResponseHighlights();
    if (isResponseComplete()) {
      checkAnswerDisplayCorrection();
    }
  };

  useEffect(() => {
    const progressBar = document.getElementById('progressBar');
    let timeElapsed = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    responseTimer = setInterval(() => {
      if (timeElapsed < 6) {
        timeElapsed += 1;
        console.warn(timeElapsed);
      } else {
        clearInterval(responseTimer);
        checkAnswerDisplayCorrection();
      }
      switch (timeElapsed) {
        case (1):
          progressBar.classList = '';
          progressBar.classList.add('progressBar');
          progressBar.classList.add('progressBar0');
          break;
        case (2):
          progressBar.classList.remove('progressBar0');
          progressBar.classList.add('progressBar1');
          break;
        case (3):
          progressBar.classList.remove('progressBar1');
          progressBar.classList.add('progressBar2');
          break;
        case (4):
          progressBar.classList.remove('progressBar2');
          progressBar.classList.add('progressBar3');
          break;
        case (5):
          progressBar.classList.remove('progressBar3');
          progressBar.classList.add('progressBar4');
          break;
        case (6):
          progressBar.classList.remove('progressBar4');
          progressBar.classList.add('progressBar5');
          break;
        default:
          // code block
      }
    }, 1000);
    return () => clearInterval(responseTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionNumber]);

  return (
    <div className="container1">
      <TopNavigation />
      <div className="quizContainer" id="quizContainer">
        <div className="questionCounter">Lesson: {tile}<br />Question: {questionNumber + 1} / {questions.length}</div>
        <div className="prompt">{questions[questionNumber].english}</div>
        <div className="constructedSpanish hiddenLessonElement" id="constructedSpanish">
          {questions[questionNumber].spanish}
        </div>
        <div className="progressBar progressBar5" id="progressBar" />
        <div className="lessonButtonContainer">
          <div className="responseContainer" id="responseContainer">
            {Object.keys(questions[questionNumber].responses).map((column, columnIndex) => (
              <div className="responseGroup" key={column}>
                {questions[questionNumber].responses[column].map((word, wordIndex) => (
                  <button type="button" className="responseButton" key={word} id={`${columnIndex}--${wordIndex}`} onClick={(e) => handleSelect(e)}>
                    {word}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="afterQuestionButtons hiddenLessonElement" id="afterQuestionButtons">
            <button type="button" className="genericLessonButton" onClick={() => advanceToNextQuestion()}>
              Next Question
            </button>
            <button type="button" className="genericLessonButton" onClick={(e) => console.warn(e)}>
              Report Question
            </button>
          </div>
        </div>
      </div>
      <div className="reportContainer displayNone" id="reportContainer">
        Number correct: {numberCorrect} <br />
        <button type="button" className="genericLessonButton" onClick={() => calculateAndWriteScore()}>
          Write to database
        </button>
      </div>
    </div>
  );
}
