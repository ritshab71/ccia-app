import { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

function Search({ setSearchQuery }) {
  const [query, setQuery] = useState("");
  const [queryOption, setQueryOption] = useState("");

  var selectedQuery = "";

  if (queryOption === 1) {
    selectedQuery = `${query ? `patient_id=${query}` : ""}`;
  } else if (queryOption === 2) {
    selectedQuery = `${query ? `sample_id=${query}` : ""}`;
  } else if (queryOption === 3) {
    selectedQuery = `${query ? `filename=${query}` : ""}`;
  }

  useEffect(() => {
    setSearchQuery(selectedQuery);
  }, [setSearchQuery, selectedQuery]);

  return (
    <form className="search-form">
      <div className="input-form">
        <input
          type="text"
          placeholder="Query"
          className="search-bar"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={queryOption}
          onChange={e => setQueryOption(e.target.value)}
        >
          <MenuItem value={1}>Patient ID</MenuItem>
          <MenuItem value={2}>Sample ID</MenuItem>
          <MenuItem value={3}>FileName</MenuItem>
        </Select>
      </div>
    </form>
  );
}

export default Search;
