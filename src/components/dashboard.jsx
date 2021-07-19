import { useState, useEffect } from "react";
import Panel from "./panel.jsx";

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
        setDatafiles(files.data);
      });
  }, [url]);

  return (
    <>
      <div className="results-header"> {datafiles.length} results</div>
      <div className="dashboard-panel">
        {!datafiles ? (
          <p>Loading...</p> // return a modal popup
        ) : (
          datafiles.map((result, index) => {
            return <Panel result={result} index={index}></Panel>;
          })
        )}
      </div>
    </>
  );
}

export default Dashboard;
