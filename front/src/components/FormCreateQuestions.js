import React from "react";
import PropTypes from "prop-types";

const CreateQuestions = (props) => {
  return (
    <form action="/registroPregunta" method="post">
      <div>
        <div>Username: {props.username}</div>
        <br />
      </div>
      <div>
        <label>Materia:</label>
        <input type="text" name="materia" />
      </div>
      <div>
        <label>Pregunta:</label>
        <input type="text" name="pregunta" />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

CreateQuestions.propTypes = {
  username: PropTypes.string.isRequired,
};

export default CreateQuestions;
