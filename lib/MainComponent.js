"use babel";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Git from "./git/git";
import CommitHash from "./components/CommitHash";
import SelectBranch from "./components/SelectBranch";
import Avatar from "./components/Avatar";

export default function () {
  const [commits, setCommits] = useState({});
  const [offset, setOffset] = useState(0);
  const [branch, setBranch] = useState("");
  const limit = 50;

  useEffect(() => {
    (async () => {
      setCommits(await Git.getCommits(offset, limit, { branch }));
    })();
  }, [offset, branch]);

  async function loadNext() {
    setCommits(await Git.getCommits(offset + limit, limit, { branch }));
    setOffset(offset + limit);
  }

  async function loadPrev() {
    if (offset === 0) {
      return;
    }
    setCommits(await Git.getCommits(offset - limit, limit, { branch }));
    setOffset(offset - limit);
  }

  async function filter(e) {
    setBranch(e.currentTarget.value);
    setOffset(0);
  }

  async function refresh() {
    setCommits(await Git.getCommits(offset, limit, { branch }));
  }

  function showCommit(e) {
    if (e.target.dataset.hash) {
      return;
    }
    atom.workspace.open(
      `atom-github://commit-detail?workdir=${encodeURIComponent(
        Git.repo.getWorkingDirectory(),
      )}&sha=${encodeURIComponent(e.target.dataset.hash)}`,
    );
  }

  console.log(commits);

  return (
    <div className="github-StagingView-list">
      <div className="row col-12">
        <button
          style={{ margin: "10px" }}
          className="btn btn-primary icon icon-octoface col-2"
          onClick={refresh}
        >
          Refresh
        </button>
        <label htmlFor="filterBranch" className="col-form-label col-2">
          Show branch:
        </label>
        <SelectBranch onChange={filter} />
      </div>
      <div className="wrapper-commits-list">
        <ul className="github-RecentCommits-list">
          {commits.all &&
            commits.all.map((commit) => (
              <li
                className="github-RecentCommit"
                key={commit.hash}
                hash={commit.hash}
                onClick={showCommit}
              >
                <div className="github-CommitDetailView-title">
                  <Avatar commit={commit} />
                  <span>{commit.message}</span>
                </div>
                <span className="github-CommitDetailView-metaText">{commit.refs}</span>
                <span className="github-CommitDetailView-metaText">
                  {moment(commit.date).format("DD MM YYYY hh:mm:ss")}
                </span>
                <CommitHash hash={commit.hash} />
              </li>
            ))}
        </ul>
      </div>
      <div className="footer">
        <button
          style={{ margin: "10px" }}
          className="btn btn-primary icon icon-arrow-left"
          onClick={loadPrev}
        >
          Prev
        </button>
        <button
          style={{ margin: "10px" }}
          className="btn btn-primary icon icon-arrow-right"
          onClick={loadNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
