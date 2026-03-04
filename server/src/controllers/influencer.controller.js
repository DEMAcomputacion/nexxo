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
    const userId = req.user.id;
    const {
      name, phone, city,
      bio, location, niche, socials,
      contentFormats, audienceAge, audienceGender, postFrequency,
      priceRangeMin, priceRangeMax, paymentModel, collaborationTypes,
      mediaKitUrl, contentRestrictions, followersCount,
    } = req.body;

    await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(city !== undefined && { city }),
      },
    });

    const profile = await prisma.influencerProfile.update({
      where: { userId },
      data: {
        ...(bio !== undefined && { bio }),
        ...(location !== undefined && { location }),
        ...(niche !== undefined && { niche }),
        ...(socials !== undefined && { socials }),
        ...(contentFormats !== undefined && { contentFormats }),
        ...(audienceAge !== undefined && { audienceAge }),
        ...(audienceGender !== undefined && { audienceGender }),
        ...(postFrequency !== undefined && { postFrequency }),
        ...(priceRangeMin !== undefined && { priceRangeMin: parseInt(priceRangeMin) || 0 }),
        ...(priceRangeMax !== undefined && { priceRangeMax: parseInt(priceRangeMax) || 0 }),
        ...(paymentModel !== undefined && { paymentModel }),
        ...(collaborationTypes !== undefined && { collaborationTypes }),
        ...(mediaKitUrl !== undefined && { mediaKitUrl }),
        ...(contentRestrictions !== undefined && { contentRestrictions }),
        ...(followersCount !== undefined && { followersCount: parseInt(followersCount) || 0 }),
      },
      include: {
        user: {
          select: { id: true, email: true, name: true, phone: true, city: true, avatar: true },
        },
      },
    });

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const profile = await prisma.influencerProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: { id: true, email: true, name: true, phone: true, city: true, avatar: true },
        },
      },
    });

    res.json(profile);
  } catch (error) {
    next(error);
  }
};
