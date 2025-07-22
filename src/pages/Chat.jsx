import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Chat.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SyncLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import logo from "../assets/logo.png";
import { auth } from "../firebase";

export default function ChatBot({ user, onLogout }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto focus
  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  // Send message logic
  const sendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !apiKey || apiKey === "undefined") return;

    const fullPrompt = `You are a context-free chatbot. Answer only the following prompt: ${prompt}`;
    setMessages([...messages, { role: "user", text: prompt }]);
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      });

      let responseText = result.response.text().replace(/\*/g, "").replace(/\n/g, "\n\n");

      setMessages((prev) => [...prev, { role: "bot", text: responseText }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setPrompt("");
      setLoading(false);
    }
  }, [prompt, messages, apiKey]);

  const displayName = user?.displayName || user?.email || "User";
  const initial = displayName?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="chatbot-bg">
      {/* Header bar with avatar right */}
      <div className="chatbot-header" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '1.2rem 2rem',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      }}>
        git init        git init        <div className="chatbot-user-menu" style={{ position: 'relative' }}>
          <div
            className="chatbot-avatar"
            onClick={() => setShowMenu(!showMenu)}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(90deg, #c6286e, #e04a6a, #fa8072)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '2.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(198,40,110,0.15)',
              border: '3px solid #fff',
            }}
          >
            {initial}
          </div>
          {showMenu && (
            <div
              className="chatbot-dropdown"
              style={{
                position: 'absolute',
                top: 72,
                right: 0,
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                padding: '0.7rem 1.2rem',
                zIndex: 10,
              }}
            >
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#c6286e',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat messages */}
      <div
        className={
          "chatbot-response-center" +
          (messages.length === 0 ? " chatbot-center-content" : "")
        }
      >
        {messages.length === 0 ? (
          <>
            <div className="chatbot-greeting-bubble">
              Hello, How Can I Help <span className="chatbot-you">YOU!</span>
            </div>
            <form className="chatbot-input-bar" onSubmit={sendMessage}>
              <input
                ref={inputRef}
                className="chatbot-input"
                type="text"
                placeholder="Ask me anything!"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
              />
              <button className="chatbot-send" type="submit" disabled={!prompt.trim() || loading} style={{ background: 'linear-gradient(90deg, #c6286e, #e04a6a, #fa8072)', boxShadow: '0 2px 8px rgba(198,40,110,0.15)', borderRadius: '50%', width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', padding: 0 }}>
                <span className="chatbot-send-arrow">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 16H22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M18 12L22 16L18 20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </form>
          </>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-bubble ${
                  msg.role === "user" ? "chatbot-bubble-user" : "chatbot-bubble-bot"
                }`}
              >
                {msg.role === "user" ? (
                  <span>{msg.text}</span>
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                )}
              </div>
            ))}
            {loading && <SyncLoader color={"#404040"} loading={loading} size={10} />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Bottom Input */}
      {messages.length > 0 && (
        <form className="chatbot-input-bar-bottom" onSubmit={sendMessage}>
          <input
            ref={inputRef}
            className="chatbot-input"
            type="text"
            placeholder="Ask me anything!"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button className="chatbot-send" type="submit" disabled={!prompt.trim() || loading} style={{ background: 'linear-gradient(90deg, #c6286e, #e04a6a, #fa8072)', boxShadow: '0 2px 8px rgba(198,40,110,0.15)', borderRadius: '50%', width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', padding: 0 }}>
            <span className="chatbot-send-arrow">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 16H22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M18 12L22 16L18 20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
