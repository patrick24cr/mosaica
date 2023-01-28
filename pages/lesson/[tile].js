import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getQuestionsByTile from '../../api/questions';
import Lesson from '../../components/Lesson';
import Loading from '../../components/Loading';

export default function LessonLoader() {
  const [questions, setQuestions] = useState([null]);
  const router = useRouter();
  const { tile } = router.query;
  const tileNumbers = ['a1', 'a2', 'a3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'b5', 'c1', 'c2', 'c3', 'c4', 'c5', 'd1', 'd2', 'd3', 'd4', 'd5', 'e1', 'e2', 'e3', 'e4', 'e5'];

  useEffect(() => {
    getQuestionsByTile(tileNumbers.indexOf(tile) + 1).then(setQuestions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tile]);
  return (
    <>
      <div className="container">{questions.length < 2 ? <Loading /> : <Lesson questions={questions} />}</div>
    </>
  );
}
