import React, { useState, useEffect } from "react";
import axios from "axios";
import models from "../../../public/unoRouter.json";

export default function ChatUnoRouter() {
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalTok, setTotalTok] = useState(0);
    const [selectedModel, setSelectedModel] = useState("gpt-oss-120b:free");
    const [selectedDescription, setSelectedDescription] = useState("gpt-oss-120bis our most powerful open-weight model, which fits into a single H100 GPU (117B parameters with 5.1B active parameters).");
    const [seconds, setSeconds] = useState(0);
    const [secondsW, setSecondsW] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [timerActiveW, setTimerActiveW] = useState(false);
    const [timestamp, setTimestamp] = useState();
    const [Aimisao, setAimisao] = useState([]);
    const [aiModels, setAiModels] = useState("GPT");
    const [inputpic, setInputpic] = useState("");


    const [requestCount, setRequestCount] = useState(0);


    const dailyLimit = 100;

    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive]);

    useEffect(() => {
        let interval;
        if (timerActiveW) {
            interval = setInterval(() => {
                setSecondsW((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActiveW]);

    const sendQuery = async () => {
        if (!query.trim()) return;

        const newMessages = [...messages, { role: "user", content: query }];
        setMessages(newMessages);
        setQuery("");
        setLoading(true);

        try {
            const { data } = await axios.post(
                " https://ridlejoke-proxy.kvaka32.workers.dev/unorouter",

                {
                    model: selectedModel,
                    messages: newMessages,
                    max_tokens: 8192,
                    temperature: 1
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            const answer = data.choices?.[0]?.message?.content || "No answer.";
            const tokens = data.usage.total_tokens;
            const misao = data.choices?.[0]?.message?.reasoning_content || data.choices?.[0]?.message?.reasoning || "no reasoning";
            setAimisao(misao);
            setTotalTok(tokens);
            setMessages([...newMessages, { role: "assistant", content: answer }]);
            setSeconds(0);
            setTimerActive(true);
            setTimerActiveW(false);
            setTimestamp(data.created);
            setRequestCount(prev => prev + 1);


        } catch (error) {
            setMessages([...newMessages, { role: "assistant", content: "Error: " + error.message }]);
        } finally {
            setLoading(false);
        }
    };

    const date = new Date(timestamp * 1000);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendQuery();
            setSecondsW(0);
            setTimerActiveW(true);
            setTimerActive(false);
        }
    };

    const handleClick = () => {
        setSecondsW(0);
        setTimerActiveW(true);
        setTimerActive(false);
        sendQuery();
    };


    const renderWithLinks = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, i) => {
            if (urlRegex.test(part)) {
                return (
                    <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div className="mainBook">
            <div className="polli">Chat with {aiModels}
            </div>
            <div className="polli2">
                {selectedDescription}
            </div>
            {inputpic && (
                <div className="polli2">
                    {inputpic}

                </div>
            )}
            <div className="polli2">
                Or choose another UnoRouter model
            </div>
            <br />
            <p style={{ fontSize: "14px", color: "gray" }}>Note: You have a limit of one question per minute.</p>
            <p style={{ fontSize: "14px", color: "gray" }}>
                {requestCount >= dailyLimit
                    ? "⚠️ You have reached the limit for this model, try again next week, or choose another model."
                    : `ℹ️ You have used ${requestCount} of requests. Еach model has its limitations, if one doesn't work get another`}
            </p>
            <div className="aiGrid">
                {models.map((mod, id) => (
                    <div key={id} className="aiButt"><a
                        onClick={() => {
                            setSelectedModel(mod.id);
                            setSelectedDescription(mod.description);
                            setAiModels(mod.name);
                            setInputpic(mod.inputpic);

                        }}
                    >{mod.name}</a>

                    </div>
                ))}
            </div>

            <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }} className="total">
                {messages.map((msg, idx) => (
                    <div key={idx} style={{ marginBottom: "8px" }}>
                        <strong>{msg.role === "user" ? "You:" : "AI:"}</strong>{" "}
                        <span dangerouslySetInnerHTML={{ __html: renderWithLinks(msg.content) }}></span>
                    </div>
                ))}
                <p style={{ fontSize: "14px" }}>{Aimisao}</p>
                {date && (
                    <p style={{ fontSize: "12px", textAlign: "right", padding: "5px" }}>created: {date.toLocaleTimeString()}</p>
                )}

            </div>

            <textarea
                rows="3"
                style={{ width: "70%", padding: "10px", margin: "10px" }}
                placeholder="Enter your query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <br />
            <button
                onClick={handleClick}
                disabled={loading || !query}>
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
            <div style={{ fontSize: "10px", padding: "10px 20px" }}>
                total tokens {totalTok}
            </div>
        </div>
    );
}