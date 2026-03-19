import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { authenticate, requireRole } from '../middleware/auth.middleware.js';

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

// Get own collaborator profile
router.get('/me/profile', authenticate, requireRole('collaborator'), async (req, res) => {
  try {
    const collaborator = await prisma.collaborator.findUnique({
      where: { userId: req.user.id },
      include: { role: true },
    });

    if (!collaborator) {
      return res.status(404).json({ error: 'Perfil de colaborador no encontrado' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { avatar: true, email: true, name: true, phone: true },
    });

    res.json({ ...collaborator, avatar: user.avatar });
  } catch (err) {
    console.error('Get collaborator profile error:', err);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// Update own collaborator profile
router.put('/me/profile', authenticate, requireRole('collaborator'), async (req, res) => {
  try {
    const {
      name,
      phone,
      availability,
      hasOwnTransport,
      equipment,
      portfolioUrl,
      previousWorkSamples,
      avatar,
    } = req.body;

    const existing = await prisma.collaborator.findUnique({
      where: { userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Perfil de colaborador no encontrado' });
    }

    const [collaborator] = await prisma.$transaction([
      prisma.collaborator.update({
        where: { id: existing.id },
        data: {
          ...(name !== undefined && { name }),
          ...(phone !== undefined && { phone }),
          ...(availability !== undefined && { availability }),
          ...(hasOwnTransport !== undefined && { hasOwnTransport }),
          ...(equipment !== undefined && { equipment }),
          ...(portfolioUrl !== undefined && { portfolioUrl }),
          ...(previousWorkSamples !== undefined && { previousWorkSamples }),
        },
        include: { role: true },
      }),
      prisma.user.update({
        where: { id: req.user.id },
        data: {
          ...(name !== undefined && { name }),
          ...(phone !== undefined && { phone }),
          ...(avatar !== undefined && { avatar }),
        },
      }),
    ]);

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { avatar: true },
    });

    res.json({ ...collaborator, avatar: user.avatar });
  } catch (err) {
    console.error('Update collaborator profile error:', err);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

export default router;
