import "./App.css";

import Filter from "./components/filter.jsx";
import Search from "./components/search.jsx";
import Dashboard from "./components/dashboard.jsx";
import { useState } from "react";

function App() {
  // combinedQuery = option+query
  const [combinedQuery, setCombinedQuery] = useState("");
  // the individual query itself
  const [query, setQuery] = useState("");
  // the individual option itself
  const [option, setOption] = useState("");
  // sets all the filter parameters into one string, it is passed into the
  // Filter component to set this variable
  const [filter, setFilter] = useState("");

  function isUrlSet(combinedQuery) {
    // if atleast an option is selected and query is inputted, then a api call can be made
    // else it will be handled in search.jsx as an error for no option or query input
    if (combinedQuery) {
      return (
        // feed the api url with the appended combinedQuery and filter
        <Dashboard
          url={
            "http://20.191.211.229:5000/v1/datafiles?show_metadata=true&" +
            combinedQuery +
            filter
          }
          query={query}
          option={option}
        ></Dashboard>
      );
    }
  }

  return (
    <>
      <Search
        setCombinedQuery={setCombinedQuery}
        setOption={setOption}
        setQuery={setQuery}
      ></Search>
      <div className="filter-dashboard">
        <Filter setFilter={setFilter}></Filter>
        {/* isUrlSet checks to see whether a option and query are valid so that it can run
        the api call on it */}
        <div className="dashboard">{isUrlSet(combinedQuery)}</div>
      </div>
    </>
  );
}

export default App;
