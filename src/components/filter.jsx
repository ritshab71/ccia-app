import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

function Filter({ setFilter, setPlatformLocation, setOrderByFilesize }) {
  const selectBox = makeStyles({
    root: {
      fontSize: "11px"
    }
  });

  const classes = selectBox();

  const [fileType, setFileType] = useState("");
  const [minSize, setMinSize] = useState("");
  const [validMinSize, setValidMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [validMaxSize, setValidMaxSize] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [refGenome, setRefGenome] = useState("");
  const [platform, setPlatform] = useState("");
  const [errorMin, setErrorMin] = useState(false);
  const [errorMax, setErrorMax] = useState(false);
  const [errorSizing, setErrorSizing] = useState(false);

  function resetFilters() {
    setFileType("");
    setValidMinSize("");
    setValidMaxSize("");
    setMinSize("");
    setMaxSize("");
    setSampleType("");
    setRefGenome("");
    setPlatform("");
    setErrorMin(false);
    setErrorMax(false);
    setErrorSizing(false);
  }

  function handleMin(e) {
    const regex = /(^[0-9\b]+)( ?[mkgMKG]?[bB]$)/;
    if (!regex.test(e) && e) {
      setMinSize(e);
      setValidMinSize("");
      setErrorMin(true);
    } else if (!e) {
      setMinSize(e);
      setErrorMin(false);
      setErrorSizing(false);
    } else {
      setMinSize(e);
      setErrorMin(false);
      var extractFilesize = regex.exec(e);
      var size = extractFilesize[1];
      var unit = extractFilesize[2].replace(/ /g, "");
      setFileSize("min", size, unit);
    }
  }

  function handleMax(e) {
    const regex = /(^[0-9\b]+)( ?[mkgMKG]?[bB]$)/;
    if (!regex.test(e) && e) {
      setMaxSize(e);
      setValidMaxSize("");
      setErrorMax(true);
    } else if (!e) {
      setMaxSize(e);
      setErrorMax(false);
      setErrorSizing(false);
    } else {
      setMaxSize(e);
      setErrorMax(false);
      var extractFilesize = regex.exec(e);
      var size = extractFilesize[1];
      var unit = extractFilesize[2].replace(/ /g, "");
      setFileSize("max", size, unit);
    }
  }

  useEffect(() => {
    if (validMaxSize && validMinSize) {
      if (Number(validMaxSize) <= Number(validMinSize)) {
        setErrorSizing(true);
      } else {
        setErrorSizing(false);
      }
    }
  }, [validMaxSize, validMinSize]);

  function setFileSize(type, size, unit) {
    var validSize = 0;

    if (unit === "b" || unit === "B") {
      validSize = size;
    } else if (unit === "kb" || unit === "KB") {
      validSize = Number(size) * 1024;
    } else if (unit === "mb" || unit === "MB") {
      validSize = Number(size) * 1024 * 1024;
    } else if (unit === "gb" || unit === "GB") {
      validSize = Number(size) * 1024 * 1024 * 1024;
    }

    if (type === "min") {
      setValidMinSize(validSize.toString());
    } else {
      setValidMaxSize(validSize.toString());
    }
  }

  var selectedFilter =
    `${fileType ? `&filetype=${fileType}` : ""}` +
    `${validMinSize ? `&min_size=${validMinSize}` : ""}` +
    `${validMaxSize ? `&max_size=${validMaxSize}` : ""}` +
    `${sampleType ? `&sample_type=${sampleType}` : ""}` +
    `${refGenome ? `&refgenome=${refGenome}` : ""}`;

  useEffect(() => {
    setFilter(selectedFilter);
    setPlatformLocation(platform);
  }, [setFilter, selectedFilter, platform, setPlatformLocation]);

  return (
    <div className="filter-form">
      <table>
        <tr>
          <td className="f-option">
            <p className="f-header">Filetype:</p>
          </td>
          <td className="f-form">
            <FormControl variant="outlined" size="small" className="form-box">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={classes.root}
                value={fileType}
                onChange={e => setFileType(e.target.value)}
              >
                <MenuItem className={classes.root} value={""}>
                  None
                </MenuItem>
                <MenuItem className={classes.root} value={"tdf"}>
                  tdf
                </MenuItem>
                <MenuItem className={classes.root} value={"tar"}>
                  tar
                </MenuItem>
                <MenuItem className={classes.root} value={"bam"}>
                  bam
                </MenuItem>
                <MenuItem className={classes.root} value={"bai"}>
                  bai
                </MenuItem>
                <MenuItem className={classes.root} value={"fastq"}>
                  fastq
                </MenuItem>
                <MenuItem className={classes.root} value={"json"}>
                  json
                </MenuItem>
                <MenuItem className={classes.root} value={"vcf"}>
                  vcf
                </MenuItem>
                <MenuItem className={classes.root} value={"gvcf"}>
                  gvcf
                </MenuItem>
                <MenuItem className={classes.root} value={"metrics"}>
                  metrics
                </MenuItem>
                <MenuItem className={classes.root} value={"hist"}>
                  hist
                </MenuItem>
                <MenuItem className={classes.root} value={"stats"}>
                  stats
                </MenuItem>
                <MenuItem className={classes.root} value={"flagstats"}>
                  flagstats
                </MenuItem>
                <MenuItem className={classes.root} value={"idxstats"}>
                  idxstats
                </MenuItem>
                <MenuItem className={classes.root} value={"DLERROR"}>
                  DLERROR
                </MenuItem>
              </Select>
            </FormControl>
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <p className="f-header">Minimum filesize:</p>
          </td>
          <td className="f-form">
            <TextField
              label="Bytes"
              size="small"
              variant="outlined"
              className="form-box"
              placeholder="Eg. 10 mb or 10 MB"
              value={minSize}
              onChange={e => handleMin(e.target.value)}
              inputProps={{ style: { fontSize: 11 } }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
            {errorMin && (
              <div className="search-error">
                <ErrorOutlineIcon fontSize="small"></ErrorOutlineIcon>
                <span>Invalid filesize and unit!</span>
              </div>
            )}
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <p className="f-header">Maximum filesize:</p>
          </td>
          <td className="f-form">
            <TextField
              label="Bytes"
              size="small"
              variant="outlined"
              className="form-box"
              placeholder="Eg. 10 gb or 10 GB"
              value={maxSize}
              onChange={e => handleMax(e.target.value)}
              inputProps={{ style: { fontSize: 11 } }}
              InputLabelProps={{ style: { fontSize: 11 } }}
            />
            {errorMax && (
              <div className="search-error">
                <ErrorOutlineIcon fontSize="small"></ErrorOutlineIcon>
                <span>Invalid filesize and unit.</span>
              </div>
            )}
            {errorSizing && !errorMax && (
              <div className="search-error">
                <ErrorOutlineIcon fontSize="small"></ErrorOutlineIcon>
                <span>Must be greater than min size.</span>
              </div>
            )}
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <p className="f-header">Sample type:</p>
          </td>
          <td className="f-form">
            <FormControl variant="outlined" size="small" className="form-box">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={classes.root}
                value={sampleType}
                onChange={e => setSampleType(e.target.value)}
              >
                <MenuItem className={classes.root} value={""}>
                  None
                </MenuItem>
                <MenuItem className={classes.root} value={"tumour"}>
                  tumour
                </MenuItem>
                <MenuItem className={classes.root} value={"normal"}>
                  normal
                </MenuItem>
                <MenuItem className={classes.root} value={"donor"}>
                  donor
                </MenuItem>
              </Select>
            </FormControl>
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <p className="f-header">Reference genome:</p>
          </td>
          <td className="f-form">
            <FormControl variant="outlined" size="small" className="form-box">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={classes.root}
                value={refGenome}
                onChange={e => setRefGenome(e.target.value)}
              >
                <MenuItem className={classes.root} value={""}>
                  None
                </MenuItem>
                <MenuItem className={classes.root} value={"hs37d5"}>
                  hs37d5
                </MenuItem>
              </Select>
            </FormControl>
          </td>
        </tr>
        <tr>
          <td className="f-option">
            <p className="f-header">Platform:</p>
          </td>
          <td className="f-form">
            <FormControl variant="outlined" size="small" className="form-box">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={platform}
                onChange={e => setPlatform(e.target.value)}
                className={classes.root}
              >
                <MenuItem className={classes.root} value={"none"}>
                  None
                </MenuItem>
                <MenuItem className={classes.root} value={"both"}>
                  dnanexus & netapp
                </MenuItem>
                <MenuItem className={classes.root} value={"dna"}>
                  dnanexus
                </MenuItem>
                <MenuItem className={classes.root} value={"net"}>
                  netapp
                </MenuItem>
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
