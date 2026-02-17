import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AiPictures() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

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
                model: "imagen-4",
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
                    }
                }
            }
        });
    }

    const generateImage2 = async () => {
        if (!prompt.trim()) return;
        setLoading2(true);
        setImage2(null);

        try {
            const response = await axios.get(
                `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: "Bearer sk_eyH8UCyiHI9JCBZR9Q8KrqCBNuZaKSxv",
                    },
                    params: { model: "gptimage" },
                }
            );

            const imageUrl = URL.createObjectURL(response.data);
            setImage2(imageUrl);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading2(false);
        }
    };

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    useEffect(() => {
        return () => {
            if (image2) {
                URL.revokeObjectURL(image2);
            }
        };
    }, [image2]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            generateImage();
            generateImage2();
        }
    };

    const handleGenerate = () => {
        generateImage();
        generateImage2();
    };

    <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
    </button>

    return (
        <div className="mainBook">
            <div className="polli">AI Picture Generator</div>
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
                {loading ? "Generating..." : "Generate Image"}
            </button>
            <br />
            {loading && <div style={{ marginTop: "15px" }}>
                <div className="spinner"></div>
                ... Please wait, the image is being generated.
                <br />
                This version is still under development, so he needs more time and sometimes doesn't give an answer..</div>}

            {image && (
                <div style={{ marginTop: "20px" }}>
                    <img
                        src={image}
                        alt="Generated"
                        style={{ maxWidth: "100%", borderRadius: "8px" }}
                    />
                </div>
            )}
            <p style={{
                textAlign: "right",
                padding: "10px",
                fontSize: "16px",
                color: "gray"
            }}>
                Imagen 4 (alpha)

            </p>

            <br />
            {loading2 && <div style={{ marginTop: "15px" }}>
                <div className="spinner"></div>
                ... Please wait, the image two is being generated.</div>}

            {image2 && (
                <div style={{ marginTop: "20px" }}>
                    <img
                        src={image2}
                        alt="Generated"
                        style={{ maxWidth: "100%", borderRadius: "8px" }}
                    />
                </div>
            )}
            <p style={{
                textAlign: "right",
                padding: "10px",
                fontSize: "16px",
                color: "gray"
            }}>
                GPT Image 1 Mini
            </p>
        </div>
    );
}

