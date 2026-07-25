import { useState } from "react";
import UrlForm from "./components/UrlForm";
import AuditCard from "./components/AuditCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

function App() {
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="app">
      <div className="container">
        <h1>Page Pulse</h1>
        <p>Website Performance & SEO Auditor</p>

        <UrlForm
          setAuditData={setAuditData}
          setLoading={setLoading}
          setError={setError}
        />

        {loading && <Loader />}

        {error && <ErrorMessage message={error} />}

        {auditData && <AuditCard data={auditData} />}
      </div>
    </div>
  );
}

export default App;