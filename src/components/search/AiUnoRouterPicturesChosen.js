import React, { useState, useEffect } from "react";
import axios from "axios";
import pictureUno from "../../../public/pictureUnoRouter.json";

export default function AiUnoRouterPicturesChosen() {
    const [prompt, setPrompt] = useState("");
    const [chosenAi, setChosenAi] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  


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
        if (!prompt) {
            setError('Molimo vas unesite opis slike.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setImage('');

        try {
            const requestBody = {
                model: chosenAi,
                prompt: prompt,
                size: "1024x1024",
                response_format: "url" || "b64_json",
            };

            // const response = await fetch('https://ridlejoke-proxy.kvaka32.workers.dev/unoimages', {
            const response = await fetch('https://ridlejoke-proxy.kvaka32.workers.dev/unoimageschosen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Greška: ${response.status} - ${errorData.error?.message || 'Nepoznata greška'}`);
            }

            const data = await response.json();

            console.log("detalji za slike po pozivu", data);

            if (data.data && data.data.length > 0) {

                if (data.data[0].url) {
                    setImage(data.data[0].url);
                }

                else if (data.data[0].b64_json) {
                    setImage(`data:image/png;base64,${data.data[0].b64_json}`);
                }
            } else {
                throw new Error('Nije pronađen URL slike u odgovoru.');
            }

        } catch (err) {
            console.error('Došlo je do greške:', err);
            setError(err.message || 'An error occurred while generating the image.');
            setTimerActive(false);
        
        } finally {
            setIsLoading(false);
            setTimerActive(false);

        }
    };

    const handleKeyDownChoose = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

        }
    };

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
            <div className="polli">{chosenAi} picture Generator</div>

            <div className="polli2">
                Enter UnoRouter model
            </div>
            <div style={{ display: "flex" }}>
                <br />
            </div>
            <textarea
                rows="1"
                style={{ width: "20%", padding: "10px", margin: "10px" }}
                placeholder="Enter AI model"
                value={chosenAi}
                onChange={(e) => setChosenAi(e.target.value)}
                onKeyDown={handleKeyDownChoose}
            />
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

