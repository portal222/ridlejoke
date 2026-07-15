import React, { useState, useEffect } from "react";

function AiVideoJson() {
    const [prompt, setPrompt] = useState("");
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(false);
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

const generateVideo = async () => {
    if (!prompt.trim()) return;
    if (loading) return;

    setLoading(true);
    setVideoUrl(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 800000);

    try {
        // KORAK 1: Kreiraj projekat
        const createResponse = await fetch("https://ridlejoke-proxy.kvaka32.workers.dev/jsonvideo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                resolution: "full-hd",
                scenes: [{ elements: [{ type: "text", text: prompt, duration: 6 }] }]
            })
        });

        if (!createResponse.ok) {
            throw new Error("Greška pri kreiranju projekta");
        }

        const createData = await createResponse.json();
        const projectId = createData.project;

        if (!projectId) {
            throw new Error("Nije dobijen project ID");
        }

        console.log("Projekat kreiran, ID:", projectId);

        // KORAK 2: Pokreni renderovanje
        const renderResponse = await fetch("https://ridlejoke-proxy.kvaka32.workers.dev/render-video", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectId })
        });

        if (!renderResponse.ok) {
            throw new Error("Greška pri renderovanju");
        }

        console.log("Renderovanje pokrenuto, čekam...");

        // KORAK 3: Čekaj da se renderovanje završi (polling)
        let videoUrl = null;
        let attempts = 0;
        const maxAttempts = 60; // Maksimalno 60 pokušaja (oko 2 minuta)

        while (!videoUrl && attempts < maxAttempts) {
            attempts++;
            
            // Sačekaj 2 sekunde između provera
            await new Promise(resolve => setTimeout(resolve, 2000));

            const statusResponse = await fetch(`https://ridlejoke-proxy.kvaka32.workers.dev/video-status/${projectId}`, {
                method: "GET"
            });

            if (statusResponse.ok) {
                const statusData = await statusResponse.json();
                console.log(`Status (${attempts}/${maxAttempts}):`, statusData);

        // ISPRAVKA: status i url su u movie objektu
        const movie = statusData.movie;
        const projectStatus = movie?.status;
        const videoUrlFromApi = movie?.url;

                if (projectStatus === "done" && videoUrlFromApi) {
                    videoUrl = videoUrlFromApi;
                    break;
                } else if (projectStatus === "error") {
                    throw new Error("Greška pri renderovanju videa");
                }
            }
        }

        if (videoUrl) {
            setVideoUrl(videoUrl);
            setSeconds(0);
            setTimerActive(true);
            setTimerActiveW(false);
        } else {
            throw new Error("Video nije gotov nakon dužeg čekanja");
        }

        clearTimeout(timeoutId);

    } catch (error) {
        if (error.name === 'AbortError') {
            console.log("Zahtev je prekinut zbog timeout-a");
        } else {
            console.error("network error:", error);
        }
    } finally {
        setLoading(false);
    }
};

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSecondsW(0);
            setTimerActiveW(true);
            setTimerActive(false);
            generateVideo();
        }
    };

    const handleClick = () => {
        setSecondsW(0);
        setTimerActiveW(true);
        setTimerActive(false);
        generateVideo();
    };

    return (
        <div className="mainBook">
            <div className="polli">JSON Video Generator</div>
            <textarea
                rows="3"
                style={{ width: "70%", padding: "10px", margin: "10px" }}
                placeholder="Enter prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <br />
            <button onClick={handleClick} disabled={loading}>
                {loading ? "Generating..." : "Generate 6 sec Video"}
            </button>

            <br />
            {loading && (
                <div style={{ marginTop: "15px" }}>
                    <div className="spinner"></div>
                    ... Please wait, the Video is being generated.
                </div>
            )}

            {timerActiveW && (
                <p style={{ fontSize: "20px", margin: "10px" }}>
                    ⏱ Video generation time {secondsW} s ({(secondsW / 60).toFixed(1)} m)
                </p>
            )}
            {timerActive && (
                <p style={{ fontSize: "20px", margin: "10px" }}>
                    ⏱ Wait at least a two minutes until the next prompt {seconds} s ({(seconds / 60).toFixed(1)} m)
                </p>
            )}

            {videoUrl && (
                <div>
                    <h3 style={{ padding: "10px" }}>Generated Video:</h3>
                    <video src={videoUrl} controls style={{ maxWidth: "100%" }} />
                </div>
            )}
        </div>
    );
}

export default AiVideoJson;