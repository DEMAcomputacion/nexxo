import prisma from '../config/database.js';

export const getInfluencers = async (req, res, next) => {
  try {
    const { niche, location, minFollowers, maxPrice } = req.query;
    
    const where = {
      user: { isActive: true },
    };
    
    if (niche) {
      where.niche = { has: niche };
    }
    
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }
    
    if (minFollowers) {
      where.followersCount = { ...where.followersCount, gte: parseInt(minFollowers) };
    }
    
    if (maxPrice) {
      where.priceRangeMax = { ...where.priceRangeMax, lte: parseInt(maxPrice) };
    }
    
    const influencers = await prisma.influencerProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    
    res.json(influencers);
  } catch (error) {
    next(error);
  }
};

export const getInfluencerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const profile = await prisma.influencerProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            createdAt: true,
          },
        },
      },
    });
    
    if (!profile) {
      return res.status(404).json({ error: 'Influencer not found' });
    }
    
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { bio, location, niche, platforms, followersCount, engagementRate, priceRangeMin, priceRangeMax, socialLinks } = req.body;
    
    const profile = await prisma.influencerProfile.update({
      where: { userId },
      data: {
        ...(bio && { bio }),
        ...(location && { location }),
        ...(niche && { niche }),
        ...(platforms && { platforms }),
        ...(followersCount !== undefined && { followersCount }),
        ...(engagementRate !== undefined && { engagementRate }),
        ...(priceRangeMin !== undefined && { priceRangeMin }),
        ...(priceRangeMax !== undefined && { priceRangeMax }),
        ...(socialLinks && { socialLinks }),
      },
    });
    
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    
    const profile = await prisma.influencerProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });
    
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
