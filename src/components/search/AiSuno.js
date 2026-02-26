import React, { useState, useEffect } from "react";

function AiSuno() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [secondsW, setSecondsW] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerActiveW, setTimerActiveW] = useState(false);

  // Jedan hook za oba timera
  useEffect(() => {
    let interval;
    if (timerActive || timerActiveW) {
      interval = setInterval(() => {
        if (timerActive) {
          setSeconds((prev) => prev + 1);
        } else if (timerActiveW) {
          setSecondsW((prev) => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerActiveW]);

  const generateVideo = async () => {
    if (!prompt.trim()) return;
    if (loading) return; // zaštita od duplog poziva

    setLoading(true);
    setVideoUrl(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 800000); //  timeout

    try {
      const response = await fetch("https://api.airforce/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk-air-mgWKgdOE29YNozAAMpFv5LNTZr627U2iWbzPuEDpOVb3EQDjtYgeo9TpDOAo0BwY"
        },
        body: JSON.stringify({
          model: "suno-v5",
          prompt: prompt,
          n: 1,
          response_format: "url"
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error("Status:", response.status, response.statusText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.data && data.data[0]?.url) {
        setVideoUrl(data.data[0].url);
        setSeconds(0);
        setTimerActive(true);
        setTimerActiveW(false);
        console.log("video generator podaci", data);
      }
    } catch (error) {
      console.error("Greška u mreži:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSecondsW(0);
      setTimerActiveW(true);
      setTimerActive(false);
      generateVideo();
    }
  };

  const handleClick = () => {
    setSecondsW(0);
    setTimerActiveW(true);
    setTimerActive(false);
    generateVideo();
  };

  return (
    <div className="mainBook">
      <div className="polli">Suno-v5 Music Generator</div>
      <textarea
        rows="3"
        style={{ width: "70%", padding: "10px", margin: "10px" }}
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <br />
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Generating..." : "Generate music"}
      </button>

      <br />
      {loading && (
        <div style={{ marginTop: "15px" }}>
          <div className="spinner"></div>
       ... Please wait it takes a little longer, the Music is being generated.
        </div>
      )}

      {timerActiveW && (
        <p style={{ fontSize: "18px", margin: "10px" }}>
          ⏱ Music generation time {secondsW} s ({(secondsW / 60).toFixed(1)} m)
        </p>
      )}
      {timerActive && (
        <p style={{ fontSize: "18px", margin: "10px" }}>
          ⏱ Wait at least a minute until the next prompt {seconds} s ({(seconds / 60).toFixed(1)} m)
        </p>
      )}

      {videoUrl && (
        <div>
          <h3 style={{ padding: "10px" }}>Generated music:</h3>
          <video src={videoUrl} controls style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}

export default AiSuno;