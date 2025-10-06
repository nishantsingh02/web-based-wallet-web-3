import { useState } from "react";
import { generateMnemonic } from "bip39";
import "../App.css";

function Seed_Phrase() {
  const [mnemonic, setMnemonic] = useState(() => {
    try {
      return localStorage.getItem("seed_mnemonic") || "";
    } catch {
      return "";
    }
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const words = mnemonic ? mnemonic.split(" ") : [];

  const handleGenerate = () => {
    if (mnemonic) {
      alert("Seed phrase already generated. Save it securely.");
      return;
    }
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const mn = generateMnemonic(); // synchronous in bip39
      setMnemonic(mn);
      try {
        localStorage.setItem("seed_mnemonic", mn);
      } catch (e) {
        console.warn("Could not persist mnemonic to localStorage", e);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate mnemonic");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!mnemonic) return;
    try {
      await navigator.clipboard.writeText(mnemonic);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  const handleReset = () => {
    // confirmation so devs don't wipe by mistake
    if (!confirm("Reset will remove the seed from this browser. Continue?")) return;
    setMnemonic("");
    try {
      localStorage.removeItem("seed_mnemonic");
    } catch {}
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Seed Phrase</h1>

      <div className="mnemonic-boxes" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {words.map((word, index) => (
          <div key={index} className="word-box" style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd" }}>
            {word}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={handleGenerate} disabled={!!mnemonic || isGenerating}>
          {mnemonic ? "Seed Phrase Generated" : isGenerating ? "Generating..." : "Create Seed Phrase"}
        </button>
        <button onClick={handleCopy} disabled={!mnemonic} style={{ marginLeft: 8 }}>
          Copy
        </button>
        <button onClick={handleReset} disabled={!mnemonic} style={{ marginLeft: 8 }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Seed_Phrase;
