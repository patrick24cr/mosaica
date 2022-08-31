// import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TopNavigation from '../../components/TopNavigation';
// import { useAuth } from '../../utils/context/authContext';
// import {
//   createScore, getScoreFirebaseKeysByUid, getScoresByUid, updateScoreByFirebaseKey,
// } from '../../api/scores';
import questions from '../../sampleData/questions.json';

// const initialState = {
//   score: '',
// };

export default function Lesson() {
  // const { user } = useAuth();
  const router = useRouter();
  const { tile } = router.query;
  // const [scores, setScores] = useState({});
  // const [firebaseKeys, setFirebaseKeys] = useState({});
  // const [formInput, setFormInput] = useState(initialState);
  const questionNumber = 5;
  // useEffect(() => {
  //   getScoresByUid(user.uid).then(setScores);
  //   getScoreFirebaseKeysByUid(user.uid).then(setFirebaseKeys);
  // }, [user.uid]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormInput((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (scores[tile]) {
  //     const payload = {
  //       score: Math.ceil((parseInt(scores[tile], 10) + parseInt(formInput.score, 10)) / 2),
  //     };
  //     updateScoreByFirebaseKey(firebaseKeys[tile], payload).then(() => router.push('/'));
  //   } else {
  //     const payload = {
  //       tile,
  //       uid: user.uid,
  //       score: Math.ceil((parseInt(formInput.score, 10)) / 2),
  //     };
  //     createScore(payload).then(() => router.push('/'));
  //   }
  // };

  const handleSelect = (e) => {
    const [column, word] = e.target.id.split('--');
    console.warn(column, word);
    const wordElement = document.getElementById(e.target.id);
    wordElement.classList.add('responseButtonSelected');
  };

  return (
    <div className="container1">
      <TopNavigation />
      <div className="quizContainer">
        <div className="questionCounter">Lesson: {tile}<br />Question: {questionNumber + 1} / {questions.length}</div>
        <div className="prompt">{questions[questionNumber].english}</div>
        {/* <div className="constructedSpanish">{questions[questionNumber].spanish}</div> */}
        <div className="responseContainer">
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
      </div>
    </div>
  );
}
