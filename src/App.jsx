import { useState, useEffect } from "react";
import Welcome from "./pages/Welcome";
import ChatBot from "./pages/Chat";
import Auth from "./pages/Auth";
import { auth } from "./firebase";

function App() {
  // Listen for Google login success from Welcome page
  // Persist 'started' state in localStorage
  const [started, setStarted] = useState(() => {
    const persisted = localStorage.getItem('chatbot-started');
    return persisted === 'true';
  });
  useEffect(() => {
    localStorage.setItem('chatbot-started', started);
  }, [started]);
  useEffect(() => {
    const handler = () => {
      setStarted(true);
    };
    window.addEventListener('google-login-success', handler);
    return () => window.removeEventListener('google-login-success', handler);
  }, []);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    setStarted(false);
    localStorage.removeItem('chatbot-started');
  };

  if (!started) return <Welcome onStart={() => setShowAuth(true)} />;
  if (!user) return showAuth ? (
    <Auth
      onAuth={() => {
        setUser(auth.currentUser);
        setShowAuth(false);
        setStarted(true);
      }}
      onClose={() => setShowAuth(false)}
    />
  ) : null;
  return <ChatBot user={user} onLogout={handleLogout} />;
}

export default App;
