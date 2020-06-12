"use babel";
import { BufferedProcess } from "atom";
import SimpleGit from "simple-git";

class Git {
  constructor() {
    this.repo = null;
    this.gitInstance = null;
  }

  async detectRepo() {
    let repositorys = await Promise.all(
      atom.project
        .getDirectories()
        .map(atom.project.repositoryForDirectory.bind(atom.project))
    );
    if (repositorys[0]) {
      this.repoName = repositorys[0]
        .getWorkingDirectory()
        .match(/([^\/]*)\/*$/)[1];
      this.repo = repositorys[0];
      this.gitInstance = SimpleGit(this.repo.getWorkingDirectory());
      await this.gitInstance.init();
      return;
    }
    throw new Error("This project have not repository!");
  }

  async getCommits() {
    return new Promise((res, rej) => {
      this.gitInstance.log(["--all"], (err, result) => {
        if (err) {
          rej(err);
          return;
        }
        res(result);
      });
    });
  }
}

export default new Git();
