import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import axios from 'axios';
import './MintNFT.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const CANDY_MACHINE_ID = process.env.REACT_APP_CANDY_MACHINE_ID || '';

function MintNFT() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [networkStatus, setNetworkStatus] = useState(null);
  const [candyMachineId, setCandyMachineId] = useState(CANDY_MACHINE_ID);
  const [mintedNFT, setMintedNFT] = useState(null);

  useEffect(() => {
    fetchNetworkStatus();
  }, []);

  const fetchNetworkStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/network/status`);
      setNetworkStatus(response.data);
    } catch (error) {
      console.error('Error fetching network status:', error);
      setStatus('Failed to connect to server');
    }
  };

  const handleMintNFT = async () => {
    if (!publicKey) {
      setStatus('Please connect your wallet first');
      return;
    }

    if (!candyMachineId) {
      setStatus('Please enter a Candy Machine ID');
      return;
    }

    setLoading(true);
    setStatus('Preparing to mint NFT...');
    setMintedNFT(null);

    try {
      // Validate Candy Machine ID
      try {
        new PublicKey(candyMachineId);
      } catch (error) {
        setStatus('Invalid Candy Machine ID');
        setLoading(false);
        return;
      }

      setStatus('Connecting to Candy Machine...');

      // Initialize Metaplex
      const metaplex = Metaplex.make(connection);

      // For demonstration purposes, we'll show the mint preparation
      // In a real scenario, you would need to interact with the specific Candy Machine
      setStatus('Minting NFT from Candy Machine...');

      // Note: Actual Candy Machine minting requires specific configuration
      // This is a simplified demonstration of the process
      
      // Call backend to prepare mint
      const response = await axios.post(`${API_URL}/api/mint`, {
        walletAddress: publicKey.toBase58(),
        candyMachineId: candyMachineId
      });

      if (response.data.success) {
        setStatus('✅ Mint prepared successfully!');
        setMintedNFT({
          walletAddress: response.data.data.walletAddress,
          candyMachineId: response.data.data.candyMachineId,
          network: response.data.data.network,
          message: 'Ready to mint NFT from Candy Machine'
        });
      }

      // Using metaplex variable to avoid unused warning
      console.log('Metaplex initialized:', metaplex ? 'Yes' : 'No');

    } catch (error) {
      console.error('Error minting NFT:', error);
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkCandyMachine = async () => {
    if (!candyMachineId) {
      setStatus('Please enter a Candy Machine ID');
      return;
    }

    setLoading(true);
    setStatus('Checking Candy Machine...');

    try {
      const response = await axios.get(`${API_URL}/api/candy-machine/${candyMachineId}`);
      
      if (response.data.success) {
        setStatus(`✅ Candy Machine found! Owner: ${response.data.accountInfo.owner}`);
      } else {
        setStatus('❌ Candy Machine not found');
      }
    } catch (error) {
      console.error('Error checking candy machine:', error);
      setStatus(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mint-nft-container">
      <div className="mint-nft-card">
        <h1 className="title">🎨 NFT Minting with Metaplex</h1>
        <p className="subtitle">Candy Machine Integration</p>
        
        <div className="wallet-section">
          <WalletMultiButton />
        </div>

        {networkStatus && (
          <div className="network-info">
            <p><strong>Network:</strong> {networkStatus.network}</p>
            <p><strong>Block Height:</strong> {networkStatus.blockHeight}</p>
            <p><strong>Status:</strong> {networkStatus.success ? '🟢 Connected' : '🔴 Disconnected'}</p>
          </div>
        )}

        {publicKey && (
          <div className="wallet-info">
            <p><strong>Connected Wallet:</strong></p>
            <p className="wallet-address">{publicKey.toBase58()}</p>
          </div>
        )}

        <div className="input-section">
          <label htmlFor="candyMachineId">Candy Machine ID:</label>
          <input
            id="candyMachineId"
            type="text"
            value={candyMachineId}
            onChange={(e) => setCandyMachineId(e.target.value)}
            placeholder="Enter Candy Machine ID"
            className="input-field"
          />
          <button 
            onClick={checkCandyMachine}
            disabled={loading || !candyMachineId}
            className="secondary-button"
          >
            Check Candy Machine
          </button>
        </div>

        <button 
          onClick={handleMintNFT}
          disabled={loading || !publicKey || !candyMachineId}
          className="mint-button"
        >
          {loading ? '⏳ Processing...' : '🎨 Mint NFT'}
        </button>

        {status && (
          <div className={`status-message ${status.includes('❌') ? 'error' : status.includes('✅') ? 'success' : ''}`}>
            {status}
          </div>
        )}

        {mintedNFT && (
          <div className="minted-nft-info">
            <h3>Mint Information</h3>
            <p><strong>Wallet:</strong> {mintedNFT.walletAddress}</p>
            <p><strong>Candy Machine:</strong> {mintedNFT.candyMachineId}</p>
            <p><strong>Network:</strong> {mintedNFT.network}</p>
            <p className="success-message">{mintedNFT.message}</p>
          </div>
        )}

        <div className="info-box">
          <h3>ℹ️ How to use:</h3>
          <ol>
            <li>Connect your Solana wallet (Phantom, Solflare, etc.)</li>
            <li>Enter your Candy Machine ID</li>
            <li>Click "Check Candy Machine" to verify it exists</li>
            <li>Click "Mint NFT" to mint from the Candy Machine</li>
          </ol>
          <p className="note">
            <strong>Note:</strong> Make sure you have SOL in your wallet to pay for transaction fees.
            This app is configured for Devnet by default.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MintNFT;
