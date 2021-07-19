import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";
import React from "react";

function Search({ setQuery }) {
  const [queryInput, setQueryInput] = useState("");
  const [queryOption, setQueryOption] = useState("");

  const [allPatients, setAllPatients] = useState([]);
  const [allSamples, setAllSamples] = useState([]);
  const [allFilenames, setAllFilenames] = useState([]);
  const [allData, setAllData] = useState([]);

  const [clickSearch, setClickSearch] = useState(false);

  const [errorQuery, setErrorQuery] = useState("none");
  const [errorOption, setErrorOption] = useState("none");

  useEffect(() => {
    fetch("http://20.191.211.229:5000/v1/datafiles?show_metadata=true", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        res.map(data => {
          setAllPatients(allPatients => [
            ...allPatients,
            data._metadata.patient_id
          ]);
          setAllSamples(allSamples => [
            ...allSamples,
            data._metadata.sample_id
          ]);
          setAllFilenames(allFilenames => [...allFilenames, data.filename]);
        });
      });
  }, []);

  function setQueryAutocomplete(e) {
    setQueryOption(e.target.value);

    if (e.target.value !== queryOption) {
      setQueryInput("");
    }

    if (e.target.value === "patient_id") {
      setAllData(allPatients);
    } else if (e.target.value === "sample_id") {
      setAllData(allSamples);
    } else if (e.target.value === "filename") {
      setAllData(allFilenames);
    }
  }

  function searchQuery() {
    if (!queryInput && !queryOption) {
      setErrorQuery("block");
      setErrorOption("block");
    } else if (!queryInput) {
      setErrorQuery("block");
      setErrorOption("none");
    } else if (!queryOption) {
      setErrorOption("block");
      setErrorQuery("none");
    } else {
      setErrorQuery("none");
      setErrorOption("none");
      setClickSearch(true);
    }
  }

  useEffect(() => {
    if (queryInput && queryOption && clickSearch) {
      setQuery(queryOption + "=" + queryInput);
      setClickSearch(false);
    }
  }, [setQuery, queryInput, queryOption, clickSearch]);

  return (
    <div className="search-form">
      <div className="search-options">
        <FormControl variant="outlined" className="search-by">
          <InputLabel htmlFor="outlined-age-native-simple">
            Query By:
          </InputLabel>
          <Select
            className="search-options"
            value={queryOption}
            onChange={e => setQueryAutocomplete(e)}
          >
            <MenuItem value={"patient_id"}>Patient ID</MenuItem>
            <MenuItem value={"sample_id"}>Sample ID</MenuItem>
            <MenuItem value={"filename"}>Filename</MenuItem>
          </Select>
        </FormControl>
        <div className="search-error" style={{ display: errorOption }}>
          Please select a query option.
        </div>
      </div>
      <div>
        <Autocomplete
          className="search-input"
          id="free-solo-demo"
          freeSolo
          options={allData.map(option => option)}
          value={queryInput}
          onChange={(e, value) => setQueryInput(value)}
          renderInput={params => (
            <TextField
              {...params}
              className="search-input"
              label="Query"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <button className="button" onClick={searchQuery}>
                      <SearchIcon />
                    </button>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
        <div className="search-error" style={{ display: errorQuery }}>
          Please enter a valid query term.
        </div>
      </div>
    </div>
  );
}

export default Search;
