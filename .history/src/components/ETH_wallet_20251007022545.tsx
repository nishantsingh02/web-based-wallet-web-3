import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useState, useEffect } from "react";

interface ETHWalletProps {
    mnemonic: string;
}

function ETH_wallet({ mnemonic }: ETHWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  // Load addresses from localStorage on mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem("ethAddresses");
    const savedIndex = localStorage.getItem("ethCurrentIndex");
    if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
    if (savedIndex) setCurrentIndex(Number(savedIndex));
  }, []);

  // Update localStorage whenever addresses change
  useEffect(() => {
    localStorage.setItem("ethAddresses", JSON.stringify(addresses));
    localStorage.setItem("ethCurrentIndex", currentIndex.toString());
  }, [addresses, currentIndex]);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}/0`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey: string = child.privateKey;
    const wallet = new Wallet(privateKey);

    setAddresses([...addresses, wallet.address]);
    setCurrentIndex(currentIndex + 1);
  };

  const deleteWallet = (index: number) => {
    const newAddresses = addresses.filter((_, idx) => idx !== index);
    setAddresses(newAddresses);
  };

  return (
    <div>
      <button
        className="generate-btn"
        onClick={addWallet}
      >
        Add ETH Wallet
      </button>

      <div className="addresses-container">
        {addresses.map((addr, idx) => (
          <div key={idx} className="address-card flex justify-between items-center">
            <span>Account {idx + 1} - {addr}</span>
            <button
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => deleteWallet(idx)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ETH_wallet;
