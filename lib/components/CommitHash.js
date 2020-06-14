"use babel";
import React from "react";

export default function (props) {
  function copyHash(e) {
    e.preventDefault();
    atom.clipboard.write(e.currentTarget.dataset.hash);
    atom.notifications.addSuccess("Commit hash copy to clipboard");
  }

  return (
    <span
      className="github-CommitDetailView-sha gitlog2-hash"
      onClick={copyHash}
      data-hash={props.hash}
      title="Copy to clipboard"
    >
      {props.hash}
    </span>
  );
}
