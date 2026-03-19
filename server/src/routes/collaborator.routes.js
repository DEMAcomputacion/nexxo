import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Check if email already exists in User table
    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim() },
    });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Find or create the collaborator role
    let role = await prisma.collaboratorRole.findFirst({
      where: { name: collaborationType.trim() },
    });
    if (!role) {
      role = await prisma.collaboratorRole.create({
        data: { name: collaborationType.trim() },
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Create User + Collaborator in a transaction
    const { user, collaborator } = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: email.trim(),
          passwordHash,
          passwordPlain: password,
          name: name.trim(),
          role: 'collaborator',
          phone: phone.trim(),
        },
      });

      const collaborator = await tx.collaborator.create({
        data: {
          userId: user.id,
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
        },
        include: { role: true },
      });

      return { user, collaborator };
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      collaborator,
    });
  } catch (err) {
    console.error('Collaborator registration error:', err);
    res.status(500).json({ error: 'Error al registrar. Intenta de nuevo.' });
  }
});

export default router;
