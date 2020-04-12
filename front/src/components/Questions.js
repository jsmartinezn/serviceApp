import React from "react";
import PropTypes from "prop-types";
import Answer from "./Answers.js";

const Questions = (props) => {
  const renderQuestions = () => {
    return props.questions.map((q, i) => (
      <div key={"question " + i}>
        <h2>{q.pregunta}</h2>
        <div>Materia:{q.materia}</div>
        <h3>Respuestas</h3>
        <Answer
          answers={q.respuestas}
          question={q.pregunta}
          id={q._id}
          usuario={props.usuario}
        />
      </div>
    ));
  };
  return <div className="Questions">{renderQuestions()}</div>;
};

Questions.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default Questions;
