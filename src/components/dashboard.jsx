import { useState, useEffect } from "react";

function Dashboard({ url }) {
  const [datafiles, setDatafiles] = useState("");

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(files => {
        setDatafiles(files);
      });
  }, [url]);

  return (
    <div className="dashboard-panel">
      {!datafiles ? (
        <p></p>
      ) : (
        <div>
          {datafiles.map((result, index) => {
            return (
              <div id={result.file_id} className="datafiles">
                <p>Result {index + 1}</p>
                <div id={"df-" + result.file_id} className="filedata">
                  <p>
                    <u>Filedata</u>
                  </p>
                  <p>Filename: {result.filename}</p>
                  <p>Filetype: {result.filetype}</p>
                </div>
                <div id={"meta-" + result.file_id} className="metadata">
                  <p>
                    <u>Metadata</u>
                  </p>
                  <p>Patient ID: {result._metadata.patient_id}</p>
                  <p>Sample ID: {result._metadata.sample_id}</p>
                  <p>Sample Type: {result._metadata.sample_type}</p>
                  <p>Genome: {result._metadata.refgenome}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
