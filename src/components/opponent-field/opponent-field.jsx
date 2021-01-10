import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {NameSpace} from "../../store/reducers/root";
import Battlefield from "../battlefield/battlefield";

const COLUMN_LETTERS = ["", "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
const ROW_NUMBERS = Array(10).fill(null);

const OpponentField = ({fieldsData}) => {
  return (
    <div className="game-board">
      <div className="game" >
        <ul className="game__column-name">
          {
            COLUMN_LETTERS.map((letter, i) => <li key={i} className={"square"}>{letter}</li>)
          }
        </ul>
        <ul className="game__row-name">
          {
            ROW_NUMBERS.map((item, i) => <li key={i} className={"square"}>{i + 1}</li>)
          }
        </ul>
        <Battlefield
          playerType={``}
          isPlayerMove={``}
          onMouseOverHandler={() => {}}
          handlePlayerMove={() => {}}
          handleMoveClick={() => {}}
        />
      </div>
    </div>
  );
};

OpponentField.propTypes = {
  fieldsData: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  fieldsData: state[NameSpace.OPPONENT_FIELD].opponentField
});

export default connect(mapStateToProps)(OpponentField);
