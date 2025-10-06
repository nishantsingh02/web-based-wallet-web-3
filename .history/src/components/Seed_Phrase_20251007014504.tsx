import { useState, useRef } from "react"; // 👈 Import useRef
import { generateMnemonic } from "bip39";
import "../App.css";

function Seed_Phrase() {
  // 1. Use useRef to hold the stable mnemonic value.
  // The function is called only once when the component is first created.
  const mnemonicRef = useRef(generateMnemonic());

  // 2. Use useState for a value that changes *only* when the user clicks the button.
  // Initialize this state with the stable value from the ref.
  const [mnemonic, setMnemonic] = useState(mnemonicRef.current);

  // split all words into a single word in an array
  const words = mnemonic.split(" ");

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
        onClick={() => {
          // When clicked, generate a NEW mnemonic
          const newMnemonic = generateMnemonic();
          // Update the *display state*
          setMnemonic(newMnemonic);
          // NOTE: We are NOT updating mnemonicRef.current, as that's meant to hold the initial, stable value.
        }}
      >
        Create New Seed Phrase
      </button>
    </div>
  );
}

export default Seed_Phrase;