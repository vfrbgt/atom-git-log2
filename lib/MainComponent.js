"use babel";
import React, { useEffect, useState } from "react";
import Git from "./git/git";

export default function () {
  const [commits, setCommits] = useState({});

  useEffect(async () => {
    await Git.detectRepo();
    setCommits(await Git.getCommits());
  }, []);

  return (
    <div className="github-StagingView-list">
      <ul className="github-RecentCommits-list">
        {commits.all &&
          commits.all.map((commit) => (
            <li
              className="github-RecentCommit most-recent"
              key={commit.hash}
              onClick={(e) => {
                atom.workspace.open(
                  `atom-github://commit-detail?workdir=${encodeURIComponent(
                    Git.repo.getWorkingDirectory()
                  )}&sha=${encodeURIComponent(commit.hash)}`
                );
              }}
            >{`${commit.message} - ${commit.author_name} (${commit.author_email}) ${commit.date} ${commit.hash} ${commit.refs}`}</li>
          ))}
      </ul>
    </div>
  );
}
