import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center my-3">
      <div className="spinner-border text-primary" role="status" style={{ width: "2rem", height: "2rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
