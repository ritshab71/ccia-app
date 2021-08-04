import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

function Search({ setCombinedQuery, setOption, setQuery }) {
  const [queryInput, setQueryInput] = useState("");
  const [queryOption, setQueryOption] = useState("patient_id");
  const [clickSearch, setClickSearch] = useState(false);

  const searchFormStyles = makeStyles({
    tab: {
      flexGrow: 1,
      backgroundColor: "#f3f5f7",
      height: "33px",
      minHeight: "10px",
      boxShadow: "none"
    },
    tabPanel: {
      textTransform: "none",
      borderTopLeftRadius: "5px",
      borderTopRightRadius: "5px",
      marginRight: "5px",
      backgroundColor: "white",
      minHeight: "8px",
      minWidth: "74px"
    },
    tabLabel: {
      height: "20px",
      fontSize: "11px"
    },
    searchBar: {
      backgroundColor: "white",
      outline: "none",
      borderRadius: "4px",
      width: "100%",
      border: "none",
      padding: "5px"
    },
    filterPanelExpand: {
      backgroundColor: "#f3f5f7",
      boxShadow: "none",
      border: "1px solid black",
      fontSize: "12px"
    },
    searchInsert: {
      backgroundColor: "#f3f5f7",
      outline: "none",
      fontSize: "13px"
    },
    iconLabel: {
      fontSize: "11px"
    },
    sortLabel: {
      fontSize: "10px"
    },
    sortButton: {
      textTransform: "none"
    }
  });

  const classes = searchFormStyles();

  const [suggestions, setSuggestions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [samples, setSamples] = useState([]);

  const [open, setOpen] = useState(false);

  const [errorQuery, setErrorQuery] = useState(false);
  const [searchDisplay, setSearchDisplay] = useState();

  useEffect(() => {
    fetch("http://20.191.211.229:5000/v1/metadata/patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(patients => {
        setPatients(patients);
        setSuggestions(patients);
      });
  }, []);

  useEffect(() => {
    fetch("http://20.191.211.229:5000/v1/metadata/samples", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(samples => {
        setSamples(samples);
      });
  }, []);

  function selectQueryOption(value) {
    setQueryOption(value);

    if (value !== queryOption) {
      setQueryInput("");
      setCombinedQuery("");
      setOption("");
      setQuery("");
      setErrorQuery(false);
      setClickSearch(false);
    }
  }

  function setOptionTab(e, value) {
    selectQueryOption(value);
    setQueryInput("");

    if (value === "filename") {
      setSearchDisplay(true);
    } else if (value === "patient_id") {
      setSearchDisplay(false);
      setSuggestions(patients);
    } else if (value === "sample_id") {
      setSearchDisplay(false);
      setSuggestions(samples);
    }
  }

  function selectQueryInput(value) {
    setQueryInput(value);

    if (value) {
      setErrorQuery(false);
    } else if (!value) {
      setOpen(false);
    }
  }

  function searchQuery() {
    if (!queryInput) {
      setErrorQuery(true);
    } else {
      setErrorQuery(false);
      setClickSearch(true);
    }
  }

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

  function searchByEnterKey(e) {
    if (e.key === "Enter") {
      searchQuery();
    }
  }

  function clearQuery() {
    setQueryInput("");
    setQueryOption(queryOption);
    setClickSearch(false);
    setCombinedQuery("");
    setQuery("");
    setOption("");
    setErrorQuery(false);
  }

  return (
    <>
      <div className="search-form">
        <div>
          <Paper className={classes.tab}>
            <Tabs
              value={queryOption}
              onChange={setOptionTab}
              textColor="secondary"
            >
              <Tab
                value={"patient_id"}
                className={classes.tabPanel}
                label={<span className={classes.tabLabel}>Patient ID</span>}
              ></Tab>
              <Tab
                value={"sample_id"}
                className={classes.tabPanel}
                label={<span className={classes.tabLabel}>Sample ID</span>}
              ></Tab>
              <Tab
                value={"filename"}
                className={classes.tabPanel}
                label={<span className={classes.tabLabel}>Filename</span>}
              ></Tab>
            </Tabs>
          </Paper>
          <div>
            {!searchDisplay && (
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                open={open}
                onOpen={() => {
                  if (queryInput) {
                    setOpen(true);
                  }
                }}
                onClose={() => setOpen(false)}
                options={suggestions.map(option => option)}
                inputValue={queryInput}
                onInputChange={(e, value) => selectQueryInput(value)}
                onKeyDown={e => searchByEnterKey(e)}
                renderInput={params => (
                  <TextField
                    {...params}
                    className={classes.searchBar}
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      className: classes.searchInsert,
                      startAdornment: (
                        <InputAdornment position="start">
                          <button
                            className="button"
                            id="clear-button"
                            onClick={clearQuery}
                          >
                            <ClearIcon />
                          </button>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <button
                            className="button"
                            id="search-button"
                            onClick={searchQuery}
                          >
                            <SearchIcon />
                          </button>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            )}
            {searchDisplay && (
              <TextField
                className={classes.searchBar}
                id="outlined-basic"
                size="small"
                variant="outlined"
                value={queryInput}
                onChange={e => selectQueryInput(e.target.value)}
                onKeyDown={e => searchByEnterKey(e)}
                InputProps={{
                  className: classes.searchInsert,
                  startAdornment: (
                    <InputAdornment position="start">
                      <button
                        className="button"
                        id="clear-button"
                        onClick={clearQuery}
                      >
                        <ClearIcon />
                      </button>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <button
                        className="button"
                        id="search-button"
                        onClick={searchQuery}
                      >
                        <SearchIcon />
                      </button>
                    </InputAdornment>
                  )
                }}
              />
            )}
            {errorQuery && (
              <div className="search-error">
                <ErrorOutlineIcon fontSize="small"></ErrorOutlineIcon>
                <span>Please enter a valid query term.</span>
              </div>
            )}
          </div>
        </div>
        <div className="ccia">
          <img
            className="ccia-logo"
            src="https://d1on96qv1pxmre.cloudfront.net/decsae2pvrscg.svg"
            alt="ccia logo"
          ></img>
        </div>
      </div>
    </>
  );
}

export default Search;
