"use babel";
import SimpleGit from "simple-git";

class Git {
  constructor() {
    this.repo = null;
    this.gitInstance = null;
    this.detectRepo();
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

  async getCommits(offset = 0, limit = 50) {
    return new Promise((res, rej) => {
      this.gitInstance.log(
        ["--all", `--max-count=${limit}`, `--skip=${offset}`],
        (err, result) => {
          if (err) {
            rej(err);
            return;
          }
          res(result);
        }
      );
    });
  }

  async getBranches() {
    if(this.gitInstance === null) {
      await this.detectRepo();
    }

    return new Promise((res, rej) => {
      this.gitInstance.branch((err, result) => {
        if (err) {
          rej(err);
          return;
        }
        console.log(result);
        res(result);
      });
    });
  }
}

export default new Git();
