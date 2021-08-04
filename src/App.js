import "./App.css";
import Filter from "./components/filter.jsx";
import Search from "./components/search.jsx";
import Dashboard from "./components/dashboard.jsx";
import { useState } from "react";

function App() {
  const [combinedQuery, setCombinedQuery] = useState("");
  const [query, setQuery] = useState("");
  const [option, setOption] = useState("");
  const [filter, setFilter] = useState("");
  const [platformLocation, setPlatformLocation] = useState("");

  return (
    <>
      <Search
        setCombinedQuery={setCombinedQuery}
        setOption={setOption}
        setQuery={setQuery}
      ></Search>
      <div className="filter-dashboard">
        <Filter
          setFilter={setFilter}
          setPlatformLocation={setPlatformLocation}
        ></Filter>
        {combinedQuery && (
          <Dashboard
            url={
              "http://20.191.211.229:5000/v1/datafiles?show_metadata=true&" +
              combinedQuery +
              filter
            }
            query={query}
            option={option}
            platform={platformLocation}
          ></Dashboard>
        )}
      </div>
    </>
  );
}

export default App;
