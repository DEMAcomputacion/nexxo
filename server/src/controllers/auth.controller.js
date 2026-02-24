import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { z } from 'zod';

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
      where: { id: req.user.userId },
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
        clientProfile: true,
      },
    });
    
    res.json(user);
  } catch (error) {
    next(error);
  }
};
