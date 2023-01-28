import { useEffect, useState } from 'react';
import getQuestionsByTile from '../../api/questions';
import Lesson from '../../components/Lesson';
import Loading from '../../components/Loading';

export default function LessonLoader() {
  const [questions, setQuestions] = useState([null]);
  const tile = 1;

  useEffect(() => {
    getQuestionsByTile(tile).then(setQuestions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tile]);
  return (
    <>
      <div className="container">{questions.length < 2 ? <Loading /> : <Lesson questions={questions} />}</div>
    </>
  );
}
