import { useState } from "react";
import { generateMnemonic } from "bip39";

import "./App.css";
import ETH_wallet from "./components/ETH_wallet";
import SOL_wallet from "./components/SOL_wallet";

function App() {

  const [mnemonic, setMnemonic] = useState(() => {
    return localStorage.getItem("mnemonic") || "";
  });

  // const [mnemonic, setMnemonic] = useState("");

  const words = mnemonic ? mnemonic.split(" ") : [];

  const handleGenrate = () => {
    if(mnemonic) {
      alert("Seed phrase already generated! Save it securely.");
      return;
    }
    const mn = generateMnemonic();
    
  }

  return (
    <div className="">
      <div className="wallet-card">
        {/* Header */}
        <h1 className="wallet-title">My Crypto Wallet</h1>
        <p className="wallet-subtitle">Securely store your seed phrase and wallets</p>

        {/* Seed Phrase Section */}
        <div className="seed-section">
          <h2 className="section-title">Seed Phrase</h2>
          <div className="mnemonic-container">
            {words.map((word, index) => (
              <div key={index} className="mnemonic-box">
                {word}
              </div>
            ))}
          </div>
          <button
            className="generate-btn"
            onClick={() => {
              const mn = generateMnemonic();
              setMnemonic(mn);
              localStorage.setItem("mnemonic", mn);
            }}
          >
            Generate Seed Phrase
          </button>
        </div>

        {/* ETH Wallet Section */}
        <ETH_wallet mnemonic={mnemonic} />

              {/* SOL Wallet Section */}
        <SOL_wallet mnemonic= {mnemonic} />
      </div>
      
    </div>
  );
}

export default App;
