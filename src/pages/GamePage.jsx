import { useEffect, useState } from "react";

function GamePage() {
  const [status, setStatus] = useState("Warte auf Sprachbefehl...");
  const [lastWord, setLastWord] = useState("");
  const [color, setColor] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {

    createRandom();

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

  const createRandom = () => {
    // get random text
    const colors = ['Schwarz', 'Rot', 'Grün', 'Blau', 'Gelb'];
    const index = Math.floor(Math.random() * colors.length);
    setColor(colors[index]);

    // get random text color
    const rgbs = {
      Schwarz: 'rgb(0, 0, 0)',
      Rot: 'rgb(255, 0, 0)',
      Grün: 'rgb(0, 128, 0)',
      Blau: 'rgb(0, 0, 255)',
      Gelb: 'rgb(255, 255, 0)'
    }
    const keys = Object.keys(rgbs);
    const rgbIndex = Math.floor(Math.random() * colors.length);
    setTextColor(rgbs[keys[rgbIndex]]);
  }
  
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Sprachsteuerung mit React</h1>
      <p>{status}</p>
      <p style={{ color: textColor}}>{color}</p>
      {lastWord && <p><strong>Letzter Befehl:</strong> {lastWord}</p>}

    </div>

  );
}

export default GamePage