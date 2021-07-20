import { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React from "react";

function Filter({ setFilter }) {
  // stores the filetype selected
  const [fileType, setFileType] = useState("");
  // stores the minimum size entered by the user (whether valid or invalid)
  const [minSize, setMinSize] = useState("");
  // only stores the valid min size after error checking
  const [validMinSize, setValidMinSize] = useState("");
  // stores the maximum size entered by the user (whether valid or invalid)
  const [maxSize, setMaxSize] = useState("");
  // only stores the valid max size after error checking
  const [validMaxSize, setValidMaxSize] = useState("");
  // stores the sample type selected
  const [sampleType, setSampleType] = useState("");
  // stores the refgenome selected
  const [refGenome, setRefGenome] = useState("");
  // initialises error statements for both min and max sizes to "none"
  const [errorMin, setErrorMin] = useState("none");
  const [errorMax, setErrorMax] = useState("none");

  // function that clears all the set filter parameters to be empty when called
  function resetFilters() {
    setFileType("");
    setValidMinSize("");
    setValidMaxSize("");
    setMinSize("");
    setMaxSize("");
    setSampleType("");
    setRefGenome("");
    setErrorMin("none");
    setErrorMax("none");
  }

  // every time the user inputs into the minsize/maxsize box it checks through
  // a regex expression whether it is a number being inputted, if it is not then
  // the error is set to display as a "block" and the error will only be removed
  // from view once valid input then resurfaces, if it is valid input then the
  // valid number is then set to setValidMinSize/setValidMaxSize
  function handleMin(e) {
    const regex = /^[0-9\b]+$/;
    if (!regex.test(e) && e) {
      setMinSize(e);
      setValidMinSize("");
      setErrorMin("block");
    } else {
      setMinSize(e);
      setValidMinSize(e);
      setErrorMin("none");
    }
  }

  function handleMax(e) {
    const regex = /^[0-9\b]+$/;
    if (!regex.test(e) && e) {
      setMaxSize(e);
      setValidMaxSize("");
      setErrorMax("block");
    } else {
      setMaxSize(e);
      setValidMaxSize(e);
      setErrorMax("none");
    }
  }

  // appends all the filter parameters together in a string only if they have
  // been selected
  var selectedFilter =
    `${fileType ? `&filetype=${fileType}` : ""}` +
    `${validMinSize ? `&min_size=${validMinSize}` : ""}` +
    `${validMaxSize ? `&max_size=${validMaxSize}` : ""}` +
    `${sampleType ? `&sample_type=${sampleType}` : ""}` +
    `${refGenome ? `&refgenome=${refGenome}` : ""}`;

  // everytime the filter is updated it dynamically changes the api url and makes a new
  // call to reflect the selected filter parameter, without the need of clicking a submit button
  useEffect(() => {
    setFilter(selectedFilter);
  }, [setFilter, selectedFilter]);

  return (
    <div className="filter-form">
      <table>
        <tr>
          <td className="f-option">
            <p class="f-header">Filetype:</p>
          </td>
          <td className="f-form">
            <FormControl variant="outlined" size="small" className="form-box">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fileType}
                onChange={e => setFileType(e.target.value)}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"tdf"}>tdf</MenuItem>
                <MenuItem value={"tar"}>tar</MenuItem>
                <MenuItem value={"bam"}>bam</MenuItem>
                <MenuItem value={"bai"}>bai</MenuItem>
                <MenuItem value={"fastq"}>fastq</MenuItem>
                <MenuItem value={"json"}>json</MenuItem>
                <MenuItem value={"vcf"}>vcf</MenuItem>
                <MenuItem value={"gvcf"}>gvcf</MenuItem>
                <MenuItem value={"metrics"}>metrics</MenuItem>
                <MenuItem value={"hist"}>hist</MenuItem>
                <MenuItem value={"stats"}>stats</MenuItem>
                <MenuItem value={"flagstats"}>flagstats</MenuItem>
                <MenuItem value={"idxstats"}>idxstats</MenuItem>
                <MenuItem value={"DLERROR"}>DLERROR</MenuItem>
              </Select>
            </FormControl>
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <p class="f-header">Minimum filesize:</p>
          </td>
          <td className="f-form">
            <TextField
              id="outlined-required"
              label="Bytes"
              size="small"
              variant="outlined"
              className="form-box"
              value={minSize}
              onChange={e => handleMin(e.target.value)}
            />
            <div className="search-error" style={{ display: errorMin }}>
              <ErrorOutlineIcon fontSize="small"></ErrorOutlineIcon>
              <h8>Enter number of bytes!</h8>
            </div>
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <p class="f-header">Maximum filesize:</p>
          </td>
          <td className="f-form">
            <TextField
              id="outlined-required"
              label="Bytes"
              size="small"
              variant="outlined"
              className="form-box"
              value={maxSize}
              onChange={e => handleMax(e.target.value)}
            />
            <div className="search-error" style={{ display: errorMax }}>
              <ErrorOutlineIcon fontSize="small"></ErrorOutlineIcon>
              <h8>Enter number of bytes!</h8>
            </div>
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <p class="f-header">Sample type:</p>
          </td>
          <td className="f-form">
            <FormControl variant="outlined" size="small" className="form-box">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sampleType}
                onChange={e => setSampleType(e.target.value)}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"tumour"}>tumour</MenuItem>
                <MenuItem value={"normal"}>normal</MenuItem>
                <MenuItem value={"donor"}>donor</MenuItem>
              </Select>
            </FormControl>
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <p class="f-header">Reference genome:</p>
          </td>
          <td className="f-form">
            <FormControl variant="outlined" size="small" className="form-box">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={refGenome}
                onChange={e => setRefGenome(e.target.value)}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"hs37d5"}>hs37d5</MenuItem>
              </Select>
            </FormControl>
          </td>
        </tr>
      </table>
      <div className="reset">
        <button className="reset-filter" onClick={resetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filter;
