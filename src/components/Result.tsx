import firebase from "firebase";
import React, { useEffect, useState } from "react";
import "../assets/style.css";
import Ranking from "./Ranking";
interface Props {
  score: any;
  playAgain: any;
  maxQuestion: number;
}
export type List = {
  id?: string;
  name: string;
  turma: string;
  score?: number;
  position: number;
  record?: number;
};
const Result = ({ score, playAgain, maxQuestion }: Props) => {
  const [showRanking, setShowRanking] = useState(false);
  const [ranking, setRanking] = useState<List[]>([]);
  const asd = localStorage.getItem("@person");
  const user = JSON.parse(asd!);
  function handleSaveAnswers() {
    firebase
      .firestore()
      .collection("answers")
      .add({ score, maxQuestion, name: user?.name, turma: user?.turma });
    setShowRanking(true);
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection("answers")
      .onSnapshot((snapshot) => {
        const list = snapshot.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        })) as List[];
        const mapRankingPosition: List[] = list
          .sort((a, b) => b.score! - a.score!)
          .filter((position) => position.score !== undefined)
          .map((brutePosition, index) => ({
            name: brutePosition.name,
            position: index + 1,
            record: brutePosition.score,
            turma: brutePosition.turma,
          }));
        setRanking(mapRankingPosition);
      });
  }, [showRanking]);

  return (
    <div className='score-board'>
      {!showRanking ? (
        <>
          <div className='score'>
            Você pontuou {score} / {maxQuestion} respostas corretas!
          </div>
          <button className='playBtn' onClick={handleSaveAnswers}>
            Salvar respostas
          </button>
        </>
      ) : (
        <Ranking ranking={ranking} />
      )}
    </div>
  );
};

export default Result;
