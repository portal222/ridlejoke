import React, { useState, useEffect } from "react";
import pictureAF from "../../../public/pictureModelsAF.json";

export default function AiPicturesAF() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState("imagen-4");
    const [seconds, setSeconds] = useState(0);
    const [secondsW, setSecondsW] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [timerActiveW, setTimerActiveW] = useState(false);
   

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

    const generateImage = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setImage(null);

        const response = await fetch("https://api.airforce/v1/images/generations", {
            method: "POST",
            headers: {
                "Authorization": "Bearer sk-air-mgWKgdOE29YNozAAMpFv5LNTZr627U2iWbzPuEDpOVb3EQDjtYgeo9TpDOAo0BwY",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: selectedModel,
                prompt: prompt,
                n: 1,
                response_format: "url",
                sse: true,
            })
        }).then(async response => {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedData = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                accumulatedData += decoder.decode(value, { stream: true });
                const lines = accumulatedData.split('\n\n');
                accumulatedData = lines.pop();

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.slice(6);
                        if (dataStr === '[DONE]') continue;
                        if (dataStr === ': keepalive') continue;

                        const imageUrl = JSON.parse(dataStr)
                        setImage(imageUrl.data?.[0].url)
                        setLoading(false);
                        setSeconds(0);
                        setTimerActive(true);
                        setTimerActiveW(false);
                    }
                }
            }
        });
    }

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
            setSecondsW(0);
            setTimerActiveW(true);
            setTimerActive(false);
            generateImage();
        }
    };

    const handleGenerate = () => {
        setSecondsW(0);
        setTimerActiveW(true);
        setTimerActive(false);
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
                Or choose another AirForce model
            </div>
            <div className="aiGrid">
                {pictureAF.map((mod, id) => (
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
        .</div>}


            {timerActiveW && (
                <p style={{ fontSize: "20px", margin: "10px" }}>
                    ⏱ Generation time {secondsW} s ({(secondsW / 60).toFixed(1)} m)
                </p>
            )}
            {timerActive && (
                <p style={{ fontSize: "20px", margin: "10px" }}>
                    ⏱ Wait at least a two minutes until the next prompt {seconds} s ({(seconds / 60).toFixed(1)} m)
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
            <br />
        </div>
    );
}

