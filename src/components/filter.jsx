import { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";

function Filter({ setFilter }) {
  const [fileType, setFileType] = useState("");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [refGenome, setRefGenome] = useState("");

  const [errorMin, setErrorMin] = useState("none");
  const [errorMax, setErrorMax] = useState("none");

  function resetFilters() {
    setFileType("");
    setMinSize("");
    setMaxSize("");
    setSampleType("");
    setRefGenome("");
    setErrorMin("none");
    setErrorMax("none");
  }

  function handleMin(e) {
    const regex = /^[0-9\b]+$/;
    if (!regex.test(e) && e) {
      setMinSize(e);
      setErrorMin("block");
    } else {
      setMinSize(e);
      setErrorMin("none");
    }
  }

  function handleMax(e) {
    const regex = /^[0-9\b]+$/;
    if (!regex.test(e) && e) {
      setMaxSize(e);
      setErrorMax("block");
    } else {
      setMaxSize(e);
      setErrorMax("none");
    }
  }

  var selectedFilter =
    `${fileType ? `&filetype=${fileType}` : ""}` +
    `${minSize ? `&minsize=${minSize}` : ""}` +
    `${maxSize ? `&maxsize=${maxSize}` : ""}` +
    `${sampleType ? `&sample_type=${sampleType}` : ""}` +
    `${refGenome ? `&refgenome=${refGenome}` : ""}`;

  useEffect(() => {
    setFilter(selectedFilter);
  }, [setFilter, selectedFilter]);

  return (
    <div className="filter-form">
      <table>
        <tr>
          <td className="f-option">
            <b>Filetype:</b>
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
            <b>Minimum filesize:</b>
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
              Not a valid number of bytes!
            </div>
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <b>Maximum filesize:</b>
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
              Not a valid number of bytes!
            </div>
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <b>Sample type:</b>
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
            <b>Reference genome:</b>
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
      <div className="reset-filter">
        <Button variant="outlined" color="primary" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Filter;
