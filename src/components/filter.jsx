import { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

function Filter({ setFilterQuery }) {
  const [fileType, setFileType] = useState("");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [refGenome, setRefGenome] = useState("");

  var selectedFilter =
    `${fileType ? `&filetype=${fileType}` : ""}` +
    `${minSize ? `&minsize=${minSize}` : ""}` +
    `${maxSize ? `&maxsize=${maxSize}` : ""}` +
    `${sampleType ? `&sample_type=${sampleType}` : ""}` +
    `${refGenome ? `&refgenome=${refGenome}` : ""}`;

  useEffect(() => {
    setFilterQuery(selectedFilter);
  }, [setFilterQuery, selectedFilter]);

  return (
    <form className="search-form">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={fileType}
        onChange={e => setFileType(e.target.value)}
      >
        <MenuItem value={""}>---</MenuItem>
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

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sampleType}
        onChange={e => setSampleType(e.target.value)}
      >
        <MenuItem value={""}>---</MenuItem>
        <MenuItem value={"tumour"}>tumour</MenuItem>
        <MenuItem value={"normal"}>normal</MenuItem>
        <MenuItem value={"donor"}>donor</MenuItem>
      </Select>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={refGenome}
        onChange={e => setRefGenome(e.target.value)}
      >
        <MenuItem value={""}>---</MenuItem>
        <MenuItem value={"hs37d5"}>hs37d5</MenuItem>
      </Select>
    </form>
  );
}

export default Filter;
