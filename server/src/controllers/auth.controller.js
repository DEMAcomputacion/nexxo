import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';
import prisma from '../config/database.js';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['influencer']),
  phone: z.string().optional(),
  city: z.string().optional(),
});

const registerInfluencerSchema = registerSchema.extend({
  role: z.literal('influencer'),
  socials: z.record(z.object({
    handle: z.string().optional(),
    followers: z.number().optional(),
  })).optional(),
  niche: z.string().optional(),
  contentFormats: z.array(z.string()).optional(),
  audienceAge: z.string().optional(),
  audienceGender: z.string().optional(),
  postFrequency: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  paymentModel: z.string().optional(),
  collaborationTypes: z.string().optional(),
  mediaKitUrl: z.string().url().optional().or(z.literal('')),
  contentRestrictions: z.string().optional(),
  followersCount: z.number().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const register = async (req, res, next) => {
  try {
    const data = req.body;
    
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const passwordHash = await bcrypt.hash(data.password, 12);
    
    let user;
    
    if (data.role === 'influencer') {
      user = await prisma.user.create({
        data: {
          email: data.email,
          passwordHash,
          passwordPlain: data.password,
          name: data.name,
          role: data.role,
          phone: data.phone,
          city: data.city,
          influencerProfile: {
            create: {
              niche: data.niche ? [data.niche] : [],
              contentFormats: data.contentFormats || [],
              audienceAge: data.audienceAge,
              audienceGender: data.audienceGender,
              postFrequency: data.postFrequency,
              priceRangeMin: data.priceMin || 0,
              priceRangeMax: data.priceMax || 0,
              paymentModel: data.paymentModel,
              collaborationTypes: data.collaborationTypes,
              mediaKitUrl: data.mediaKitUrl || null,
              contentRestrictions: data.contentRestrictions,
              followersCount: data.followersCount || 0,
              socials: data.socials || {},
            },
          },
        },
        include: {
          influencerProfile: true,
        },
      });
    }
    
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
    });
  } catch (error) {
    console.error('Register error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0].message });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (!user.isActive) {
      return res.status(401).json({ error: 'Account is inactive' });
    }
    
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0].message });
    }
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        city: true,
        avatar: true,
        createdAt: true,
        influencerProfile: true,
        businessProfile: true,
        collaboratorProfile: {
          include: { role: true },
        },
      },
    });
    
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const registerBusiness = async (req, res, next) => {
  try {
    const { companyName, email, password } = req.body;
    
    if (!companyName || !email || !password) {
      return res.status(400).json({ error: 'Company name, email and password are required' });
    }
    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const passwordHash = await bcrypt.hash(password, 12);
    
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        passwordPlain: password,
        name: companyName,
        role: 'business',
        businessProfile: {
          create: {
            companyName,
          },
        },
      },
      include: {
        businessProfile: true,
      },
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
    });
  } catch (error) {
    console.error('Register business error:', error);
    next(error);
  }
};

export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to avoid email enumeration
    if (!user) {
      return res.json({ message: 'Si el email existe, recibirás instrucciones' });
    }

    // Invalidate previous tokens
    await prisma.passwordReset.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    // Create reset token (valid 1 hour)
    const token = crypto.randomBytes(32).toString('hex');
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;

    await resend.emails.send({
      from: 'NEXXO <onboarding@resend.dev>',
      to: user.email,
      subject: 'Recuperar contraseña - NEXXO',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #111; color: #fff; border-radius: 16px;">
          <h2 style="margin: 0 0 16px; font-size: 20px;">Recuperar contraseña</h2>
          <p style="color: #aaa; font-size: 14px; line-height: 1.6;">
            Hola <strong style="color: #fff;">${user.name}</strong>, recibimos una solicitud para restablecer tu contraseña.
          </p>
          <a href="${resetUrl}" style="display: inline-block; margin: 24px 0; padding: 14px 28px; background: linear-gradient(90deg, #FF6B35, #FF4466); color: #fff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px;">
            Restablecer contraseña
          </a>
          <p style="color: #666; font-size: 12px; line-height: 1.5;">
            Este enlace expira en 1 hora. Si no solicitaste este cambio, ignora este email.
          </p>
        </div>
      `,
    });

    res.json({ message: 'Si el email existe, recibirás instrucciones' });
  } catch (error) {
    console.error('Password reset request error:', error);
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Token y contraseña son requeridos' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const resetRecord = await prisma.passwordReset.findUnique({ where: { token } });

    if (!resetRecord || resetRecord.used || resetRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: 'El enlace es invalido o ha expirado' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetRecord.userId },
        data: { passwordHash, passwordPlain: password },
      }),
      prisma.passwordReset.update({
        where: { id: resetRecord.id },
        data: { used: true },
      }),
    ]);

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Password reset error:', error);
    next(error);
  }
};
