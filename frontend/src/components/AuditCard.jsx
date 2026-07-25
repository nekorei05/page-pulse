function AuditCard({ data }) {
  const { url, auditedAt } = data;

  const {
    healthScore,
    performance,
    seo,
    accessibility,
    content,
  } = data.data;

  const getHealthLabel = (score) => {
    if (score >= 90)
      return {
        text: "Excellent",
        className: "good",
      };

    if (score >= 75)
      return {
        text: "Good",
        className: "good",
      };

    if (score >= 60)
      return {
        text: "Needs Improvement",
        className: "average",
      };

    return {
      text: "Poor",
      className: "poor",
    };
  };

  const health = getHealthLabel(healthScore);

  return (
    <div className="audit-report">


      <div className="card hero-card">

        <div className="hero-header">

          <h2>Overall Health</h2>

          <span className={`health-badge ${health.className}`}>
            {health.text}
          </span>

        </div>

        <h1 className={`score ${health.className}`}>
          {healthScore}/100
        </h1>

        <div className="hero-info">

          <div>
            <strong>Website</strong>
            <p>{new URL(url).hostname}</p>
          </div>

          <div>
            <strong>Audited</strong>
            <p>{new Date(auditedAt).toLocaleString()}</p>
          </div>

        </div>

      </div>

      {/* Performance */}

      <div className="card">

        <h2> Performance</h2>

        <div className="metric-row">

          <div>

            <strong>Status</strong>

            <p>
              <span
  className={
    performance.status >= 200 && performance.status < 300
      ? "status-ok"
      : "status-error"
  }
>
  {performance.status}
</span>
            </p>

          </div>

          <div>

            <strong>Response Time</strong>

            <p>{performance.responseTime} ms</p>

          </div>

        </div>

      </div>

      {/* SEO */}

      <div className="card">

        <h2> SEO</h2>

        <p><strong>Title</strong></p>

        <p>{seo.title || "Not Found"}</p>

        <br />

        <p><strong>Meta Description</strong></p>

        <p>{seo.metaDescription || "Not Found"}</p>

        <br />

        <p><strong>H1 Count</strong></p>

        <p>{seo.h1Count}</p>

      </div>

      {/* Accessibility */}

      <div className="card">

        <h2> Accessibility</h2>

        <strong>Images Missing Alt</strong>

        <p>{accessibility.imagesMissingAlt}</p>

      </div>

      {/* Content */}

      <div className="card">

        <h2> Content</h2>

        <strong>Word Count</strong>

        <p>{content.wordCount}</p>

      </div>

    </div>
  );
}

export default AuditCard;