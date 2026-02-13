import React, { useState, useEffect } from "react";
import axios from "axios";
import modelsJson from "../../../public/models.json";

export default function ChatWithHistory() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalTok, setTotalTok] = useState(0);
  const [selectedModel, setSelectedModel] = useState("gemini-fast");
  const [selectedDescription, setSelectedDescription] = useState("Google Gemini 2.5 Flash Lite - Ultra Fast & Cost-Effective");
  const [timestamp, setTimestamp] = useState();


  const sendQuery = async () => {
    if (!query.trim()) return;

    const newMessages = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setQuery("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://gen.pollinations.ai/v1/chat/completions",
        {
          model: selectedModel,
          messages: newMessages,
          max_tokens: 8192,
          temperature: 1
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer sk_eyH8UCyiHI9JCBZR9Q8KrqCBNuZaKSxv"
          }
        }
      );

      const answer = data.choices?.[0]?.message?.content || "No answer.";
      const tokens = data.usage.total_tokens;

      setTotalTok(tokens);

      setMessages([...newMessages, { role: "assistant", content: answer }]);
      setTimestamp(data.created)


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
    }
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
      <div className="polli">Chat with {selectedModel}

      </div>
      <div className="polli2">
        {selectedDescription}
      </div>
      <div className="polli2">
        Or choose another model
      </div>
      <div className="aiGrid">
        {modelsJson.map((mod, id) => (
          <div key={id} className="aiButt"><a
            onClick={() => {
              setSelectedModel(mod.name);
              setSelectedDescription(mod.description);
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
        <p style={{ fontSize: "12px", textAlign: "right", padding: "5px" }}>created: {date.toLocaleTimeString()}</p>

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
        onClick={sendQuery}
        disabled={loading}>
        {loading ? (
          <>
            <div className="spinner"></div> Sending...
          </>
        ) : (
          "Send"
        )}
      </button>
      <br />
      <div style={{ fontSize: "10px", padding: "10px" }}>
        total tokens {totalTok}
      </div>
    </div>
  );
}