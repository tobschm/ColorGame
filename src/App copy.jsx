import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'

function App() {
  const [status, setStatus] = useState("Warte auf Sprachbefehl...");
  const [lastWord, setLastWord] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("❌ Dein Browser unterstützt keine Spracherkennung.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "de-DE";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setStatus("🎤 Mikrofon aktiviert – sprich jetzt!");
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

      setLastWord(transcript);
      setStatus(`Erkannt: "${transcript}"`);

      if (transcript.includes("weiter")) {
        handleWeiter();
      }
    };

    recognition.onerror = (event) => {
      setStatus(`Fehler: ${event.error}`);
    };

    recognition.start();

    // Cleanup bei Unmount
    return () => {
      recognition.stop();
    };
  }, []);

  const handleWeiter = () => {
    alert("➡️ Du hast 'weiter' gesagt!");
    setStatus("✅ Sprachbefehl erkannt: 'weiter'");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Sprachsteuerung mit React</h1>
      <p>{status}</p>
      {lastWord && <p><strong>Letzter Befehl:</strong> {lastWord}</p>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>

  );
}

export default App;
