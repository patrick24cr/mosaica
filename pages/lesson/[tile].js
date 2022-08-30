import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TopNavigation from '../../components/TopNavigation';
import { useAuth } from '../../utils/context/authContext';
import { getScoresByUid } from '../../api/scores';

export default function Lesson() {
  const { user } = useAuth();
  const router = useRouter();
  const { tile } = router.query;
  const [scores, setScores] = useState({});
  useEffect(() => {
    getScoresByUid(user.uid).then(setScores);
  }, [user.uid]);
  return (
    <div className="container1">
      <TopNavigation />
      <div className="testDiv">
        <p>Lesson: {tile}</p>
        <p>Past score: {scores[tile]}</p>
      </div>
    </div>
  );
}
