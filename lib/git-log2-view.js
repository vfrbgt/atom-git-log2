"use babel";
import Git from "./git/git";
import React from "react";
import ReactDOM from 'react-dom';
import MainComponent from "./MainComponent";

export default class GitLog2View extends React.Component {
  constructor(serializedState) {
    super(serializedState);
    this.element = document.createElement("div");
    this.element.classList.add("git-log2");

    const message = document.createElement("div");
    message.textContent = "The GitLog2 package is Alive! It's ALIVE! (no)";
    const e = React.createElement;
    ReactDOM.render(e(MainComponent), this.element);
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getTitle() {
    return `Git log 2: ${Git.repoName}`;
  }
}
