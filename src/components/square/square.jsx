import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

const Square = ({fieldData: {id, isShip}}) => {
  const DEFAULT_CLASS = "square battlefield__square";
  const [squareClasses, setSquareClasses] = useState(DEFAULT_CLASS);

  useEffect(() => {
    if (isShip) {
      setSquareClasses(`${DEFAULT_CLASS} ship`);
    }
  }, [isShip, setSquareClasses])

  return (
    <>
      <li key={`squire-${id}`}
        className={squareClasses}
        id={id}
        title={id} >
      </li>
    </>
  );
};

Square.propTypes = {
  fieldData: PropTypes.object.isRequired
};

export default Square;
