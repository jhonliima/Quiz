import firebase from "firebase";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import "./assets/style.css";
import Loading from "./components/Loading";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import "./config";
interface Questions {
  question: string;
  answers: string[];
  id: string;
  correct: string;
}

type Turma = {
  name: string;
  turma: string;
};

function App() {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [score, setScore] = useState(0);
  const [responses, setResponses] = useState(0);
  const [name, setName] = useState("");
  const [turma, setTurma] = useState("");
  const [user, setUser] = useState<Turma | undefined>();

  function afterOpenModal() {
    if (name !== "" && turma !== "") {
      localStorage.setItem("@person", JSON.stringify({ name, turma }));
    }
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection("questions")
      .onSnapshot((snapshot) => {
        const questions = snapshot.docs.map((item) => ({
          ...item.data(),
        })) as Questions[];
        setQuestions(questions);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  }, []);

  const isOpen = useMemo(() => {
    const userLocal = localStorage.getItem("@person");
    //@ts-ignore
    setUser(JSON.parse(userLocal));
    console.log(userLocal);
    return userLocal ? false : true;
  }, [loading]);

  function selected(answer: string, correct: string) {
    if (answer === correct) {
      setScore(score + 1);
    }

    if (answer !== "") {
      const response =
        responses < questions.length ? responses + 1 : questions.length;
      setResponses(response);
    }
  }
  if (loading) return <Loading />;

  return (
    <div>
      <div className='title'> Bem-vindo {user?.name}</div>
      <div style={{ paddingTop: 90 }}>
        {questions.length > 0 &&
          responses < questions.length &&
          questions.map(({ answers, id, question, correct }, index) => (
            <QuestionBox
              selected={(answer: string) => {
                selected(answer, correct);
              }}
              key={index}
              options={answers}
              question={question}
              clear={() => {
                setResponses(responses - 1);
              }}
            />
          ))}
        {responses === questions.length && !loading && (
          <Result
            maxQuestion={questions.length}
            score={score}
            playAgain={() => window.location.reload()}
          />
        )}
      </div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 style={{ textAlign: "center" }}>BEM VINDO</h2>
        <h2 style={{ textAlign: "center" }}>
          PARA ACESSAR AS PERGUNTAS PRECISA PREENCHER
        </h2>

        <form
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <label style={{ marginBottom: 10 }}>Nome completo</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Nome'
            style={{ width: "100%" }}
          />
          <label style={{ marginBottom: 10 }}>Turma</label>
          <input
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            style={{ width: "40%" }}
            placeholder='Turma'
          />
          <button onClick={afterOpenModal} style={{ margin: 10 }}>
            Entrar
          </button>
        </form>
      </Modal>
    </div>
  );
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",

    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default App;
