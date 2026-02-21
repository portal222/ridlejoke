import React, { useState } from "react";

function AiVideo() {
    const [prompt, setPrompt] = useState("");

    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateVideo = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setVideoUrl(null);

        const response = await fetch("https://api.airforce/v1/images/generations", {
            method: "POST",
            headers: {
                "Authorization": "Bearer sk-air-mgWKgdOE29YNozAAMpFv5LNTZr627U2iWbzPuEDpOVb3EQDjtYgeo9TpDOAo0BwY",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "grok-imagine-video",
        
         
                prompt: prompt,
                n: 1,

                response_format: "url",
                sse: true,

            })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedData = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            accumulatedData += decoder.decode(value, { stream: true });
            const lines = accumulatedData.split("\n\n");
            accumulatedData = lines.pop();

            for (const line of lines) {
                if (line.startsWith("data: ")) {
                    const dataStr = line.slice(6);
                    if (dataStr === "[DONE]") continue;
                    if (dataStr === ": keepalive") continue;

                    const parsed = JSON.parse(dataStr);

                    if (parsed.data && parsed.data[0]?.url) {
                        setVideoUrl(parsed.data[0].url);
                        console.log("video generator podaci", parsed);
                    }
                }
            }
        }

        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            generateVideo();

        }
    };

    return (
        <div className="mainBook">
            <div className="polli">Grok Video Generator</div>
            <h2></h2>
            <textarea
                rows="3"
                style={{ width: "70%", padding: "10px", margin: "10px" }}
                placeholder="Еnter prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}

            />
            <br />
            <button onClick={generateVideo} disabled={loading}>
                {loading ? "Generating..." : "Generate 6 sec Video"}
            </button>
            <br />
            {loading && <div style={{ marginTop: "15px" }}>
                <div className="spinner"></div>
                ... Please wait, the Video is being generated.</div>}

            {videoUrl && (
                <div>
                    <h3 style={{ padding: "10px" }}>Generated Video:</h3>
                    <video
                        src={videoUrl}
                        controls
                        style={{ maxWidth: "100%" }}
                    />
                </div>
            )}
        </div>
    );
}

export default AiVideo;