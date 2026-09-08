import React, { useState, useEffect } from "react";
import axios from "axios";
// import models from "../../../public/modelsOpenR.json";

export default function ChatWithOpenRouterImage() {
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalTok, setTotalTok] = useState(0);
    const [selectedModel, setSelectedModel] = useState("poolside/laguna-xs-2.1:free");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [secondsW, setSecondsW] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [timerActiveW, setTimerActiveW] = useState(false);
    const [timestamp, setTimestamp] = useState();
    const [Aimisao, setAimisao] = useState([]);
    const [aiModels, setAiModels] = useState("chose one");
    const [imageData, setImageData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [models, setModels] = useState([]);
    const [modality, setModality] = useState('');


    const [requestCount, setRequestCount] = useState(0);


    const dailyLimit = 50;

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

       useEffect(() => {
            getModels();
        }, []);
    
        const getModels = async () => {
            const url = `https://openrouter.ai/api/v1/models`;
            
            try {
                const response = await axios.get(url);
                const data = response.data;
    
                const freeModels = data.data.filter(
                    (model) => model.pricing?.completion === "0"
    
                );
                setModels(freeModels);

    
            } catch (err) {
                setError(err);
            }
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

                "https://ridlejoke-proxy.kvaka32.workers.dev/openrouter",

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
            setTimerActive(true);
            setTimerActiveW(false);
        } finally {
            setLoading(false);
            setTimerActive(true);
            setTimerActiveW(false);
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
            <div className="polli2" style={{fontStyle: "italic"}}>
                {modality}
            </div>
            <div className="polli2">
                Or choose another OpenRouter model
            </div>
            <br />
            <p style={{ fontSize: "14px", color: "gray" }}>Note: You have a limit of 50 requests per day according to the OpenRouter API.</p>
            <p style={{ fontSize: "14px", color: "gray" }}>
                {requestCount >= dailyLimit
                    ? "⚠️ You have reached the daily limit of 100 requests. Please try again tomorrow."
                    : `ℹ️ You have used ${requestCount} of your ${dailyLimit} daily requests.`}
            </p>
            <div className="aiGrid">
                {models.slice(1, 6).map((mod, id) => (
                    <div key={id} className="aiButt"><a
                        onClick={() => {
                            setSelectedModel(mod.id);
                            setSelectedDescription(mod.description);
                            setAiModels(mod.name);
                            setModality(mod?.architecture.modality);
                        }}
                    >{mod.name}</a>
                    </div>
                ))}
            </div>
             <div className="aiGrid">
                {models.slice(12, 16).map((mod, id) => (
                    <div key={id} className="aiButt"><a
                        onClick={() => {
                            setSelectedModel(mod.id);
                            setSelectedDescription(mod.description);
                            setAiModels(mod.name);
                            setModality(mod?.architecture.modality);
                        }}
                    >{mod.name}</a>
                    </div>
                ))}
            </div>

            <div style={{ border: "1px solid #dcedf4ff", padding: "10px", margin: "10px" }} className="total">
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