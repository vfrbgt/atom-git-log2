"use babel";
import { BufferedProcess } from "atom";

export default class GitLog2View {
  constructor(serializedState) {
    // Create root element
    this.element = document.createElement("div");
    this.element.classList.add("git-log2");

    const message = document.createElement("div");
    message.textContent = "The GitLog2 package is Alive! It's ALIVE!";
    message.classList.add("message");
    this.element.appendChild(message);
  }

  initialize() {
    return new BufferedProcess({
      command: "git",
      args: args,
      options: options,
      stdout: concat,
      stderr: function (data) {
        console.log(data.toString());
      },
      exit: display_log,
    });
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getTitle() {
    return "Git log 2";
  }

  getElement() {
    return this.element;
  }
}
