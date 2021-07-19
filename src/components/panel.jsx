function Panel({ result, index }) {
  return (
    <>
      <div className="result-panel" id={result.file_id}>
        <p>Result {index + 1}</p>
        <table>
          <tr>
            <td className="heading">Filename</td>
            <td className="heading">Filetype</td>
            <td className="heading">Patient ID</td>
            <td className="heading">Sample ID</td>
            <td className="heading">Sample Type</td>
            <td className="heading">Genome</td>
            <td className="heading">Platform</td>
          </tr>
          <tr>
            <td>
              <p>{result.email}</p>
            </td>
            <td>
              <p className="filetype">{result.last_name}</p>
            </td>
            <td>
              <p>{result.first_name}</p>
            </td>
            <td>
              <p>{result.last_name}</p>
            </td>
            <td>
              <p className="sampletype">{result.last_name}</p>
            </td>
            <td>
              <p className="genome">{result.last_name}</p>
            </td>
            <td>
              <p className="platform">{result.last_name}</p>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default Panel;

// return (
//   <div id={result.file_id} className="datafiles">
//     <p>Result {index + 1}</p>
//     <div id={"df-" + result.file_id} className="filedata">
//       <p>
//         <u>Filedata</u>
//       </p>
//       <p>Filename: {result.filename}</p>
//       <p>Filetype: {result.filetype}</p>
//     </div>
//     <div id={"meta-" + result.file_id} className="metadata">
//       <p>
//         <u>Metadata</u>
//       </p>
//       <p>Patient ID: {result._metadata.patient_id}</p>
//       <p>Sample ID: {result._metadata.sample_id}</p>
//       <p>Sample Type: {result._metadata.sample_type}</p>
//       <p>Genome: {result._metadata.refgenome}</p>
//     </div>
//   </div>
// );
