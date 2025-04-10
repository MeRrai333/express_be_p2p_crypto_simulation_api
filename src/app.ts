import express from 'express';
import userRoutes from './routes/userRoutes';
import cryptoRoutes from './routes/cryptoRoutes'
import walletRoutes from './routes/walletRoutes'
import paymentTypeRoutes from './routes/paymentTypeRoutes'
import protocolRoutes from './routes/protocolRoutes'
import P2PBuyRoutes from './routes/P2PBuyRoutes'
import P2PSellRoutes from './routes/P2PSellRoutes'
import P2PPaymentRoutes from './routes/P2PPaymentRoutes'
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/crypto', cryptoRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/paymentType', paymentTypeRoutes);
app.use('/api/protocol', protocolRoutes);
app.use('/api/p2p/buy', P2PBuyRoutes);
app.use('/api/p2p/sell', P2PSellRoutes);
app.use('/api/p2p/payment', P2PPaymentRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;