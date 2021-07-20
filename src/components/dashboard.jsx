import { useState, useEffect } from "react";
import Panel from "./panel.jsx";

function Dashboard({ url, option, query }) {
  // stores the results from the api call
  const [datafiles, setDatafiles] = useState("");

  // once the url is entered we know it is valid, so thats why
  // we use the useEffect to fetch an api call for that url,
  // the results are the stored in datafiles
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
    <>
      {/* If there has been no results from datafiles loaded then show a loading
    screen (need to create a modal loading screen) */}
      {!datafiles ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        // else when the datafiles are loaded, each result from datafiles.map
        // is submitted into panel, so that the specific information can be displayed
        <div className="dashboard-panel">
          <div className="results-header">
            <span className="search-identifier">
              Searches for {option + `"${query}"`}.
            </span>
            <span className="num-results">
              <b>{datafiles.length === 0 ? "No" : datafiles.length}</b> results
              found.
            </span>
          </div>

          {datafiles.map((result, index) => {
            return <Panel result={result} index={index}></Panel>;
          })}
        </div>
      )}
    </>
  );
}

export default Dashboard;
