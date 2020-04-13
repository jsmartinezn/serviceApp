import PropTypes from "prop-types";
import React from "react";

const Answers = (props) => {
  const renderAnswers = () =>
    props.answers.map((a) => (
      <div
        className="respuestas"
        key={"answer " + a.respuesta + props.question}
      >
        <div className="container">
          <div>{a.usuario}</div>

          <div>Respuesta: {a.respuesta}</div>
        </div>
        <br />
      </div>
    ));
  const ruta = `/registroRespuesta/${props.id} `;
  return (
    <div className="Answers">
      <form action={ruta} method="post">
        {renderAnswers()}
        {!props.usuario ? (
          <div>Inicia sesión para responder</div>
        ) : (
          <div>
            <div>
              <label>Añadir respuesta:</label>
              <input type="text" name="respuesta" required />
            </div>

            <div>
              <button type="submit" className="btn btn-primary">
                Responder
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Answers;
