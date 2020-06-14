"use babel";
import React, { useEffect, useState } from "react";
import crypto from "crypto";
import moment from "moment";
import Git from "./git/git";
import CommitHash from "./components/CommitHash";

export default function () {
  const [commits, setCommits] = useState({});

  useEffect(async () => {
    await Git.detectRepo();
    setCommits(await Git.getCommits());
  }, []);

  function getGravatar(email) {
    return `https://www.gravatar.com/avatar/${crypto
      .createHash("md5")
      .update(email)
      .digest("hex")}?d=robohash`;
  }

  return (
    <div className="github-StagingView-list">
      <ul className="github-RecentCommits-list">
        {commits.all &&
          commits.all.map((commit) => (
            <li
              className="github-RecentCommit"
              key={commit.hash}
              onClick={(e) => {
                if(e.target.dataset.hash) {
                  return;
                }
                atom.workspace.open(
                  `atom-github://commit-detail?workdir=${encodeURIComponent(
                    Git.repo.getWorkingDirectory()
                  )}&sha=${encodeURIComponent(commit.hash)}`
                );
              }}
            >
              <div className="github-CommitDetailView-title">
                <img
                  className="github-RecentCommit-avatar"
                  src={getGravatar(commit.author_email)}
                  title={`${commit.author_name} (${commit.author_email})`}
                  alt={`${commit.author_name} (${commit.author_email})'`}
                />
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
  );
}
