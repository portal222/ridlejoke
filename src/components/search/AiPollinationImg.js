import React, { useState, useEffect } from "react";

export default function AiPollinationImg() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => {
                if (timerActive) {
                    setSeconds((prev) => prev + 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive]);

    const generateImage = () => {
        if (!prompt.trim()) return;

        setLoading(true);

        const imageUrl =
            `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

        setImage(imageUrl);
        setLoading(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSeconds(0);
            setTimerActive(true);
            generateImage();
        }
    };

    const handleGenerate = () => {
        setSeconds(0);
        setTimerActive(true);
        generateImage();
    };

    <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
    </button>

    return (
        <div className="mainBook">
            <div className="polli"> Pollinations picture Generator</div>
            <br />
            <p style={{ fontSize: "14px", color: "gray" }}>There is no limit, if it doesn't take a picture right away, try again. The quality is questionable.</p>

            <textarea
                rows="3"
                style={{ width: "70%", padding: "10px", margin: "10px" }}
                placeholder="Enter prompt and wait"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}

            />
            <br />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate Images"}
            </button>
            <br />
            {loading && <div style={{ marginTop: "15px" }}>
                <div className="spinner"></div>
                ... Please wait, the image is being generated.
                <br />
            </div>}
            {timerActive && (
                <p style={{ fontSize: "20px", margin: "10px" }}>
                    ⏱ Generation time {seconds} s ({(seconds / 60).toFixed(1)} m)
                </p>
            )}

            {image && (
                <div style={{ marginTop: "20px" }}>
                    <img
                        src={image}
                        alt="Generated"
                        style={{ maxWidth: "100%", borderRadius: "8px" }}
                    />
                </div>
            )}
        </div>
    );
}

