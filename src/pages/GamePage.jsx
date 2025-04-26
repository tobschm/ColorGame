import { useEffect, useRef, useState } from "react";
import './GamePage.css';

function GamePage() {
  const [status, setStatus] = useState("Warte auf Sprachbefehl...");
  const [writtenColor, setWrittenColor] = useState("");
  const [textColorRGB, setTextColorRGB] = useState("");
  const [textColor, setTextColor] = useState("");
  const textColorRef = useRef("");
  const [round, setRound] = useState(1);
  const roundRef = useRef(1);
  const recognitionRef = useRef(null);

  const createRandom = () => {
    // get random text
    const colors = ['Schwarz', 'Rot', 'Grün', 'Blau', 'Gelb', 'Lila'];
    const index = Math.floor(Math.random() * colors.length);
    setWrittenColor(colors[index]);

    // get random text color
    const rgbs = {
      schwarz: 'rgb(0, 0, 0)',
      rot: 'rgb(255, 0, 0)',
      grün: 'rgb(0, 128, 0)',
      blau: 'rgb(0, 0, 255)',
      gelb: 'rgb(231, 231, 20)',
      lila: 'rgb(125, 27, 134)'
    };
    const keys = Object.keys(rgbs);
    const rgbIndex = Math.floor(Math.random() * colors.length);
    setTextColorRGB(rgbs[keys[rgbIndex]]);
    setTextColor(keys[rgbIndex]);
    textColorRef.current = keys[rgbIndex];
    console.log("🎲 Zufällige Ziel-Farbe (textColor):", keys[rgbIndex]);
  };

  useEffect(() => {
    createRandom();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("❌ Dein Browser unterstützt keine Spracherkennung.");
      return;
    }

    const newRecognition = new SpeechRecognition();
    newRecognition.lang = "de-DE";
    newRecognition.continuous = true;
    newRecognition.interimResults = false;
    recognitionRef.current = newRecognition;

    newRecognition.onstart = () => {
      setStatus("🎤 Mikrofon aktiviert – sprich jetzt!");
    };

    newRecognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

      setStatus(`Erkannt: "${transcript}"`);

      console.log("🎧 Erkanntes Wort:", transcript);

      if (textColorRef.current && transcript.includes(textColorRef.current)) {
        handleCorrectAnswer();
      }
    };

    newRecognition.onerror = (event) => {
      setStatus(`Fehler: ${event.error}`);
    };

    newRecognition.start();

    return () => {
      newRecognition.stop();
    };
  }, []);

  const handleCorrectAnswer = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.stop();
    setStatus("✅ Richtig!");
    setWrittenColor("");
    console.log(roundRef.current);
    if (roundRef.current < 10) {
      roundRef.current += 1;
      setTimeout(() => {
        createRandom();
        setRound(roundRef.current);
        recognition.start();
        setStatus("🎤 Mikrofon aktiviert – sprich jetzt!");
      }, 750);

    } else {
      setStatus("");
      setTextColorRGB('rgb(0, 0, 0)');
      setWrittenColor("Ende");
      if (recognition) {
        recognition.stop();
      }
    }
  };

  return (
    <div className='mainContainer'>
      <p className='status'>{status}</p>
      <p className='colorField' style={{ color: textColorRGB }}>{writtenColor}</p>
      <p className='round'>{round}/10</p>
    </div>
  );
}

export default GamePage;
