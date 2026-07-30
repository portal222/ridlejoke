import React, { useState, useEffect } from "react";
import models from "../../../public/modelsRouteWay.json";

export default function ChatRouteWay() {
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reasoningAi, setReasoningAi] = useState("");
    const [redAlert, setRedAlert] = useState([]);
    const [timerActive, setTimerActive] = useState(false);
    const [timerActiveW, setTimerActiveW] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [secondsW, setSecondsW] = useState(0);
    const [selectedModel, setSelectedModel] = useState("Ling free");
    const [selectedDescription, setSelectedDescription] = useState("LING");
    const [modelId, setModelId] = useState("ling-3.0-flash:free");

    const [requestCount, setRequestCount] = useState(0);


    const dailyLimit = 200;

    useEffect(() => {
        let interval;
        if (timerActiveW) {
            interval = setInterval(() => {
                setSecondsW((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActiveW]);

    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive]);



    const getModelR = async () => {
        if (!question) return;

        setLoading(true);
        setError(null);

        const url = "https://ridlejoke-proxy.kvaka32.workers.dev/routeway";
        const options = {
            method: "POST",
            headers: {
            
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: question },
                ],
                max_tokens: 8192,
                model: modelId,
                temperature: 0.7,
            }),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            const answer = data.choices?.[0]?.message?.content || "Nema odgovora";
            const reasoning = data.choices?.[0]?.message?.reasoning || "nema razmisljanja";

            setChatHistory((prev) => [
                ...prev,
                { question, answer }
            ]);
            setReasoningAi(reasoning);
            setRedAlert(
                data.error?.message
                    ? `⚠️ Error from server: ${data.error.message}`
                    : ""
            )
            setQuestion("");
            setRequestCount(prev => prev + 1);
            setSeconds(0);
            setTimerActive(true);
            setTimerActiveW(false);
        ;

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            getModelR();
            setSecondsW(0);
            setTimerActiveW(true);
            setTimerActive(false);
        }
    };

    const handleClick = () => {
        setSecondsW(0);
        setTimerActiveW(true);
        setTimerActive(false);
        getModelR();
    };

    return (
        <>
            <div className="mainBook">
                <div className="polli">Chat with {selectedModel}

                </div>
                <div className="polli2">
                    {selectedDescription}

                </div>
                <div className="polli2">
                    Or choose another RouteWay model
                </div>
                <br/>
                <p style={{ fontSize: "14px", color: "gray" }}>Note: You have a limit of 200 requests per day according to the OpenRouter API.</p>
                <p style={{ fontSize: "14px", color: "gray" }}>
                    {requestCount >= dailyLimit
                        ? "⚠️ You have reached the daily limit of 200 requests. Please try again tomorrow."
                        : `ℹ️ You have used ${requestCount} of your ${dailyLimit} daily requests.`}
                </p>
                <div className="aiGrid">
                    {models.map((mod, id) => (
                        <div key={id} className="aiButt"
                            onClick={() => {
                                setSelectedModel(mod.name);
                                setSelectedDescription(mod.description);
                                setModelId(mod.id);
                            }}
                        >
                            <a>{mod.name}</a>
                        </div>
                    ))}
                </div>
                <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }} className="total">
                    {chatHistory.map((item, index) => (
                        <div key={index} className="chatItem">
                            <p><strong>You:</strong> {item.question}</p>
                            <div><strong>Ai:</strong>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                    {reasoningAi && (
                        <div style={{ fontSize: "15px" }}>{reasoningAi}</div>
                    )}
                    {redAlert && (
                        <div style={{ fontSize: "15px", color: "red", fontWeight: "bold" }}>
                            {redAlert || "Došlo je do nepoznate greške. Pokušajte ponovo kasnije."}
                        </div>
                    )}
                </div>

                <textarea
                    rows="3"
                    style={{ width: "70%", padding: "10px", margin: "10px" }}
                    placeholder="Еnter your query...."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}

                />
                <br />
                <button
                    onClick={handleClick}
                    disabled={loading || !question}>
                    {loading ? (
                        <>
                            <div className="spinner"></div> Sending...
                        </>
                    ) : (
                        "Send"
                    )}
                </button>
                <br />
                {timerActiveW && (
                    <p style={{ fontSize: "20px", margin: "10px" }}>
                        ⏱ {"Answer generation time " + secondsW + " s or " + (secondsW / 60).toFixed(1) + " m"}
                    </p>
                )}
                {timerActive && (
                    <p style={{ fontSize: "20px", margin: "10px" }}>
                        ⏱ {"Еlapsed time since last reply  " + seconds + " s or " + (seconds / 60).toFixed(1) + " m"}
                    </p>
                )}

                {error && <p style={{ color: "red" }}>Error: {error}</p>}
               

            </div>
        </>
    );
}
