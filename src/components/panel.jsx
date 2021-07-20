function Panel({ result, index }) {
  return (
    <>
      <div className="result-panel" id={result.file_id}>
        <p>
          Result {index + 1} - <b>{result.filename}</b> ({result.filesize}{" "}
          bytes)
        </p>
        <table>
          <tr>
            <td className="heading">Filetype</td>
            <td className="heading">Patient ID</td>
            <td className="heading">Sample ID</td>
            <td className="heading">Sample Type</td>
            <td className="heading">Genome</td>
            <td className="heading">Platform</td>
          </tr>
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
            <td>
              <p className="platform">None</p>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default Panel;
