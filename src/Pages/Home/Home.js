import React, { useState, useCallback, useEffect, useMemo } from "react";
import CalculatorButton from "../../components/CalculatorButton";
import { CalculatorContext } from "../../components/calculatorContext";
import History from "../../components/History";
const Home = () => {
  const buttons = useMemo(
    () => [
      "AC",
      "()",
      "ANS",
      "/",
      "7",
      "8",
      "9",
      "*",
      "4",
      "5",
      "6",
      "-",
      "1",
      "2",
      "3",
      "+",
      "0",
      ".",
      "DELETE",
      "="
    ],
    []
  );
  const [currentValue, setCurrentValue] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const typeButton = useCallback(
    event => {
      if (buttons.includes(event.key.toUpperCase())) {
        switch (event.key) {
          case "=":
            break;
          case "AC":
            setCurrentValue("");
            break;
          case "DELETE":
            setCurrentValue(currentValue.slice(0, -1));
            break;
          case "ANS":
            setShowAnswers(!showAnswers);
            break;
          default:
            setCurrentValue(currentValue => currentValue.concat(event.key));
            break;
        }
      } else if (event.key === "Enter") {
        let result;
        result = eval(currentValue);
        setCurrentValue(result.toString());
        setAnswers([
          ...answers,
          {
            exp: currentValue,
            answer: result
          }
        ]);
      }
    },
    [answers, buttons, currentValue, showAnswers]
  );

  useEffect(
    () => {
      document.addEventListener("keydown", typeButton, false);
      return () => {
        document.removeEventListener("keydown", typeButton, false);
      };
    },
    [typeButton]
  );

  return (
    <CalculatorContext.Provider
      value={{
        currentCal: [currentValue, setCurrentValue],
        history: [answers, setAnswers],
        answerStatus: [showAnswers, setShowAnswers]
      }}
    >
      <div className="calculator-wrapper">
        <div className="screen">
          <span className="screen-text">
            {!showAnswers && currentValue}
          </span>
          {showAnswers && <p className="history-text">history</p>}
          {showAnswers &&
            answers.map((ele, j) => {
              return <History key={j} exp={ele} />;
            })}
        </div>
        <div className="buttons">
          {buttons.map((ele, i) => {
            return <CalculatorButton button={ele} key={i} />;
          })}
        </div>
      </div>
    </CalculatorContext.Provider>
  );
};

export default Home;
