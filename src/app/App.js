import React, { Component } from "react";
import classnames from "classnames";

import logo from "./../logo.svg";
import Styles from "./App.scss";
import CommonStyles from "./common/styles.scss";

class App extends Component {
  render() {
    return (
      <div className={Styles["App"]}>
        <header className={Styles["App-header"]}>
          <img src={logo} className={Styles["App-logo"]} alt="logo" />
          <h1 className={Styles["App-title"]}>Welcome to React</h1>
        </header>
        <p className={Styles["App-intro"]}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <br />
        <button
          className={classnames({
            [CommonStyles["button"]]: true,
            [CommonStyles["is-primary"]]: true,
            [CommonStyles["is-outlined"]]: true
          })}
        >
          Super button
        </button>
      </div>
    );
  }
}

export default App;
