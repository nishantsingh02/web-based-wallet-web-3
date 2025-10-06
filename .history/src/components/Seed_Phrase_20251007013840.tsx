import { useState, useRef } from "react";
import { generateMnemonic } from "bip39";
import "../App.css";

function Seed_Phrase() {
  const [mnemonic, setMnemonic] = useState("");
  const generatedOnce = useRef(false); // keeps track even after re-renders

  const words = mnemonic ? mnemonic.split(" ") : [];

  const handleGenerate = async () => {
    if (!generatedOnce.current) {
      const mn = generateMnemonic();
      setMnemonic(mn);
      generatedOnce.current = true; // lock future generation
    } else {
      alert("Seed phrase already generated! Save it securely.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Seed Phrase</h1>

      <div className="mnemonic-boxes">
        {words.map((word, index) => (
          <div key={index} className="word-box">
            {word}
          </div>
        ))}
      </div>

      <button onClick={handleGenerate}>
        {mnemonic ? "Seed Phrase Generated" : "Create Seed Phrase"}
      </button>
    </div>
  );
}

export default Seed_Phrase;
