import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useEffect, useState } from "react";

interface ETHWalletProps {
  mnemonic: string;
}

function ETH_wallet({ mnemonic }: ETHWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem("ethAddresses");
    const savedIndex = localStorage.getItem("ethCurrentIndex");

    if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
    if (savedIndex) setCurrentIndex(Number(savedIndex));
  }, []);

  // Save to localStorage whenever addresses or index change
  useEffect(() => {
    localStorage.setItem("ethAddresses", JSON.stringify(addresses));
    localStorage.setItem("ethCurrentIndex", currentIndex.toString());
  }, [addresses, currentIndex]);

  // Add new ETH wallet
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

  // Delete wallet
  const deleteWallet = (index: number) => {
    const newAddresses = addresses.filter((_, idx) => idx !== index);
    setAddresses(newAddresses);
    if (index < currentIndex) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="mt-6">
      <button
        onClick={addWallet}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-4"
      >
        Add ETH Wallet
      </button>

      <div className="addresses-container flex flex-col gap-3">
        {addresses.map((addr, idx) => (
          <div
            key={idx}
            className="address-card flex justify-between items-center bg-gray-100 p-3 rounded shadow"
          >
            <span className="break-all">Account {idx + 1} - {addr}</span>
            <div
              onClick={() => deleteWallet(idx)}
              className="bg-red-500 w-10 h-10 flex items-center justify-center text-white font-bold rounded-full cursor-pointer hover:bg-red-600 hover:scale-110 transition-all shadow-md"
            >
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ETH_wallet;
