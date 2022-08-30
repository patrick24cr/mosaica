// import { signOut } from '../utils/auth';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getScoresByUid } from '../api/scores';
import TopNavigation from '../components/TopNavigation';
import GridInteractable from '../components/GridInteractable';
import BottomParameters from '../components/BottomParameters';

function Home() {
  const { user } = useAuth();
  const [scores, setScores] = useState({});
  const [selected, setSelected] = useState('initial');
  useEffect(() => {
    getScoresByUid(user.uid).then(setScores);
  }, [user.uid]);

  return (
    <div className="container1">
      <TopNavigation />
      <GridInteractable scores={scores} selected={selected} setSelected={setSelected} />
      <BottomParameters selected={selected} />
    </div>
  );
}

export default Home;
