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
    const [imageData, setImageData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


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

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target.result; // cela data URL
                    setImageData(base64);
                    setImagePreview(base64); // za prikaz
                };
                reader.readAsDataURL(file);
            } else {
                alert('Molimo prevucite sliku.');
            }
        }
    };



    const sendQuery = async () => {

        if (!query.trim() && !imageData) return;
        const userContent = [];
        if (query.trim()) userContent.push({ type: "text", text: query });
        if (imageData) userContent.push({ type: "image_url", image_url: { url: imageData } });
        const userMessage = { role: "user", content: userContent };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setQuery("");
        setImageData(null);
        setImagePreview(null);
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
            <p style={{ fontSize: "14px", color: "gray" }}>Note: You have a limit of one question per minute. Models change frequently, so if one doesn't work, try another.</p>
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
                        {Array.isArray(msg.content) ? (
                            msg.content.map((part, i) => {
                                if (part.type === "text") {
                                    return <span key={i} dangerouslySetInnerHTML={{ __html: renderWithLinks(part.text) }} />;
                                } else if (part.type === "image_url") {
                                    return <img key={i} src={part.image_url.url} alt="uploaded" style={{ maxHeight: "100px", display: "block" }} />;
                                }
                                return null;
                            })
                        ) : (
                            <span dangerouslySetInnerHTML={{ __html: renderWithLinks(msg.content) }} />
                        )}
                    </div>
                ))}
                {Aimisao && (
                    <p style={{ fontSize: "14px", color: "#555" }}>
                        <strong>Reasoning:</strong> {String(Aimisao)}
                    </p>
                )}
                {date && (
                    <p style={{ fontSize: "12px", textAlign: "right", padding: "5px" }}>
                        created: {date.toLocaleTimeString()}
                    </p>
                )}
            </div>




            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ border: imagePreview ? '2px solid #4CAF50' : '2px dashed #ccc', padding: '10px', borderRadius: '8px' }}
            >
                <textarea
                    rows="3"
                    style={{ width: "70%", padding: "10px", margin: "10px" }}
                    placeholder="Enter your query or drag an image here"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {imagePreview && (
                    <div style={{ marginTop: '10px' }}>
                        <img src={imagePreview} alt="preview" style={{ maxHeight: '150px' }} />
                        <button onClick={() => { setImageData(null); setImagePreview(null); }}>Ukloni</button>
                    </div>
                )}
            </div>
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