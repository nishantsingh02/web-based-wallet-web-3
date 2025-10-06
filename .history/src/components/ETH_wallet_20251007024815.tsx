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
    localStorage.setItem("ethAddresses", JSON.stringify(addresses));
    localStorage.setItem("ethCurrentIndex", currentIndex.toString());
    
  }, [addresses, currentIndex]);

  const deleteWallet = (index: number) => {
    const newAddresses = addresses.filter((_, idx) => idx !== index);
    setAddresses(newAddresses);
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
            <div
  className="bg-red-500 w-10 h-10 flex items-center justify-center text-white font-bold rounded cursor-pointer hover:bg-red-600 transition-colors"
  onClick={() => console.log("Delete clicked")}
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
