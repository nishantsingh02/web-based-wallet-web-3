import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { useState } from "react";

interface ETHWalletProps {
    mnemonic: string
}

function ETH_wallet({ mnemonic }: ETHWalletProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

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
            <span>Account {index} - {addr}</span>
            
          </div>
        ))}
      </div>

    </div>
  );
}

export default ETH_wallet;
