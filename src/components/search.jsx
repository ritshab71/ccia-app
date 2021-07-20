import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useState, useEffect } from "react";
import React from "react";

function Search({ setCombinedQuery, setOption, setQuery }) {
  // queryInput stores users input word, queryOption stores what they are
  // selecting by
  const [queryInput, setQueryInput] = useState("");
  const [queryOption, setQueryOption] = useState("");
  // clickSearch is a bool that updates on whether the user is allowed to perform
  // a search
  const [clickSearch, setClickSearch] = useState(false);
  // errorQuery and errorOption are initialised as "none" but change to "block",
  // if an error is encountered, so that the display of the error then appears
  const [errorQuery, setErrorQuery] = useState("none");
  const [errorOption, setErrorOption] = useState("none");

  // everytime the user selects an option it updates and sets the selected
  // option, it also checks that if there is a change in option then all the
  // search input and search itself will go away
  function selectQueryOption(e) {
    setQueryOption(e.target.value);

    if (e.target.value) {
      setErrorOption("none");
    }

    if (e.target.value !== queryOption) {
      setQueryInput("");
      setCombinedQuery("");
      setOption("");
      setQuery("");
      setClickSearch(false);
    }
  }

  // everytime the user inputs a query it updates the written query
  function selectQueryInput(e) {
    setQueryInput(e.target.value);

    if (e.target.value) {
      setErrorQuery("none");
    }
  }

  // if the user clicks the "x" clear button then the option and queries
  // are removed as well as the previous search results
  function clearQuery() {
    setQueryInput("");
    setQueryOption("");
    setCombinedQuery("");
    setQuery("");
    setOption("");
    setClickSearch(false);
  }

  // function that runs when the search button (magnifying glass) is clicked
  function searchQuery() {
    // if no query or option then its invalid
    if (!queryInput && !queryOption) {
      setErrorQuery("block");
      setErrorOption("block");
    } else if (!queryInput) {
      // if no query then invalid
      setErrorQuery("block");
      setErrorOption("none");
    } else if (!queryOption) {
      // if no option then invalid
      setErrorOption("block");
      setErrorQuery("none");
    } else {
      // both are valid and clicksearch is set to true
      setErrorQuery("none");
      setErrorOption("none");
      setClickSearch(true);
    }
  }

  // everytime either the queryInput or queryOption variable is set
  // this means a valid search can be submitted and hence the input
  // and option are set through the functions that were called in
  // from App.js (setCombinedQuery, setOption, setQuery)
  useEffect(() => {
    if (queryInput && queryOption && clickSearch) {
      if (queryOption === "patient_id") {
        setOption("patient IDs = ");
      } else if (queryOption === "sample_id") {
        setOption("sample IDs = ");
      } else if (queryOption === "filename") {
        setOption("filenames containing ");
      }

      setQuery(queryInput);
      setCombinedQuery(queryOption + "=" + queryInput);
      setClickSearch(false);
    }
  }, [
    setCombinedQuery,
    setQuery,
    setOption,
    queryInput,
    queryOption,
    clickSearch
  ]);

  return (
    <div className="search-form">
      <div className="search-options">
        <FormControl variant="outlined" size="small" className="search-by">
          <InputLabel htmlFor="outlined-age-native-simple">
            Query By:
          </InputLabel>
          <Select
            className="search-options"
            value={queryOption}
            onChange={e => selectQueryOption(e)}
          >
            <MenuItem value={"patient_id"}>Patient ID</MenuItem>
            <MenuItem value={"sample_id"}>Sample ID</MenuItem>
            <MenuItem value={"filename"}>Filename</MenuItem>
          </Select>
        </FormControl>
        <div className="search-error" style={{ display: errorOption }}>
          <ErrorOutlineIcon fontSize="small"></ErrorOutlineIcon>
          <h8>Please enter a valid query term.</h8>
        </div>
      </div>
      <div>
        <TextField
          className="search-input"
          id="search"
          label="Query"
          type="search"
          size="small"
          variant="outlined"
          value={queryInput}
          onChange={e => selectQueryInput(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <button
                  className="button"
                  id="search-button"
                  onClick={searchQuery}
                >
                  <SearchIcon />
                </button>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <button
                  className="button"
                  id="clear-button"
                  onClick={clearQuery}
                >
                  <ClearIcon />
                </button>
              </InputAdornment>
            )
          }}
        />
        <div className="search-error" style={{ display: errorQuery }}>
          <ErrorOutlineIcon fontSize="small"></ErrorOutlineIcon>
          <h8>Please enter a valid query term.</h8>
        </div>
      </div>
    </div>
  );
}

export default Search;
