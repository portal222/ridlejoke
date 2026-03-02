import React, { useState, useEffect } from "react";
import axios from "axios";
import picturePolli from "../../../public/pictureModelsPolli.json";

export default function AiPictures() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState("flux");
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



    const generateImage = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setImage(null);

        try {
            const response = await axios.get(
                `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: "Bearer sk_eyH8UCyiHI9JCBZR9Q8KrqCBNuZaKSxv",
                    },
                    params: {

                        model: selectedModel
                    },
                }
            );

            const imageUrl = URL.createObjectURL(response.data);
            setImage(imageUrl);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setTimerActive(false);


        }
    };

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);



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
            <div className="polli">{selectedModel} Picture Generator</div>
            <h2></h2>
            <div className="polli2">
                Or choose another Pollinations model
            </div>
            <div className="aiGrid">
                {picturePolli.map((mod, id) => (
                    <div key={id} className="aiButt"><a
                        onClick={() => {
                            setSelectedModel(mod.name);
                        }}
                    >{mod.name}</a>

                    </div>
                ))}
            </div>
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

