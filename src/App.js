import "./App.css";
import Dashboard from "./components/dashboard.jsx";
import Search from "./components/search.jsx";
import Filter from "./components/filter.jsx";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  function setApiUrl() {
    if (!query) {
      alert("Enter a query.");
    } else {
      setUrl(
        "http://20.191.211.229:5000/v1/datafiles?show_metadata=true&" + query
      );
    }
  }

  return (
    <>
      <Search setSearchQuery={setQuery}></Search>
      <Filter setFilterQuery={setFilter}></Filter>
      <button
        type="submit"
        value="Search"
        className="btn btn-block"
        onClick={setApiUrl}
      >
        Search
      </button>
      {url + filter}
      <Dashboard url={url + filter}></Dashboard>
    </>
  );
}

export default App;
