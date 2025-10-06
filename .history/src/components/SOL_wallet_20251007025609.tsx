import { useState, useEffect } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair, PublicKey } from "@solana/web3.js";

interface SOLWalletProps {
  mnemonic: string;
}

function SOL_wallet({ mnemonic }: SOLWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedKeys = localStorage.getItem("solPublicKeys");
    const savedIndex = localStorage.getItem("solCurrentIndex");

    if (savedKeys) {
      const keysArray = JSON.parse(savedKeys).map((k: string) => new PublicKey(k));
      setPublicKeys(keysArray);
    }
    if (savedIndex) setCurrentIndex(Number(savedIndex));
  }, []);

  // Persist to localStorage whenever publicKeys or currentIndex changes
  useEffect(() => {
    localStorage.setItem(
      "solPublicKeys",
      JSON.stringify(publicKeys.map((k) => k.toBase58()))
    );
    localStorage.setItem("solCurrentIndex", currentIndex.toString());
  }, [publicKeys, currentIndex]);

  // Add new SOL wallet
  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    setPublicKeys([...publicKeys, keypair.publicKey]);
    setCurrentIndex(currentIndex + 1);
  };

  // Delete a wallet
  const deleteWallet = (index: number) => {
    const newKeys = publicKeys.filter((_, idx) => idx !== index);
    setPublicKeys(newKeys);

    // Optional: adjust currentIndex to avoid overwriting
    if (index < currentIndex) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="mt-4">
      <button
        onClick={addWallet}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-4"
      >
        Add SOL Wallet
      </button>

      <div className="addresses-container flex flex-col gap-2">
        {publicKeys.map((p, idx) => (
          <div
            key={idx}
            className="address-card flex justify-between items-center bg-gray-100 p-2 rounded shadow"
          >
            <span>Account {idx + 1} - {p.toBase58()}</span>
            <div
              onClick={() => deleteWallet(idx)}
              className="bg-red-500 w-10 h-10 flex items-center justify-center text-white font-bold rounded-full cursor-pointer hover:bg-red-600 hover:scale-110 transition-all shadow-md"
            >
              Delete
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SOL_wallet;
