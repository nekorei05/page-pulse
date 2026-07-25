function AuditCard({ data }) {
  const { url, auditedAt } = data;

  const {
    healthScore,
    performance,
    seo,
    accessibility,
    content,
  } = data.data;

  return (
    <div className="audit-report">

      <div className="card">
        <h2>Overall Health</h2>
        <h1>{healthScore}/100</h1>

        <p><strong>Website:</strong> {url}</p>
        <p><strong>Audited:</strong> {new Date(auditedAt).toLocaleString()}</p>
      </div>

      <div className="card">
        <h2>Performance</h2>

        <p>Status: {performance.status}</p>

        <p>Response Time: {performance.responseTime} ms</p>
      </div>

      <div className="card">
        <h2>SEO</h2>

        <p><strong>Title:</strong></p>
        <p>{seo.title}</p>

        <p><strong>Meta Description:</strong></p>
        <p>{seo.metaDescription || "Not found"}</p>

        <p><strong>H1 Count:</strong> {seo.h1Count}</p>
      </div>

      <div className="card">
        <h2>Accessibility</h2>

        <p>Images Missing Alt: {accessibility.imagesMissingAlt}</p>
      </div>

      <div className="card">
        <h2>Content</h2>

        <p>Word Count: {content.wordCount}</p>
      </div>

    </div>
  );
}

export default AuditCard;