import React from "react";

function Panel({ result, index, filesize }) {
  return (
    <>
      <div className="result-panel" id={result.file_id}>
        <span className="filename-info">
          Result {index + 1} - <b>{result.filename}</b> ({filesize})
        </span>
        <table>
          <col style={{ width: "5%" }}></col>
          <col style={{ width: "20%" }}></col>
          <col style={{ width: "40%" }}></col>
          <col style={{ width: "5%" }}></col>
          <col style={{ width: "10%" }}></col>
          <col style={{ width: "25%" }}></col>
          <thead>
            <tr>
              <td className="heading">Filetype</td>
              <td className="heading">Patient ID</td>
              <td className="heading">Sample ID</td>
              <td className="heading">Sample Type</td>
              <td className="heading">Genome</td>
              <td className="heading"></td>
            </tr>
          </thead>
          <tr>
            <td>
              <p className="filetype">{result.filetype}</p>
            </td>
            <td>
              <p>{result._metadata.patient_id}</p>
            </td>
            <td>
              <p>{result._metadata.sample_id}</p>
            </td>
            <td>
              <p className="sampletype">{result._metadata.sample_type}</p>
            </td>
            <td>
              <p className="genome">{result._metadata.refgenome}</p>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default Panel;
