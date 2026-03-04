import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';

export const adminLogin = async (req, res) => {
  const { password } = req.body;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = jwt.sign(
    { adminAccess: true },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token });
};

export const getStats = async (req, res) => {
  const [totalUsers, totalInfluencers, totalBusinesses, campaignsByStatus] = await Promise.all([
    prisma.user.count(),
    prisma.influencerProfile.count(),
    prisma.businessProfile.count(),
    prisma.campaign.groupBy({ by: ['status'], _count: { id: true } }),
  ]);

  const campaigns = {};
  for (const row of campaignsByStatus) {
    campaigns[row.status] = row._count.id;
  }

  res.json({ totalUsers, totalInfluencers, totalBusinesses, campaigns });
};

export const getInfluencers = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  const skip = (page - 1) * limit;

  const [total, items] = await Promise.all([
    prisma.user.count({ where: { role: 'influencer' } }),
    prisma.user.findMany({
      where: { role: 'influencer' },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
        isActive: true,
        createdAt: true,
        influencerProfile: {
          select: { id: true, niche: true, followersCount: true, location: true },
        },
      },
    }),
  ]);

  res.json({ total, page, limit, items });
};

export const getBusinesses = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  const skip = (page - 1) * limit;

  const [total, items] = await Promise.all([
    prisma.user.count({ where: { role: 'business' } }),
    prisma.user.findMany({
      where: { role: 'business' },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
        isActive: true,
        createdAt: true,
        businessProfile: {
          select: { id: true, companyName: true, industry: true },
        },
      },
    }),
  ]);

  res.json({ total, page, limit, items });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, city, isActive } = req.body;

  const data = {};
  if (name !== undefined) data.name = name;
  if (email !== undefined) data.email = email;
  if (phone !== undefined) data.phone = phone;
  if (city !== undefined) data.city = city;
  if (isActive !== undefined) data.isActive = isActive;

  const user = await prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, phone: true, city: true, isActive: true, role: true },
  });

  res.json(user);
};

export const getCampaigns = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  const skip = (page - 1) * limit;

  const [total, items] = await Promise.all([
    prisma.campaign.count(),
    prisma.campaign.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        business: { select: { id: true, companyName: true, user: { select: { name: true, email: true } } } },
        influencer: { select: { id: true, user: { select: { name: true, email: true } } } },
      },
    }),
  ]);

  res.json({ total, page, limit, items });
};

export const createCampaign = async (req, res) => {
  const { name, description, budget, status, startDate, endDate, businessId, influencerId } = req.body;

  if (!name || !businessId) {
    return res.status(400).json({ error: 'name and businessId are required' });
  }

  const campaign = await prisma.campaign.create({
    data: {
      name,
      description,
      budget: budget ? parseInt(budget) : null,
      status: status || 'draft',
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      businessId,
      influencerId: influencerId || null,
    },
    include: {
      business: { select: { id: true, companyName: true } },
      influencer: { select: { id: true, user: { select: { name: true } } } },
    },
  });

  res.status(201).json(campaign);
};

export const updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { name, description, budget, status, startDate, endDate, businessId, influencerId } = req.body;

  const data = {};
  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description;
  if (budget !== undefined) data.budget = budget ? parseInt(budget) : null;
  if (status !== undefined) data.status = status;
  if (startDate !== undefined) data.startDate = startDate ? new Date(startDate) : null;
  if (endDate !== undefined) data.endDate = endDate ? new Date(endDate) : null;
  if (businessId !== undefined) data.businessId = businessId;
  if (influencerId !== undefined) data.influencerId = influencerId || null;

  const campaign = await prisma.campaign.update({
    where: { id },
    data,
    include: {
      business: { select: { id: true, companyName: true } },
      influencer: { select: { id: true, user: { select: { name: true } } } },
    },
  });

  res.json(campaign);
};
