import { useState } from "react";
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

  return (
    <div>
      <button
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          console.log(derivedSeed);
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey; // genrate the public and private key pair where we only select .secretKey that is a private key
          const keypair = Keypair.fromSecretKey(secret); // this can genrate kepair object that contain .publicKey and .secretkey
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey]);
        }}
      >
        Add SOL Wallet
      </button>

         {/* render the public keys keys  */}
      <div className="addresses-container" >
        {publicKeys.map((p, idx) => (
          <div key ={idx} className="address-card" >SOL - {p.toBase58()}</div>
        ))}
      </div>
    </div>
  );
}

export default SOL_wallet;
