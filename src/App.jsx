import { useEffect, useState } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SyncLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  // Clear chat messages on refresh
  useEffect(() => {
    setResponse([]); // Ensures chat clears on refresh
  }, []);

  async function fetchChatResponseFromGemini() {
    try {
      if (!apiKey) {
        console.error("API key is missing!");
        return;
      }
      setLoading(true);

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      let responseText = await result.response.text();

      // 🛠 Clean response: Remove unnecessary characters and format new lines
      responseText = responseText.replace(/\*/g, ""); // Removes *
      responseText = responseText.replace(/\n/g, "\n\n"); // Proper paragraph spacing

      const newResponse = [...response, { prompt, response: responseText }];
      setResponse(newResponse);
      setPrompt("");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setLoading(false);
    }
  }

  // Handles Enter key press for form submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && prompt.trim()) {
      fetchChatResponseFromGemini();
    }
  };

  return (
    <>
      <h1 className="heading">Chat Bot</h1>
      <div className="chatbot_container">
        <div className="chatbot_response_container">
          {response?.map((res, index) => (
            <div key={index} className="response">
              <p className="chatbot_prompt"><strong>You:</strong> {res.prompt}</p>
              <p className="chatbot_response">
                <strong>Bot:</strong> 
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{res.response}</ReactMarkdown>
              </p>
            </div>
          ))}

          {loading && (
            <SyncLoader
              color={"#dad0ef"}
              loading={loading}
              cssOverride={override}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>

        <div className="chatbot_input">
          <input
            type="text"
            name="input"
            placeholder="Enter your question..."
            className="input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown} // Auto-submit on Enter
          />
          <button type="button" onClick={fetchChatResponseFromGemini} disabled={!prompt.trim()}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
