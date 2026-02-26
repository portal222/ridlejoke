import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AiMusic() {
  const [prompt, setPrompt] = useState("");
  const [music, setMusic] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateMusic = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setMusic(null);

    try {
      const response = await axios.get(
        `https://gen.pollinations.ai/audio/${encodeURIComponent(prompt)}`,
        {
          headers: {
            Authorization: "Bearer sk_eyH8UCyiHI9JCBZR9Q8KrqCBNuZaKSxv",
          },
          params: {
            model: "elevenlabs",
            // duration: 60,
          },
          responseType: "blob", // ključna izmena
        }
      );

      const audioUrl = URL.createObjectURL(response.data);
      setMusic(audioUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (music) {
        URL.revokeObjectURL(music);
      }
    };
  }, [music]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      generateMusic();
    }
  };

  const handleGenerate = () => {
    generateMusic();
  };

  return (
    <div className="mainBook">
      <div className="polli">AI Music Generator</div>
      <textarea
        rows="3"
        style={{ width: "70%", padding: "10px", margin: "10px" }}
        placeholder="Enter prompt for music"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Music"}
      </button>
      <br />
      {loading && (
        <div style={{ marginTop: "15px" }}>
          <div className="spinner"></div>
          ... Please wait, the music is being generated.
          <br />
          This version is still under development, so it needs more time.
        </div>
      )}
      <br />
      {music && (
        <audio controls src={music} style={{ marginTop: "20px" }}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

