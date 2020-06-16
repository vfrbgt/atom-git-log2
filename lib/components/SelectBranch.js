"use babel";

import React, { useEffect, useState } from "react";
import Git from "../git/git";

export default function SelectBranch(props) {
  const [branches, setBranches] = useState({ all: [] });
  const onChange = props.onChange || function() {};

  useEffect(() => {
    (async () => {
      setBranches(await Git.getBranches());
    })();
  }, []);

  return (
    <select
      className="github-Project-path input-select col-8"
      id="filterBranch"
      defaultValue=""
      onChange={onChange}
    >
      <option value="">All</option>
      {branches.all.map((branch) => (
        <option key={branch} value={branch}>
          {branch}
        </option>
      ))}
    </select>
  );
}
