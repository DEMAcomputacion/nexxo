import prisma from '../config/database.js';

export const createRequest = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const { receiverId, message, budget } = req.body;
    
    if (senderId === receiverId) {
      return res.status(400).json({ error: 'Cannot send request to yourself' });
    }
    
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });
    
    if (!receiver || receiver.role !== 'influencer') {
      return res.status(404).json({ error: 'Influencer not found' });
    }
    
    const existingRequest = await prisma.matchingRequest.findFirst({
      where: {
        senderId,
        receiverId,
        status: 'pending',
      },
    });
    
    if (existingRequest) {
      return res.status(400).json({ error: 'Request already exists' });
    }
    
    const request = await prisma.matchingRequest.create({
      data: {
        senderId,
        receiverId,
        message,
        budget,
      },
    });
    
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

export const getMyRequests = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    
    const requests = await prisma.matchingRequest.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            role: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            role: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { status } = req.body;
    
    const request = await prisma.matchingRequest.findUnique({
      where: { id },
    });
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    if (request.receiverId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this request' });
    }
    
    const updatedRequest = await prisma.matchingRequest.update({
      where: { id },
      data: { status },
    });
    
    res.json(updatedRequest);
  } catch (error) {
    next(error);
  }
};
