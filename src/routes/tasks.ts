import express from 'express';
import { prisma } from '../database/prisma';

export const router = express.Router();

router.get('/tasks', async function (req, res) {
  const tasks = await prisma.task.findMany();

  res.json({ tasks });
});

router.get<{ id: number }>('/tasks/:id', async function (req, res) {
  const task = await prisma.task.findUnique({ 
    where: { id: req.params.id },
  });

  res.json({ task });
});

router.post<{}, {}, { user_id: number, content: string }>('/tasks', async function (req, res) {
  const task = await prisma.task.create({ 
    data: { ...req.body },
  });

  res.json({ task });
});

router.put<{ id: number }, {}, { content?: string }>('/tasks/:id', async function (req, res) {
  const task = await prisma.task.update({ 
    where: { id: req.params.id },
    data: { ...req.body },
  });

  res.json({ task });
});

router.delete<{ id: number }>('/tasks/:id', async function (req, res) {
  const task = await prisma.task.delete({ 
    where: { id: req.params.id },
  });

  res.json({ task });
});
