import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {NameSpace} from "../../store/reducers/root";
import Battlefield from "../battlefield/battlefield";

const COLUMN_LETTERS = ["", "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
const ROW_NUMBERS = Array(10).fill(null);
const PLAYER_TYPE = `player`;

const UserFiled = ({fieldsData, shipsData}) => {
  const currentShipOnPlace = null;
  const gameMode = ``;
  const lastShot = ``;

  const handleBtnPress = () => { };
  const handleMouseOver = () => { };
  const handleMouseOut = () => { };
  const handleRotate = () => { };
  const handleBattlefieldClick = () => { };
  return (
    <div className="game-board current-board">
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
          playerType={PLAYER_TYPE}
          fieldsData={fieldsData}
          shipsData={shipsData}
          shipOnPlaceData={currentShipOnPlace}
          gameMode={gameMode}
          lastShot={lastShot}

          handleBtnPress={handleBtnPress}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          handleWheelRotate={handleRotate}
          handleBattlefieldClick={handleBattlefieldClick}
        />
      </div>
    </div>
  );
};

UserFiled.propTypes = {
  fieldsData: PropTypes.object.isRequired,
  shipsData: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  fieldsData: state[NameSpace.PLAYER_FIELD].palyerField,
  shipsData: state[NameSpace.PLAYER_SHIPS].playerShips
});

export default connect(mapStateToProps)(UserFiled);
