# Quick Start Guide

This guide will help you get the ln.col NFT minting application up and running quickly.

## Prerequisites

- Node.js v16 or higher
- npm or yarn
- A Solana wallet browser extension (Phantom or Solflare recommended)

## Quick Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/broAir/ln.col.git
cd ln.col

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

#### Server Configuration

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_NETWORK=devnet
PORT=5000
CANDY_MACHINE_ID=your_candy_machine_id_here
```

#### Client Configuration

```bash
cd client
cp .env.example .env
```

Edit `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_CANDY_MACHINE_ID=your_candy_machine_id_here
```

### 3. Run the Application

Open two terminal windows:

**Terminal 1 - Start the server:**
```bash
cd server
npm start
```

You should see:
```
Server is running on port 5000
Network: devnet
RPC URL: https://api.devnet.solana.com
```

**Terminal 2 - Start the client:**
```bash
cd client
npm start
```

The application will open in your browser at `http://localhost:3000`

## Using the Application

1. **Install a Solana Wallet**
   - Install Phantom: https://phantom.app/
   - Or Solflare: https://solflare.com/

2. **Get Devnet SOL**
   - Visit https://solfaucet.com/
   - Enter your wallet address
   - Request devnet SOL for testing

3. **Connect Your Wallet**
   - Click "Select Wallet" button in the app
   - Choose your wallet
   - Approve the connection

4. **Enter Candy Machine ID**
   - Input your Metaplex Candy Machine ID
   - Click "Check Candy Machine" to verify

5. **Mint NFT**
   - Click "Mint NFT" button
   - Approve the transaction in your wallet
   - Wait for confirmation

## Troubleshooting

### Wallet Won't Connect
- Make sure your wallet extension is installed and unlocked
- Check that you're on the correct network (devnet)
- Try refreshing the page

### Server Won't Start
- Check that port 5000 is not already in use
- Verify all dependencies are installed (`npm install`)
- Check the `.env` file exists and has correct values

### Build Errors
- Clear the cache: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Try: `npm run build` again

## Development Mode

For development with hot-reload:

```bash
# Server (uses nodemon)
cd server
npm run dev

# Client (default React behavior)
cd client
npm start
```

## Production Build

To create a production build of the client:

```bash
cd client
npm run build
```

The optimized production files will be in `client/build/`

## API Endpoints

The server provides these endpoints:

- `GET /api/health` - Check server status
- `GET /api/network/status` - Get Solana network info
- `GET /api/candy-machine/:id` - Get Candy Machine details
- `POST /api/mint` - Prepare NFT mint transaction
- `POST /api/nft/metadata` - Get NFT metadata

## Next Steps

- Configure your actual Candy Machine ID
- Customize the UI styling in `client/src/components/MintNFT.css`
- Add more features like displaying minted NFTs
- Deploy to production (see README.md)

## Support

For issues and questions:
- Open an issue on GitHub
- Check the main README.md for detailed documentation

## Security Notes

- Never commit `.env` files with real credentials
- Use environment variables for all sensitive data
- Test on devnet before mainnet deployment
- Keep dependencies updated

Happy minting! 🎨
