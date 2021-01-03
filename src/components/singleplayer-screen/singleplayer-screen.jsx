import React from "react";
import {Link} from "react-router-dom";
import {appRoute} from "../../const";
import OpponentField from "../opponent-field/opponent-field";
import UserFiled from "../user-field/user-field";

const SingleplayerScreen = () => {
  return (
    <section className={"seabattle"}>
      <div className="container">
        <header className="header">
          <h1 className="visually--hidden">Морской бой</h1>
          <nav className="nav">
            <Link className="nav__item" to={appRoute.MAIN}>Главное меню</Link>
            <div className="nav__item" to={appRoute.MAIN}>Перезапустить</div>
          </nav>
        </header>
        <main className="main">
          <UserFiled />   
          <OpponentField />
        </main>
      </div>
    </section>
  );
};

export default SingleplayerScreen;