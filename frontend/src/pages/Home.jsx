import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultCard from "../components/ResultCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
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
    <div className="flex flex-col items-center p-8 space-y-6">
      <h1 className="text-3xl font-bold text-purple-700">
        Resume Analyzer
      </h1>
      <UploadForm onSubmit={handleAnalysis} />
      {loading && <LoadingSpinner />}
      {result && <ResultCard data={result} />}
    </div>
  );
}
