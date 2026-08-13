import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        setNetwork(parseInt(chainId, 16));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Listen for network/account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || null);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        setNetwork(parseInt(chainId, 16));
        window.location.reload(); // ensures UI updates correctly
      });
    }
  }, []);

  // Payment
  const handlePayment = async () => {
    if (!window.ethereum || !account) return;
    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: "0x9F86F409c802eb816F306B0b92ec6d12B0F92081", // replace with your receiving wallet
            value: "0x2386F26FC10000", // 0.01 ETH in hex
          },
        ],
      });
      alert("✅ Payment successful!");
    } catch (err) {
      alert("❌ Payment failed");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Blockchain Payment</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p className="mb-2">
            ✅ Connected: <span className="font-mono">{account}</span>
          </p>
          <p className="mb-2">
            Current Network:{" "}
            {network === 11155111
              ? "Sepolia Test Network (11155111)"
              : `Wrong Network (${network})`}
          </p>
          {network !== 11155111 && (
            <p className="text-red-500">
              ⚠️ Please switch to Sepolia Test Network in MetaMask
            </p>
          )}

          {network === 11155111 && (
            <button
              onClick={handlePayment}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Pay 0.01 ETH
            </button>
          )}
        </div>
      )}
    </div>
  );
}
