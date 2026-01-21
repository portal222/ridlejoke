import React, { useState } from "react";
import axios from "axios";

export default function ChatWithHistory() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

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
          model: "qwen-coder",
          messages: newMessages,
          max_tokens:  8192,
          temperature: 1
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer sk_eyH8UCyiHI9JCBZR9Q8KrqCBNuZaKSxv" 
          }
        }
      );

      const answer = data.choices?.[0]?.message?.content || "Nema odgovora.";

      setMessages([...newMessages, { role: "assistant", content: answer }]);
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Greška: " + error.message }]);
    } finally {
      setLoading(false);
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
      <div className="polli">Chat with Qwen from Alibaba</div>

      <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px"}} className="total">
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "8px" }}>
            <strong>{msg.role === "user" ? "You:" : "AI:"}</strong>{" "}
            <span   dangerouslySetInnerHTML={{ __html: renderWithLinks(msg.content) }}></span>
          </div>
        ))}
      </div>

      <textarea
        rows="3"
        style={{ width: "70%", padding: "10px", margin: "10px"}}
        placeholder="Enter your query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}

      />
      <button onClick={sendQuery} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}