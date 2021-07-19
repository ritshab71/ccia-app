import "./App.css";

import Filter from "./components/filter.jsx";
import Search from "./components/search.jsx";
import Dashboard from "./components/dashboard.jsx";
import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  function isUrlSet(query) {
    if (query) {
      return (
        <Dashboard
          url={
            "http://20.191.211.229:5000/v1/datafiles?show_metadata=true&" +
            query +
            filter
          }
        ></Dashboard>
      );
    }
  }

  return (
    <>
      <Search setQuery={setQuery}></Search>
      <div className="filter-dashboard">
        <Filter setFilter={setFilter}></Filter>
        <div className="dashboard">
          <p>{query + filter}</p>
          {isUrlSet(query)}
        </div>
      </div>
    </>
  );
}

export default App;
