import { useState, useEffect } from "react";
import Panel from "./panel.jsx";
import Platform from "./platform.jsx";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";

function Dashboard({ url, option, query, platform }) {
  const [datafiles, setDatafiles] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    setLoading(true);
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
        if (platform === "both") {
          setDatafiles([]);
          files.forEach(file => {
            if (file.dnanexus && file.netapp) {
              setDatafiles(datafiles => [...datafiles, file]);
            }
          });
        } else if (platform === "dna") {
          setDatafiles([]);
          files.forEach(file => {
            if (file.dnanexus) {
              setDatafiles(datafiles => [...datafiles, file]);
            }
          });
        } else if (platform === "net") {
          setDatafiles([]);
          files.forEach(file => {
            if (file.netapp) {
              setDatafiles(datafiles => [...datafiles, file]);
            }
          });
        } else {
          setDatafiles(files);
        }
        setLoading(false);
      });
  }, [url, platform]);

  function convertSize(bytes) {
    const k = 1024;
    const sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
  }

  return (
    <>
      {/* If there has been no results from datafiles loaded then show a loading
    screen until they have been loaded in */}
      <div className="dashboard">
        {!datafiles || loading ? (
          <div className="loading-screen">
            <p className="loading-text">Loading</p>
            <Spinner
              className="loading-spin"
              animation="border"
              variant="primary"
            />
          </div>
        ) : (
          // else when the datafiles are loaded, each result from datafiles.map
          // is submitted into panel, so that the specific information can be displayed
          <div className="dashboard-panel">
            <div className="results-header">
              <span className="search-identifier">
                Searches for {option + `"${query}"`}.
              </span>
              <span className="num-results">
                <b>{datafiles.length === 0 ? "No" : datafiles.length}</b>{" "}
                results found.
              </span>
            </div>

            {datafiles.map((result, index) => {
              if (result.dnanexus !== null || result.netapp !== null) {
                return (
                  <Platform
                    result={result}
                    index={index}
                    dnanexus={result.dnanexus}
                    netapp={result.netapp}
                    filesize={convertSize(result.filesize)}
                  ></Platform>
                );
              } else {
                return (
                  <Panel
                    result={result}
                    index={index}
                    filesize={convertSize(result.filesize)}
                  ></Panel>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
