import React, { useState } from "react";
import "../assets/style.css";

interface Props {
  question: string;
  options: string[];
  selected: (text: string) => void;
  clear: () => void;
}

export function checkValidUrl(url: string) {
  const regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?|magnet:\?xt=urn:btih:/;
  const validateUrl = regex.test(url);
  return validateUrl;
}

const QuestionBox = ({ question, options, selected, clear }: Props) => {
  const [answer, setAnswer] = useState(options);
  const [indexSelected, setIndex] = useState("");
  return (
    <div className='questionBox'>
      <div className='question'>{question}</div>
      {answer.map((text: string, index: number) => {
        const isUrl = checkValidUrl(text);
        return (
          <button
            key={index}
            disabled={indexSelected === text}
            style={{
              backgroundColor:
                indexSelected === text ? "green" : "rgb(250, 151, 37)",
            }}
            className='answerBtn'
            onClick={() => {
              setAnswer([text]);
              selected(text);
              setIndex(text);
            }}
          >
            {isUrl ? (
              <img src={text} style={{ width: 200, height: 44 }} />
            ) : (
              text
            )}
          </button>
        );
      })}
      {indexSelected && (
        <button
          onClick={() => {
            setAnswer(options);
            clear();
            selected("");
            setIndex("");
          }}
        >
          Limpar
        </button>
      )}
    </div>
  );
};

export default QuestionBox;
