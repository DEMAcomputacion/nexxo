import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
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
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { type, name, email, company, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Nombre, email y mensaje son requeridos' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'NEXXO <onboarding@resend.dev>',
      to: 'agencianexxodig@gmail.com',
      subject: `Nuevo contacto desde la web: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #111; color: #fff; border-radius: 16px;">
          <h2 style="margin: 0 0 20px; font-size: 20px; color: #FF6B35;">Nuevo mensaje de contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Tipo</td><td style="padding: 8px 0; color: #fff; font-size: 14px;">${type || 'No especificado'}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Nombre</td><td style="padding: 8px 0; color: #fff; font-size: 14px;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #fff; font-size: 14px;"><a href="mailto:${email}" style="color: #FF6B35;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Empresa</td><td style="padding: 8px 0; color: #fff; font-size: 14px;">${company}</td></tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px;">
            <p style="margin: 0 0 6px; color: #888; font-size: 12px;">Mensaje</p>
            <p style="margin: 0; color: #ddd; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    res.json({ message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
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
