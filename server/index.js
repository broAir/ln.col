const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Solana connection
const connection = new Connection(
  process.env.SOLANA_RPC_URL || clusterApiUrl('devnet'),
  'confirmed'
);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    network: process.env.SOLANA_NETWORK || 'devnet'
  });
});

// Get Candy Machine Info
app.get('/api/candy-machine/:id', async (req, res) => {
  try {
    const candyMachineId = req.params.id;
    const candyMachinePublicKey = new PublicKey(candyMachineId);
    
    // Get account info
    const accountInfo = await connection.getAccountInfo(candyMachinePublicKey);
    
    if (!accountInfo) {
      return res.status(404).json({ error: 'Candy Machine not found' });
    }

    res.json({
      success: true,
      candyMachineId,
      exists: true,
      accountInfo: {
        lamports: accountInfo.lamports,
        owner: accountInfo.owner.toBase58(),
        executable: accountInfo.executable,
      }
    });
  } catch (error) {
    console.error('Error fetching candy machine:', error);
    res.status(500).json({ 
      error: 'Failed to fetch candy machine',
      message: error.message 
    });
  }
});

// Get NFT metadata
app.post('/api/nft/metadata', async (req, res) => {
  try {
    const { mint } = req.body;
    
    if (!mint) {
      return res.status(400).json({ error: 'Mint address is required' });
    }

    const mintPublicKey = new PublicKey(mint);
    const accountInfo = await connection.getAccountInfo(mintPublicKey);
    
    res.json({
      success: true,
      mint,
      exists: accountInfo !== null,
      data: accountInfo ? {
        lamports: accountInfo.lamports,
        owner: accountInfo.owner.toBase58()
      } : null
    });
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
    res.status(500).json({ 
      error: 'Failed to fetch NFT metadata',
      message: error.message 
    });
  }
});

// Mint NFT endpoint (client will sign the transaction)
app.post('/api/mint', async (req, res) => {
  try {
    const { walletAddress, candyMachineId } = req.body;
    
    if (!walletAddress || !candyMachineId) {
      return res.status(400).json({ 
        error: 'Wallet address and Candy Machine ID are required' 
      });
    }

    // Validate addresses
    const walletPublicKey = new PublicKey(walletAddress);
    const candyMachinePublicKey = new PublicKey(candyMachineId);
    
    // Return instruction data for client-side signing
    res.json({
      success: true,
      message: 'Ready to mint',
      data: {
        walletAddress: walletPublicKey.toBase58(),
        candyMachineId: candyMachinePublicKey.toBase58(),
        network: process.env.SOLANA_NETWORK || 'devnet'
      }
    });
  } catch (error) {
    console.error('Error preparing mint:', error);
    res.status(500).json({ 
      error: 'Failed to prepare mint',
      message: error.message 
    });
  }
});

// Get network status
app.get('/api/network/status', async (req, res) => {
  try {
    const version = await connection.getVersion();
    const slot = await connection.getSlot();
    const blockHeight = await connection.getBlockHeight();
    
    res.json({
      success: true,
      network: process.env.SOLANA_NETWORK || 'devnet',
      version,
      slot,
      blockHeight,
      rpcUrl: process.env.SOLANA_RPC_URL || clusterApiUrl('devnet')
    });
  } catch (error) {
    console.error('Error fetching network status:', error);
    res.status(500).json({ 
      error: 'Failed to fetch network status',
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Network: ${process.env.SOLANA_NETWORK || 'devnet'}`);
  console.log(`RPC URL: ${process.env.SOLANA_RPC_URL || clusterApiUrl('devnet')}`);
});

module.exports = app;
