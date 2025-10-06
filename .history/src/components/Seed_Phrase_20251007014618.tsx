import React, { useState, useRef } from 'react';

// --- Placeholder Mnemonic Generator ---
// We cannot use the external 'bip39' library in this environment, 
// so this simple function is a placeholder to demonstrate the non-regenerating React logic.
const simpleWordList = [
    "alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", 
    "india", "juliett", "kilo", "lima", "mike", "november", "oscar", "papa", 
    "quebec", "romeo", "sierra", "tango", "uniform", "victor", "whiskey", "xray", 
    "yankee", "zulu", "apple", "banana", "cherry", "donut", "grape", "lemon"
];

const generateMnemonic = () => {
    const phrase = [];
    // Generate a 12-word phrase from the simple list
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * simpleWordList.length);
        phrase.push(simpleWordList[randomIndex]);
    }
    return phrase.join(" ");
};
// ----------------------------------------

function SeedPhraseGenerator() {
  // 1. Use useRef to hold the *initial* seed phrase.
  // The value is generated only when the component is first created (mounted).
  const initialMnemonicRef = useRef(generateMnemonic());

  // 2. Use useState for the currently displayed phrase.
  // Initialize state using the stable value from the ref.
  const [mnemonic, setMnemonic] = useState(initialMnemonicRef.current);
  const words = mnemonic.split(" ");
  const [showTooltip, setShowTooltip] = useState(false);

  // Helper to copy the phrase to the clipboard
  const copyToClipboard = () => {
    // Note: document.execCommand('copy') is used here for broader compatibility
    // in various sandboxed environments (like this one).
    const el = document.createElement('textarea');
    el.value = mnemonic;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    // Show confirmation tooltip
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };
  
  // Function to explicitly generate a brand new phrase
  const generateNewPhrase = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    // Note: We DO NOT update initialMnemonicRef.current.
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-gray-800 p-6 sm:p-10 rounded-xl shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-400 mb-6 border-b-2 border-teal-500/50 pb-2">
          Secure Seed Phrase (Stable)
        </h1>
        <p className="text-gray-400 mb-8 text-sm sm:text-base">
          This phrase was generated **only once** upon loading. It will not regenerate until you click "Generate New Phrase." Write it down and keep it safe!
        </p>

        {/* Seed Phrase Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 bg-gray-700 p-4 rounded-lg mb-8">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-gray-900 rounded-lg text-sm font-mono shadow-inner hover:bg-gray-700 transition duration-150"
            >
              <span className="text-teal-400 font-bold w-6 text-center text-xs mr-2">{index + 1}.</span>
              <span className="truncate">{word}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={generateNewPhrase}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-500/50"
          >
            Generate New Phrase
          </button>
          
          <div className="relative flex-1">
            <button
              onClick={copyToClipboard}
              className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-teal-500/50"
            >
              Copy to Clipboard
            </button>
            {/* Tooltip for Copy Confirmation */}
            <div
              className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-green-500 text-white text-sm rounded-lg shadow-xl transition-opacity duration-300 ${
                showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              Copied!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeedPhraseGenerator;
