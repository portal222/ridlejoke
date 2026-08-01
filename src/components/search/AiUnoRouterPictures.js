import React, { useState, useEffect } from "react";
import axios from "axios";
import pictureUno from "../../../public/pictureUnoRouter.json";

export default function AiUnoRouterPictures() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState("cogview-4-250304:free");
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





    // Funkcija koja se poziva kada korisnik klikne na dugme
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
                model: selectedModel, // Zameni sa željenim modelom
                prompt: prompt,
                size: "768x1024",
                response_format: "url", // Može biti i "b64_json"
                // n: 1, // Opciono, broj slika
            };

            // 3. Pošalji POST zahtev ka UnoRouter API-ju
            const response = await fetch('https://ridlejoke-proxy.kvaka32.workers.dev/unoimages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(requestBody),
            });

            // 4. Proveri da li je zahtev uspešan
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Greška: ${response.status} - ${errorData.error?.message || 'Nepoznata greška'}`);
            }

            // 5. Obradi odgovor
            const data = await response.json();
            console.log('Odgovor API-ja:', data);

            // Odgovor obično izgleda ovako: { created: 12345, data: [ { url: "..." } ] }
            if (data.data && data.data.length > 0) {
                // Ako je response_format bio "url", dobićeš URL
                if (data.data[0].url) {
                    setImage(data.data[0].url);
                }
                // Ako je response_format bio "b64_json", dobićeš base64 string
                else if (data.data[0].b64_json) {
                    setImage(`data:image/png;base64,${data.data[0].b64_json}`);
                }
            } else {
                throw new Error('Nije pronađen URL slike u odgovoru.');
            }

        } catch (err) {
            console.error('Došlo je do greške:', err);
            setError(err.message || 'Došlo je do greške prilikom generisanja slike.');
        } finally {
            setIsLoading(false);
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
            <div className="polli">{selectedModel} Picture Generator Omni generations</div>
            <h2></h2>
            <div className="polli2">
                Or choose another model
            </div>
            <div className="aiGrid">
                {pictureUno.map((mod, id) => (
                    <div key={id} className="aiButt"
                        onClick={() => {
                            setSelectedModel(mod.name);
                        }}
                    ><a

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

