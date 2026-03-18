import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes.js';
import influencerRoutes from './routes/influencer.routes.js';
import matchingRoutes from './routes/matching.routes.js';
import adminRoutes from './routes/admin.routes.js';
import collaboratorRoutes from './routes/collaborator.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

app.use(helmet({ contentSecurityPolicy: isProd ? undefined : false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/influencers', influencerRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/collaborators', collaboratorRoutes);

// En producción servir el build del cliente
if (isProd) {
  const clientDist = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientDist));
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: !isProd ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
