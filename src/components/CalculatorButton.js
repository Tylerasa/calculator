import React, { useContext, useState } from "react";
import { CalculatorContext } from "./calculatorContext";

const CalculatorButton = ({ button }) => {
  const { currentCal, history, answerStatus } = useContext(CalculatorContext);
  const [currentValue, setCurrentValue] = currentCal;
  const [answers, setAnswers] = history;
  const [showAnswers, setShowAnswers] = answerStatus;
  const [checkBracket, setCheckBracket] = useState(false);
  const handleClick = () => {
    var result;
    switch (button) {
      case "=":
        result = eval(currentValue);
        setCurrentValue(parseFloat(result).toFixed(4));
        setAnswers([
          ...answers,
          {
            exp: currentValue,
            answer: result
          }
        ]);
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
      case "()":
        if (
          isNaN(currentValue.substr(currentValue.length - 1))||
          currentValue.length === 0
        ) {
          setCurrentValue(currentValue.concat("("));
        } else {
          setCurrentValue(currentValue.concat(")"));
        }
        setCheckBracket(!checkBracket);
        break;
      default:
        setCurrentValue(currentValue.concat(button));
        break;
    }
  };

  return (
    <div onClick={handleClick} className="button">
      {button}
    </div>
  );
};

export default CalculatorButton;
