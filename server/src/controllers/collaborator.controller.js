import prisma from '../config/database.js';

// ─── Roles ───────────────────────────────────────────────────────────────────

export const getRoles = async (req, res) => {
  const roles = await prisma.collaboratorRole.findMany({
    include: { _count: { select: { collaborators: true } } },
    orderBy: { name: 'asc' },
  });
  res.json(roles);
};

export const createRole = async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: 'name is required' });
  const role = await prisma.collaboratorRole.create({ data: { name: name.trim() } });
  res.status(201).json(role);
};

export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const role = await prisma.collaboratorRole.update({ where: { id }, data: { name } });
  res.json(role);
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  const count = await prisma.collaborator.count({ where: { roleId: id } });
  if (count > 0) return res.status(400).json({ error: 'El rol tiene colaboradores asignados' });
  await prisma.collaboratorRole.delete({ where: { id } });
  res.json({ ok: true });
};

// ─── Collaborators ────────────────────────────────────────────────────────────

export const getCollaborators = async (req, res) => {
  const collaborators = await prisma.collaborator.findMany({
    include: { role: true },
    orderBy: { name: 'asc' },
  });
  res.json(collaborators);
};

export const createCollaborator = async (req, res) => {
  const { name, email, phone, city, roleId, socials, notes } = req.body;
  if (!name?.trim() || !roleId) return res.status(400).json({ error: 'name y roleId son requeridos' });
  const collaborator = await prisma.collaborator.create({
    data: { name: name.trim(), email, phone, city, roleId, socials: socials || null, notes },
    include: { role: true },
  });
  res.status(201).json(collaborator);
};

export const updateCollaborator = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, city, roleId, socials, notes, isActive } = req.body;
  const data = {};
  if (name !== undefined) data.name = name;
  if (email !== undefined) data.email = email;
  if (phone !== undefined) data.phone = phone;
  if (city !== undefined) data.city = city;
  if (roleId !== undefined) data.roleId = roleId;
  if (socials !== undefined) data.socials = socials;
  if (notes !== undefined) data.notes = notes;
  if (isActive !== undefined) data.isActive = isActive;
  const collaborator = await prisma.collaborator.update({
    where: { id },
    data,
    include: { role: true },
  });
  res.json(collaborator);
};

// ─── Payment Orders ───────────────────────────────────────────────────────────

export const getPaymentOrders = async (req, res) => {
  const { collaboratorId } = req.query;
  const orders = await prisma.paymentOrder.findMany({
    where: collaboratorId ? { collaboratorId } : undefined,
    include: {
      collaborator: { include: { role: true } },
      payments: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(orders);
};

export const createPaymentOrder = async (req, res) => {
  const { collaboratorId, description, amount, dueDate } = req.body;
  if (!collaboratorId || !description?.trim() || !amount) {
    return res.status(400).json({ error: 'collaboratorId, description y amount son requeridos' });
  }
  const order = await prisma.paymentOrder.create({
    data: {
      collaboratorId,
      description: description.trim(),
      amount: parseInt(amount),
      dueDate: dueDate ? new Date(dueDate) : null,
    },
    include: {
      collaborator: { include: { role: true } },
      payments: true,
    },
  });
  res.status(201).json(order);
};

export const updatePaymentOrder = async (req, res) => {
  const { id } = req.params;
  const { description, amount, status, dueDate } = req.body;
  const data = {};
  if (description !== undefined) data.description = description;
  if (amount !== undefined) data.amount = parseInt(amount);
  if (status !== undefined) data.status = status;
  if (dueDate !== undefined) data.dueDate = dueDate ? new Date(dueDate) : null;
  const order = await prisma.paymentOrder.update({
    where: { id },
    data,
    include: {
      collaborator: { include: { role: true } },
      payments: true,
    },
  });
  res.json(order);
};

// ─── Payments ─────────────────────────────────────────────────────────────────

export const registerPayment = async (req, res) => {
  const { paymentOrderId, amount, method, reference, notes, paidAt } = req.body;
  if (!paymentOrderId || !amount) {
    return res.status(400).json({ error: 'paymentOrderId y amount son requeridos' });
  }

  const [payment, updatedOrder] = await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        paymentOrderId,
        amount: parseInt(amount),
        method: method || null,
        reference: reference || null,
        notes: notes || null,
        paidAt: paidAt ? new Date(paidAt) : new Date(),
      },
    });

    const allPayments = await tx.payment.findMany({ where: { paymentOrderId } });
    const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);
    const order = await tx.paymentOrder.findUnique({ where: { id: paymentOrderId } });

    let newStatus = 'pending';
    if (totalPaid >= order.amount) newStatus = 'paid';
    else if (totalPaid > 0) newStatus = 'partial';

    const updatedOrder = await tx.paymentOrder.update({
      where: { id: paymentOrderId },
      data: { status: newStatus },
      include: { collaborator: { include: { role: true } }, payments: true },
    });

    return [payment, updatedOrder];
  });

  res.status(201).json({ payment, order: updatedOrder });
};

// ─── Transactions ─────────────────────────────────────────────────────────────

export const getTransactions = async (req, res) => {
  const { collaboratorId } = req.query;
  const transactions = await prisma.payment.findMany({
    where: collaboratorId ? { paymentOrder: { collaboratorId } } : undefined,
    include: {
      paymentOrder: {
        include: { collaborator: { include: { role: true } } },
      },
    },
    orderBy: { paidAt: 'desc' },
  });
  res.json(transactions);
};
