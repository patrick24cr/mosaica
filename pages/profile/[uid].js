import React from 'react';
import { useRouter } from 'next/router';
import TopNavigation from '../../components/TopNavigation';
import { resetAllScoresByUid } from '../../api/scores';
import { useAuth } from '../../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const { uid } = router.query;
  return (
    <div className="container1">
      <TopNavigation />
      <div className="testDiv">
        <p>User: {uid}</p>
        <button className="button1" type="button" onClick={() => resetAllScoresByUid(user.uid)}>
          Reset User Scores
        </button>
      </div>
    </div>
  );
}
