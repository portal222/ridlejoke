import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AiPolliVid() {
    const [prompt, setPrompt] = useState("");
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive]);

    const generateImage = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setVideo(null);

        try {
            const response = await axios.get(
                `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: "Bearer sk_eyH8UCyiHI9JCBZR9Q8KrqCBNuZaKSxv",
                    },
                    params: {
                        model: "seedance",
                        duration: 7
                    },
                }
            );
            const imageUrl = URL.createObjectURL(response.data);
            setVideo(imageUrl);
            setSeconds(0);
            setTimerActive(true);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setTimerActive(false);

        }
    };

    useEffect(() => {
        return () => {
            if (video) {
                URL.revokeObjectURL(video);
            }
        };
    }, [video]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            generateImage();
            setSeconds(0);
            setTimerActive(true);
        }
    };

    const handleGenerate = () => {
        generateImage();
        setSeconds(0);
        setTimerActive(true);
    };

    return (
        <div className="mainBook">
            <div className="polli">Seedance Video Generator</div>
            <h2></h2>
            <textarea
                rows="3"
                style={{ width: "70%", padding: "10px", margin: "10px" }}
                placeholder="Enter prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}

            />
            <br />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate 7 sec Video"}
            </button>
            <br />
            {loading && <div style={{ marginTop: "15px" }}>
                <div className="spinner"></div>
                ... Please wait, the Video is being generated.
            </div>}
            {timerActive && (
                <p style={{ fontSize: "20px", margin: "10px" }}>
                    ⏱ {"Answer generation time " + seconds + " s or " + (seconds / 60).toFixed(1) + " m"}
                </p>
            )}

            {video && (
                <div style={{ marginTop: "20px" }}>
                    <video
                        src={video}
                        controls
                        style={{ maxWidth: "100%" }}
                    />
                </div>
            )}
        </div>
    );
}