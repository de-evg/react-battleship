import React from "react";
import PropTypes from "prop-types";

const Square = ({id}) => {
  const fieldClasses = "square battlefield__square ";
  const shipClass = `ship`;

  return (
    <>
      <li key={`squire-${id}`}
        className={fieldClasses}
        id={id}
        title={id} >
      </li>
    </>
  );
};

Square.propTypes = {
  id: PropTypes.number.isRequired
};

export default Square;
