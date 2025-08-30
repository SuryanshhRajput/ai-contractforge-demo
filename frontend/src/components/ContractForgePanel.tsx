import React, { useState } from "react";

export default function ContractForgePanel() {
  const [english, setEnglish] = useState("");
  const [solidity, setSolidity] = useState("");
  const [explanation, setExplanation] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

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

  function generateContract() {
    setSolidity(`// MilestoneEscrow contract (stub)
pragma solidity ^0.8.28;
contract MilestoneEscrow {}`);
    setExplanation(
      "This contract locks funds until delivery; pays payee if delivered on time, else refunds payer."
    );
  }

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">AI ContractForge</h2>
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Describe Contract (Plain English)</label>
        <textarea
          className="w-full p-4 border rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder='E.g. "If Alice delivers by Sept 15, Bob pays 2 ETH..."'
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={generateContract}
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          Generate Contract
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Generated Solidity</h3>
        <pre className="bg-gray-100 rounded-xl p-4 overflow-auto max-h-64 text-gray-800">
          <code>{solidity || "// Solidity code will appear here..."}</code>
        </pre>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Plain-English Explanation</h3>
        <div className="bg-gray-50 p-4 rounded-xl text-gray-800">
          {explanation || "Explanation will appear here..."}
        </div>
      </div>
    </div>
  );
}
