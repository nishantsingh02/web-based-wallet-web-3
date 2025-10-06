import { useState } from "react";
import { generateMnemonic } from "bip39";
import "../App.css"

function Seed_Phrase() {
  const [mnemonic, setMnemonic] = useState("");
  const words = mnemonic ? mnemonic.split(" ") : []; // split all words into a single word in an array like this ["drum", "flower", "fox", "gate", "moon", "winter", "kite", "orange", "sand", "glass", "silver", "whale"]

  const handleGenrate = async () => {
    if (!mnemonic) {
      const mn = generateMnemonic();
    setMnemonic(mn); 
    } else {
      alert("seed ")
    }
  }


  return (
    <div>
      <h1 className="text-3xl font-bold underline"> Seed Phrase </h1>

      <div className="mnemonic-boxes">
        {words.map((word, index) => (
          <div key={index} className="word-box">
            {word}
          </div>
        ))}
      </div>

      <button
        onClick={async () => {
          const mn = generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>
    </div>
  );
}

export default Seed_Phrase;