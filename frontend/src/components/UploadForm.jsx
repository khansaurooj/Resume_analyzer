import React, { useState } from "react";

export default function UploadForm({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDesc) return alert("Upload resume + job description");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_desc", jobDesc);

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-4"
    >
      <div className="mb-3">
        <label className="form-label">Upload Resume</label>
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Job Description</label>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          className="form-control"
          rows="3"
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Analyze Resume
      </button>
    </form>
  );
}
