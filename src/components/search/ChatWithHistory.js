import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ChatWithHistory() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalTok, setTotalTok] = useState(0);
  const [aiModels, setAiModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("gemini");

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
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Error: " + error.message }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getModels();
  }, []);


  const getModels = async () => {
    const urlM = `https://gen.pollinations.ai/text/models?key=pk_N3F6nCawqxWe8khl`

    try {
      const response = await axios.get(urlM);
      const data = response.data

      setAiModels(data);

    } catch (err) {
      setError(err);
    }
  }

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
        Or choose another model, some don't work for some reason
      </div>
      <div className="aiGrid">
        {aiModels.map((mod, id) => (
          <div key={id} className="aiButt"><a
            onClick={() => setSelectedModel(mod.name)}
          >{mod.name}</a>
            <p>
              {mod.description}
            </p>
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
      </div>

      <textarea
        rows="3"
        style={{ width: "70%", padding: "10px", margin: "10px" }}
        placeholder="Enter your query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
        total tokens {totalTok} from a maximum of 8192
      </div>
    </div>
  );
}