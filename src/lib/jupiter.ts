import { DCA } from '@jup-ag/dca-sdk';
import { Connection, ConnectionConfig } from '@solana/web3.js';

const config: ConnectionConfig = {
  commitment: 'confirmed',
  disableRetryOnRateLimit: false,
  httpHeaders: {
    'Content-Type': 'application/json',
  }
};

// Create connection with timeout
const connection = new Connection(
  process.env.NEXT_PUBLIC_RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com',
  {
    ...config,
    confirmTransactionInitialTimeout: 60000, // 60 seconds
    timeout: 60000
  }
);

const dca = new DCA(connection);

export async function getDcaOrders() {
    try {
        console.error('DEPLOYMENT DEBUG - Testing Solana connection');
        const blockHash = await connection.getLatestBlockhash();
        console.error('DEPLOYMENT DEBUG - Connection successful:', {
            blockHash: blockHash.blockhash.substring(0, 10) + '...'
        });
        
        console.error('DEPLOYMENT DEBUG - Fetching DCA orders');
        const orders = await dca.getAll();
        console.error('DEPLOYMENT DEBUG - Successfully fetched orders:', {
            count: orders.length
        });
        
        return orders;
    } catch (error) {
        console.error('DEPLOYMENT DEBUG - Error in getDcaOrders:', error);
        throw error;
    }
} 