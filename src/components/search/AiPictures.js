import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AiPictures() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

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
                    params: { model: "zimage" },
                }
            );

            const imageUrl = URL.createObjectURL(response.data);
            setImage(imageUrl);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

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
            />
            <br />
            <button onClick={generateImage} disabled={loading}>
                {loading ? "Generating..." : "Generate Image"}
            </button>
            <br />
            {loading && <div style={{ marginTop: "15px" }}>
                <div className="spinner"></div>
                ... Please wait, the image is being generated.</div>}

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

