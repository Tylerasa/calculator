import React, { useContext } from "react";
import { CalculatorContext } from "./calculatorContext";

const History = ({ exp }) => {
  const { currentCal, answerStatus } = useContext(CalculatorContext);
  const [currentValue, setCurrentValue] = currentCal;

  const [showAnswers, setShowAnswers] = answerStatus;

  const handleClick = () => {
    setShowAnswers(!showAnswers);
    setCurrentValue(exp.exp);
  };
  return (
    <div onClick={handleClick} className="history-wrapper">
      {exp.exp} = {exp.answer}
    </div>
  );
};

export default History;
