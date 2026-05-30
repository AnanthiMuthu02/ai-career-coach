import { useState } from "react";

function App() {
  const [cv, setCv] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  function parseResult(text) {
    const score = text.match(/SCORE:\s*(\d+)/)?.[1];
    const matching = text.match(/MATCHING:\s*(.+)/)?.[1];
    const missing = text.match(/MISSING:\s*(.+)/)?.[1];
    const summary = text.match(/SUMMARY:\s*([\s\S]+)/)?.[1];
    return { score, matching, missing, summary };
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://ai-career-coach-77d8.onrender.com", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setCv(data.cv_text);
    setUploadLoading(false);
  }

  async function analyseCV() {
    setLoading(true);
    setResult(null);

    const response = await fetch("https://ai-career-coach-77d8.onrender.com/analyse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cv, job_description: jobDescription }),
    });

    const data = await response.json();
    setResult(parseResult(data.result));
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", fontFamily: "Arial" }}>
      <h1>🤖 AI Career Coach</h1>

      <h3>Your CV:</h3>

      <div style={{ marginBottom: "10px" }}>
        <label style={{
          display: "inline-block",
          padding: "8px 20px",
          background: "#4F46E5",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px"
        }}>
          {uploadLoading ? "Reading PDF..." : "Upload CV (PDF)"}
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </label>
        <span style={{ marginLeft: "10px", color: "#6B7280", fontSize: "13px" }}>
          or paste your CV below
        </span>
      </div>

      <textarea
        rows={10}
        style={{ width: "100%", padding: "10px" }}
        value={cv}
        onChange={(e) => setCv(e.target.value)}
        placeholder="Paste your CV here, or upload a PDF above..."
      />

      <h3>Paste the Job Description:</h3>
      <textarea
        rows={10}
        style={{ width: "100%", padding: "10px" }}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
      />

      <br /><br />
      <button onClick={analyseCV} style={{
        padding: "10px 30px",
        fontSize: "16px",
        background: "#4F46E5",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
      }}>
        {loading ? "Analysing..." : "Analyse My CV"}
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>

          <div style={{ background: "#4F46E5", color: "white", padding: "20px", borderRadius: "8px", textAlign: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0 }}>Match Score</h2>
            <p style={{ fontSize: "48px", margin: 0, fontWeight: "bold" }}>{result.score}%</p>
          </div>

          <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
            <h3 style={{ color: "#16a34a" }}>✅ Matching Skills</h3>
            <p>{result.matching}</p>
          </div>

          <div style={{ background: "#fff7ed", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
            <h3 style={{ color: "#ea580c" }}>⚠️ Missing Skills</h3>
            <p>{result.missing}</p>
          </div>

          <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px" }}>
            <h3>📝 Rewritten CV Summary</h3>
            <p>{result.summary}</p>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;