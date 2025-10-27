# ln.col - NFT Minting Platform

A full-stack web application for minting NFTs using Metaplex Candy Machine on the Solana blockchain.

## Features

- 🎨 **React Frontend** - Modern, responsive UI for NFT minting
- 🚀 **Node.js/Express Backend** - RESTful API for Solana blockchain interaction
- 💎 **Solana Web3.js Integration** - Direct blockchain communication
- 🍬 **Metaplex Candy Machine Support** - Mint NFTs from configured Candy Machines
- 👛 **Wallet Integration** - Support for Phantom, Solflare, and other Solana wallets
- 🌐 **Multi-Network Support** - Works on Devnet, Testnet, and Mainnet

## Project Structure

```
ln.col/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── MintNFT.js  # Main NFT minting component
│   │   │   └── MintNFT.css # Component styles
│   │   ├── App.js          # Main App component with wallet providers
│   │   ├── App.css         # App styles
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Client dependencies
│   └── .env.example        # Environment variables template
│
├── server/                 # Node.js/Express backend
│   ├── index.js            # Server entry point with API routes
│   ├── package.json        # Server dependencies
│   └── .env.example        # Environment variables template
│
└── README.md               # This file
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Solana wallet (Phantom, Solflare, etc.)
- SOL tokens for transaction fees (devnet SOL for testing)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/broAir/ln.col.git
cd ln.col
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

## Configuration

### Server Configuration

1. Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

2. Edit the `.env` file with your configuration:

```env
# Solana Network Configuration
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_NETWORK=devnet

# Server Configuration
PORT=5000

# Candy Machine Configuration
CANDY_MACHINE_ID=your_candy_machine_id_here
```

### Client Configuration

1. Create a `.env` file in the `client` directory:

```bash
cd client
cp .env.example .env
```

2. Edit the `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_CANDY_MACHINE_ID=your_candy_machine_id_here
```

## Running the Application

### Start the Backend Server

```bash
cd server
npm start
```

The server will start on `http://localhost:5000`

For development with auto-reload:
```bash
npm run dev
```

### Start the React Frontend

In a new terminal:

```bash
cd client
npm start
```

The client will start on `http://localhost:3000`

## Usage

1. **Connect Your Wallet**
   - Click the "Select Wallet" button
   - Choose your wallet (Phantom, Solflare, etc.)
   - Approve the connection

2. **Enter Candy Machine ID**
   - Input your Metaplex Candy Machine ID
   - Click "Check Candy Machine" to verify it exists

3. **Mint NFT**
   - Click "Mint NFT" button
   - Approve the transaction in your wallet
   - Wait for confirmation

## API Endpoints

### Server API

- `GET /api/health` - Server health check
- `GET /api/network/status` - Get Solana network status
- `GET /api/candy-machine/:id` - Get Candy Machine information
- `POST /api/mint` - Prepare NFT mint transaction
- `POST /api/nft/metadata` - Get NFT metadata

## Development

### Server Development

```bash
cd server
npm run dev  # Uses nodemon for auto-reload
```

### Client Development

```bash
cd client
npm start  # Starts React development server
```

## Building for Production

### Build Client

```bash
cd client
npm run build
```

The build output will be in `client/build/`

### Production Deployment

1. Build the client application
2. Configure environment variables for production
3. Deploy the server to your hosting platform
4. Serve the client build files

## Technologies Used

### Frontend
- React 18
- Solana Web3.js
- Solana Wallet Adapter
- Metaplex JS SDK
- Axios

### Backend
- Node.js
- Express
- Solana Web3.js
- Metaplex Foundation Libraries
- dotenv

## Troubleshooting

### Common Issues

1. **Wallet Connection Issues**
   - Make sure your wallet extension is installed
   - Check that you're on the correct network (devnet/mainnet)

2. **Transaction Failures**
   - Ensure you have enough SOL for transaction fees
   - Verify the Candy Machine ID is correct

3. **Server Connection Issues**
   - Check that the server is running on port 5000
   - Verify CORS is properly configured

## Security Considerations

- Never commit `.env` files with sensitive data
- Use environment variables for all configuration
- Validate all user inputs
- Keep dependencies up to date

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

## Resources

- [Solana Documentation](https://docs.solana.com/)
- [Metaplex Documentation](https://docs.metaplex.com/)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [React Documentation](https://reactjs.org/)

