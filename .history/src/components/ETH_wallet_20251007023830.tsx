import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useEffect, useState } from "react";

interface ETHWalletProps {
    mnemonic: string
}

function ETH_wallet({ mnemonic }: ETHWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  // localstorage can only store string
  useEffect(() => {
    localStorage.setItem("ethAddresses", JSON.stringify(addresses)) // localstroge only store string you can't store an arry directly
    localStorage.setItem("ethCurrentIndex", currentIndex.toString());
  }, [addresses, currentIndex])

  const deleteWallet = (index: number) => {
    const newAddresses = addresses.filter((_, idx) => idx !== index);
    set
  }

  return (
    <div>
      <button
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic); // convert words → seed bytes
          const derivationPath = `m/44'/60'/${currentIndex}/0`;
          const hdNode = HDNodeWallet.fromSeed(seed); // create master wallet
          const child = hdNode.derivePath(derivationPath); // specific account
          const privateKey: string = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet.address]);
        }}
      >
        Add ETH Wallet
      </button>

        {/* render the public keys keys  */}
      <div className="addresses-container">
        {addresses.map((addr, idx) => (
          <div key={idx} className="address-card">
            <span>Account {idx + 1} - {addr}</span>
            <button onClick={() => deleteWallet(idx)}
             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors">
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ETH_wallet;
