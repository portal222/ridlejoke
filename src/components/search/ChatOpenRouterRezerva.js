import React, { useState } from "react";

export default function ChatOpenRouter() {
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]); // lista pitanja i odgovora
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reasoningAi, setReasoningAi] = useState("");
    const [redAlert, setRedAlert] = useState([]);

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
                // model: "poolside/laguna-m.1:free",
                // model: "z-ai/glm-4.5-air:free",
           
                model: "poolside/laguna-xs.2:free",

                

                temperature: 0.7,
            }),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            const answer = data.choices?.[0]?.message?.content || "Nema odgovora";
            const reasoning = data.choices?.[0]?.message?.reasoning || "nema razmisljanja";
            console.log("open router odgovor", data);
            // dodaj u istoriju
            setChatHistory((prev) => [
                ...prev,
                { question, answer }
            ]);
            setReasoningAi(reasoning);
            setRedAlert(data.error.message)
            setQuestion(""); // resetuj input
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mainBook">
            <h2>Open Router Chat</h2>

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
                    <div style={{ fontSize: "15px" }}>{redAlert}</div>
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
