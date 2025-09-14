import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultCard from "../components/ResultCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function UploadPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async (formData) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Failed to analyze resume" });
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="container py-5">
    <h1 className="text-center text-primary mb-4">Resume Analyzer</h1>
    
    {/* Centered small-width form */}
    <div className="mx-auto" style={{ maxWidth: "450px" }}>
      <UploadForm onSubmit={handleAnalysis} />
    </div>
    
    {loading && <LoadingSpinner />}
    {result && <ResultCard data={result} />}
  </div>
);

}
