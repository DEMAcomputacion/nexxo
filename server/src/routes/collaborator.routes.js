import { Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../config/database.js';

const router = Router();

// Public collaborator registration
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      collaborationType,
      availability,
      hasOwnTransport,
      equipment,
      portfolioUrl,
      experienceYears,
      previousWorkSamples,
      password,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }
    if (!email?.trim()) {
      return res.status(400).json({ error: 'El email es requerido' });
    }
    if (!phone?.trim()) {
      return res.status(400).json({ error: 'El teléfono es requerido' });
    }
    if (!collaborationType?.trim()) {
      return res.status(400).json({ error: 'El tipo de colaboración es requerido' });
    }
    if (!availability?.trim()) {
      return res.status(400).json({ error: 'La disponibilidad es requerida' });
    }

    // Find or create the role
    let role = await prisma.collaboratorRole.findFirst({
      where: { name: collaborationType.trim() },
    });
    if (!role) {
      role = await prisma.collaboratorRole.create({
        data: { name: collaborationType.trim() },
      });
    }

    const passwordHash = password ? await bcrypt.hash(password, 12) : null;

    const collaborator = await prisma.collaborator.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        roleId: role.id,
        availability,
        hasOwnTransport: hasOwnTransport || false,
        equipment: equipment || null,
        portfolioUrl: portfolioUrl || null,
        experienceYears: experienceYears || null,
        previousWorkSamples: previousWorkSamples || null,
        passwordHash,
        passwordPlain: password || null,
      },
      include: { role: true },
    });

    res.status(201).json(collaborator);
  } catch (err) {
    console.error('Collaborator registration error:', err);
    res.status(500).json({ error: 'Error al registrar. Intenta de nuevo.' });
  }
});

export default router;
