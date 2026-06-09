import React, { useEffect, useState } from "react";

const MovieGenerator = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.json2video.com/v2/movies", {
          method: "POST",
          headers: {
            "x-api-key": Le1b74Ddo6gC0L9bmKgFSL6ADHdARAJIVXcAI05q,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resolution: "full-hd",
            scenes: [
              {
                elements: [
                  { type: "text", text: "Hello", duration: 5 }
                ]
              }
            ],
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setProject(data.project);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createMovie();
  }, []);

  return (
    <div>
      <h1>Movie Generator</h1>
      {loading && <p>Generating movie...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {project && (
        <div>
          <h2>Project Created</h2>
          <pre>{JSON.stringify(project, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MovieGenerator;
