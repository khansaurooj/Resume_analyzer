import React from "react";
import UploadPage from "./components/UploadPage";

export default function App() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        background: "linear-gradient(to bottom right, #ffffff, #e0f0ff, #d0b3ff)"
      }}
    >
      <UploadPage />
    </div>
  );
}
