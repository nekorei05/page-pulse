import { useState } from "react";
import api from "../services/api";

function UrlForm({ setAuditData, setLoading, setError }) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setAuditData(null);

    try {
      const response = await api.post("/audit", {
        url,
      });

      setAuditData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button type="submit">
        Audit Website
      </button>
    </form>
  );
}

export default UrlForm;