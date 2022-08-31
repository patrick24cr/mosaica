import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TopNavigation from '../../components/TopNavigation';
import { useAuth } from '../../utils/context/authContext';
import {
  createScore, getScoreFirebaseKeysByUid, getScoresByUid, updateScoreByFirebaseKey,
} from '../../api/scores';

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
      <div className="testDiv">
        <p>Lesson: {tile}</p>
        <p>Past score: {scores[tile] ? scores[tile] : 'no score yet'}</p>
        <form onSubmit={handleSubmit}>
          <input type="text" id="score" placeholder="Current score" name="score" value={formInput.score} onChange={handleChange} required /> <br /><br />
          <button type="submit" className="button1">
            Average and Update Score
          </button>
        </form>
      </div>
    </div>
  );
}
