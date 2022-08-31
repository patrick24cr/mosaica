import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TopNavigation from '../../components/TopNavigation';
import { useAuth } from '../../utils/context/authContext';
import {
  createScore, getScoreFirebaseKeysByUid, getScoresByUid, updateScoreByFirebaseKey,
} from '../../api/scores';
import questions from '../../sampleData/questions.json';

const initialState = {
  score: '',
};

export default function Lesson() {
  const { user } = useAuth();
  const router = useRouter();
  const { tile } = router.query;
  const [scores, setScores] = useState({});
  const [firebaseKeys, setFirebaseKeys] = useState({});
  const [formInput, setFormInput] = useState(initialState);
  const questionNumber = 0;
  useEffect(() => {
    getScoresByUid(user.uid).then(setScores);
    getScoreFirebaseKeysByUid(user.uid).then(setFirebaseKeys);
  }, [user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (scores[tile]) {
      const payload = {
        score: Math.ceil((parseInt(scores[tile], 10) + parseInt(formInput.score, 10)) / 2),
      };
      updateScoreByFirebaseKey(firebaseKeys[tile], payload).then(() => router.push('/'));
    } else {
      const payload = {
        tile,
        uid: user.uid,
        score: Math.ceil((parseInt(formInput.score, 10)) / 2),
      };
      createScore(payload).then(() => router.push('/'));
    }
  };

  return (
    <div className="container1">
      <TopNavigation />
      <div className="quizContainer">
        <div className="prompt">{questions[questionNumber].english}</div>
        <div className="constructedSpanish">{questions[questionNumber].spanish}</div>
        <div className="responseContainer">
          <div className="responseGroup">
            <div className="response">
              {questions[questionNumber].responses[0][0]}
            </div>
            <div className="response">
              {questions[questionNumber].responses[0][1]}
            </div>
            <div className="response">
              {questions[questionNumber].responses[0][2]}
            </div>
            <div className="response">
              {questions[questionNumber].responses[0][3]}
            </div>
          </div>
          <div className="responseGroup">
            <div className="response">
              {questions[questionNumber].responses[1][0]}
            </div>
            <div className="response">
              {questions[questionNumber].responses[1][1]}
            </div>
            <div className="response">
              {questions[questionNumber].responses[1][2]}
            </div>
            <div className="response">
              {questions[questionNumber].responses[1][3]}
            </div>
          </div>
          <div className="responseGroup">
            <div className="response">
              {questions[questionNumber].responses[2][0]}
            </div>
            <div className="response">
              {questions[questionNumber].responses[2][1]}
            </div>
            <div className="response">
              {questions[questionNumber].responses[2][2]}
            </div>
            <div className="response">
              {questions[questionNumber].responses[2][3]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
