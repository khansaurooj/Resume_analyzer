import React from "react";

export default function ResultCard({ data }) {
  return (
  <div className="d-flex justify-content-center">
    <div className="card shadow mb-4" style={{ maxWidth: "450px", width: "100%" }}>
      <div className="card-body">
        <h5 className="card-title text-primary">Analysis Results</h5>

        {data.error && (
          <p className="text-danger">{data.error}</p>
        )}

        {data.local_analysis && (
          <>
            <p><strong>Similarity:</strong> {data.local_analysis.similarity}</p>

            <div>
              <strong>Skills Found:</strong>{" "}
              {data.local_analysis.skills_found.map((s, i) => (
                <span key={i} className="badge bg-success me-1 mb-1">{s}</span>
              ))}
            </div>

            <div>
              <strong>Missing Skills:</strong>{" "}
              {data.local_analysis.missing_skills.map((s, i) => (
                <span key={i} className="badge bg-danger me-1 mb-1">{s}</span>
              ))}
            </div>

            <div>
              <strong>Suggestions:</strong>
              <ul>
                {data.local_analysis.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        <div>
          <h6 className="text-primary">AI Recommendations</h6>
          <p>{data.ai_recommendations}</p>
        </div>
      </div>
    </div>
  </div>
);

}
