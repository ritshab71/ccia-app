import { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const [fileType, setFileType] = useState("");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [refGenome, setRefGenome] = useState("");
  const [option, setOption] = React.useState("");

  const handleChange = event => {
    setOption(event.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!query) {
      alert("Please enter a query.");
      return;
    }

    var selected_query = "";

    if (option === 1) {
      selected_query = `patient_id=${query}`;
    } else if (option === 2) {
      selected_query = `sample_id=${query}`;
    } else {
      selected_query = `filename=${query}`;
    }

    var url =
      "http://20.191.211.229:5000/v1/datafiles?" +
      selected_query +
      `${fileType ? `&filetype=${fileType}` : ""}` +
      `${minSize ? `&minsize=${minSize}` : ""}` +
      `${maxSize ? `&maxsize=${maxSize}` : ""}` +
      `${sampleType ? `&sample_type=${sampleType}` : ""}` +
      `${refGenome ? `&refgenome=${refGenome}` : ""}` +
      "&show_metadata=true";

    onSearch(url);
  };

  return (
    <form className="search-form" onSubmit={onSubmit}>
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
          value={option}
          onChange={handleChange}
        >
          <MenuItem value={1}>Patient ID</MenuItem>
          <MenuItem value={2}>Sample ID</MenuItem>
          <MenuItem value={3}>FileName</MenuItem>
        </Select>
      </div>
      <div className="filter-form">
        <input
          type="text"
          placeholder="File type"
          value={fileType}
          onChange={e => setFileType(e.target.value)}
        />

        <input
          type="text"
          placeholder="Min size"
          value={minSize}
          onChange={e => setMinSize(e.target.value)}
        />

        <input
          type="text"
          placeholder="Max size"
          value={maxSize}
          onChange={e => setMaxSize(e.target.value)}
        />

        <input
          type="text"
          placeholder="Sample type"
          value={sampleType}
          onChange={e => setSampleType(e.target.value)}
        />

        <input
          type="text"
          placeholder="Genome"
          value={refGenome}
          onChange={e => setRefGenome(e.target.value)}
        />
      </div>
      <input type="submit" value="Search" className="btn btn-block" />
    </form>
  );
}

export default Search;
