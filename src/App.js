import "./App.css";
import Dashboard from "./components/dashboard.jsx";
import Search from "./components/search.jsx";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");

  return (
    <>
      <Search onSearch={setUrl}></Search>
      <p>{url}</p>
      <Dashboard url={url}></Dashboard>
    </>
  );
}

export default App;

// DMG915
