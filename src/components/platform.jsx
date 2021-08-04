import React from "react";
import Accordion from "@material-ui/core/Accordion";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles } from "@material-ui/core/styles";

const expandPlatform = makeStyles({
  root: {
    marginBottom: "10px",
    padding: "0px",
    boxShadow: "none",
    borderRadius: "5px"
  },
  summary: {
    marginTop: "0px",
    marginRight: "10px",
    padding: "0px",
    boxShadow: "none",
    height: "120px"
  },
  accordion: {
    padding: "5px"
  }
});

function Platform({ result, index, dnanexus, netapp, filesize }) {
  const classes = expandPlatform();

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        aria-controls="panel1a-content"
        className={classes.summary}
        id={result.file_id}
      >
        <div className="p-result-panel" id={result.file_id}>
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
                <td className="heading">Platform</td>
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
              <td>
                <p>
                  {dnanexus && <span className="dnanexus-popup">dnanexus</span>}
                  {netapp && <span className="netapp-popup">netapp</span>}
                </p>
              </td>
            </tr>
          </table>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.accordion}>
        <Typography>
          {dnanexus && (
            <div className="dnanexus-platform">
              <table>
                <col style={{ width: "25%" }}></col>
                <col style={{ width: "30%" }}></col>
                <col style={{ width: "25%" }}></col>
                <col style={{ width: "12%" }}></col>
                <col style={{ width: "8%" }}></col>
                <thead>
                  <tr>
                    <td className="heading">Project</td>
                    <td className="heading">Project ID</td>
                    <td className="heading">File ID</td>
                    <td className="heading">Folder</td>
                    <td className="heading">Region</td>
                  </tr>
                </thead>
                <tr>
                  <td>
                    <p>{dnanexus.dxproject}</p>
                  </td>
                  <td>
                    <p>{dnanexus.dxproject_id}</p>
                  </td>
                  <td>
                    <p>{dnanexus.dxfile_id}</p>
                  </td>
                  <td>
                    <p>{dnanexus.dxfolder}</p>
                  </td>
                  <td>
                    <p>{dnanexus.region}</p>
                  </td>
                </tr>
              </table>
            </div>
          )}
          {netapp && (
            <div className="netapp-platform">
              <table>
                <col style={{ width: "55%" }}></col>
                <col style={{ width: "25%" }}></col>
                <col style={{ width: "12%" }}></col>
                <col style={{ width: "8%" }}></col>
                <thead>
                  <tr>
                    <td className="heading">Key</td>
                    <td className="heading">E-tag</td>
                    <td className="heading">Account ID</td>
                    <td className="heading">Bucket</td>
                  </tr>
                </thead>
                <tr>
                  <td>
                    <p>{netapp.key}</p>
                  </td>
                  <td>
                    <p>{netapp.etag}</p>
                  </td>
                  <td>
                    <p>{netapp.account_id}</p>
                  </td>
                  <td>
                    <p>{netapp.bucket}</p>
                  </td>
                </tr>
              </table>
            </div>
          )}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default Platform;
