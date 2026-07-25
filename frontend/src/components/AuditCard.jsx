function AuditCard({ data }) {
  return (
    <div>
      <h2>Audit Report</h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default AuditCard;