import prisma from '../config/database.js';

export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    
    const profile = await prisma.clientProfile.findUnique({
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

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { companyName, industry, budgetMin, budgetMax, description, website } = req.body;
    
    const profile = await prisma.clientProfile.update({
      where: { userId },
      data: {
        ...(companyName && { companyName }),
        ...(industry && { industry }),
        ...(budgetMin !== undefined && { budgetMin }),
        ...(budgetMax !== undefined && { budgetMax }),
        ...(description && { description }),
        ...(website && { website }),
      },
    });
    
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
