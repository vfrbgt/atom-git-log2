"use babel";
import React from "react";
import crypto from "crypto";

export default function Avatar(props) {
  function getGravatar(email) {
    return `https://www.gravatar.com/avatar/${crypto
      .createHash("md5")
      .update(email)
      .digest("hex")}?d=robohash`;
  }

  return (
    <img
      className="github-RecentCommit-avatar"
      src={getGravatar(props.commit.author_email)}
      title={`${props.commit.author_name} (${props.commit.author_email})`}
      alt={`${props.commit.author_name} (${props.commit.author_email})'`}
    />
  );
}
