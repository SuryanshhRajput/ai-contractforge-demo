import { useState } from "react";

export default function ContractForgePanel() {
  const [english, setEnglish] = useState("");
  const [solidity, setSolidity] = useState("");
  const [explanation, setExplanation] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // Connect MetaMask
  async function connectWallet() {
    if (!(window as any).ethereum) return alert("Install MetaMask");
    try {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
    } catch (e) {
      console.error(e);
      alert("MetaMask connection failed");
    }
  }

  // Stub Generate button
  function generateContract() {
    setSolidity(`// MilestoneEscrow contract (stub)
pragma solidity ^0.8.28;
contract MilestoneEscrow {}`);
    setExplanation("This contract locks funds until delivery; pays payee if delivered on time, else refunds payer.");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-semibold">AI ContractForge — Demo</h2>
      <div className="flex justify-between items-center">
        <button className="px-3 py-1 border rounded" onClick={connectWallet}>
          {walletAddress ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : "Connect MetaMask"}
        </button>
      </div>

      <textarea
        className="w-full h-24 p-3 border rounded"
        placeholder='Describe contract in plain English e.g. "If Alice delivers by Sept 15, Bob pays 2 ETH..."'
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
      />

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-sky-600 text-white rounded" onClick={generateContract}>
          Generate
        </button>
      </div>

      <div>
        <h3 className="font-medium">Generated Solidity</h3>
        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-60">
          <code>{solidity || "No code yet"}</code>
        </pre>
      </div>

      <div>
        <h3 className="font-medium">Plain-English Explanation</h3>
        <div className="bg-gray-50 p-3 rounded">{explanation || "No explanation yet"}</div>
      </div>
    </div>
  );
}
