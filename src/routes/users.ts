import express from 'express';
import { prisma } from '../database/prisma';

export const router = express.Router();

router.get('/users', async function (req, res) {
  const users = await prisma.user.findMany();

  res.json({ users });
});

router.get<{ id: number }>('/users/:id', async function (req, res) {
  const user = await prisma.user.findUnique({ 
    where: { id: req.params.id },
  });

  res.json({ user });
});

router.post<{}, {}, { email: string, passwrod: string }>('/users', async function (req, res) {
  const user = await prisma.user.create({ 
    data: { ...req.body },
  });

  res.json({ user });
});

router.put<{ id: number }, {}, { name?: string }>('/users/:id', async function (req, res) {
  const user = await prisma.user.update({ 
    where: { id: req.params.id },
    data: { ...req.body },
  });

  res.json({ user });
});

router.delete<{ id: number }>('/users/:id', async function (req, res) {
  const user = await prisma.user.delete({ 
    where: { id: req.params.id },
  });

  res.json({ user });
});
