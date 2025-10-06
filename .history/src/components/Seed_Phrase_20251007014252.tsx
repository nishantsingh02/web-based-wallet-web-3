import { useState } from "react";
import { generateMnemonic } from "bip39";
import "../App.css";

// Use an initializer function in useState to generate the seed phrase only once
// when the component is first rendered.
function Seed_Phrase() {
  const [mnemonic, setMnemonic] = useState(() => {
    // Generate the initial mnemonic only on the first render
    return generateMnemonic();
  });

  // split all words into a single word in an array
  const words = mnemonic ? mnemonic.split(" ") : [];

  return (
    <div>
      <h1 className="text-3xl font-bold underline"> Seed Phrase </h1>

      <div className="mnemonic-boxes">
        {words.map((word, index) => (
          <div key={index} className="word-box">
            <span className="word-index">{index + 1}.</span> {word}
          </div>
        ))}
      </div>

      <button
        onClick={async () => {
          // This button now explicitly creates a *new* seed phrase
          const mn = generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create New Seed Phrase
      </button>
    </div>
  );
}

export default Seed_Phrase;