import React from "react";
import PropTypes from "prop-types";
import BattlefieldRow from "../battlefield-row/battlefield-row";
import {connect} from "react-redux";
import {NameSpace} from "../../store/reducers/root";

const Battlefied = ({fieldsData, onMouseOverHandler}) => {
  if (onMouseOverHandler === undefined) {
    debugger;
  }
  return (
    <div className="game__battlefield battlefield" onMouseOver={onMouseOverHandler}>
      {
        Object.keys(fieldsData).map((columnName, i) => <BattlefieldRow
          key={i}
          columnData={fieldsData[columnName]}
          playerType={`player`}
          gameMode={``}
        />)
      }
    </div>
  );
};

Battlefied.propTypes = {
  fieldsData: PropTypes.object.isRequired,
  onMouseOverHandler: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  fieldsData: state[NameSpace.PLAYER_FIELD].playerField
})

export default connect(mapStateToProps)(Battlefied);
