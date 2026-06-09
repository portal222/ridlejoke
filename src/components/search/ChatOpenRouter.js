import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ChatOpenRouter() {
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reasoningAi, setReasoningAi] = useState("");
    const [redAlert, setRedAlert] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("NVIDIA: Nemotron 3.5 Content Safety (free)");
    const [selectedDescription, setSelectedDescription] = useState("NVIDIA Nemotron 3.5 Content Safety is a compact 4B-parameter multimodal guardrail model from NVIDIA, fine-tuned from Google Gemma-3-4B.");
    const [modelId, setModelId] = useState("nvidia/nemotron-3.5-content-safety:free");
    const [modality, setModality] = useState([]);
    const [requestCount, setRequestCount] = useState(0);

    const dailyLimit = 50;

    useEffect(() => {
        getModels();
    }, []);

    const getModels = async () => {
        const url = `https://openrouter.ai/api/v1/models`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        Authorization: "Bearer REMOVED",
                    }
                }
            );

            const data = response.data;
            const freeModels = data.data.filter(
                (model) => model.pricing?.completion === "0"
            );
            setModels(freeModels);
            console.log("openrouter besplatni modeli", response);

        } catch (err) {
            setError(err.message);
        }
    };

    const getModelR = async () => {
        if (!question) return;

        setLoading(true);
        setError(null);

        const url = "https://openrouter.ai/api/v1/chat/completions";
        const options = {
            method: "POST",
            headers: {
                Authorization: "Bearer REMOVED",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: question },
                ],
                max_tokens: 150,
                model: modelId,
                temperature: 0.7,
            }),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            const answer = data.choices?.[0]?.message?.content || "Nema odgovora";
            const reasoning = data.choices?.[0]?.message?.reasoning || "nema razmisljanja";
            console.log("open router odgovor", data);

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

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mainBook">
            <div className="polli">Chat with {selectedModel}
            </div>
            <div className="polli2">
                {selectedDescription}
            </div>
            <div className="polli2">
                {modality}
            </div>
            <div className="polli2">
                Or choose another Open Router model
            </div>
            <p style={{ fontSize: "14px", color: "gray" }}>Note: You have a limit of 50 requests per day according to the OpenRouter API.</p>
            <p style={{ fontSize: "14px", color: "gray" }}>
                {requestCount >= dailyLimit
                    ? "⚠️ Dostigli ste dnevni limit od 50 requesta. Pokušajte sutra ponovo."
                    : `ℹ️ Iskoristili ste ${requestCount} od ${dailyLimit} dnevnih requesta.`}
            </p>
            <div className="aiGrid">
                {models.map((mod, id) => (
                    <div key={id} className="aiButt"
                        onClick={() => {
                            setSelectedModel(mod.name);
                            setSelectedDescription(mod.description);
                            setModelId(mod.id);
                            setModality(mod.architecture.modality)
                        }}
                    ><a
                    >{mod.name}</a>
                    </div>
                ))}
            </div>

            <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }} className="total">
                {chatHistory.map((item, index) => (
                    <div key={index} className="chatItem">
                        <p><strong>Ti:</strong> {item.question}</p>
                        <p><strong>Asistent:</strong> {item.answer}</p>
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
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Unesi pitanje..."
            />
            <button onClick={getModelR} disabled={loading || !question}>
                Pošalji
            </button>

            {loading && <p>Učitavam odgovor...</p>}
            {error && <p style={{ color: "red" }}>Greška: {error}</p>}
        </div>
    );
}
