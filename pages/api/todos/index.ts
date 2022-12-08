import type { NextApiHandler } from 'next';
import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
  try {
    const todoList = await prisma.todo.findMany();
    res.json({
      ok: true,
      todoList,
    });
    return;
  } catch (error) {
    res.json({ ok: false, error });
  }
};
export default handler;
