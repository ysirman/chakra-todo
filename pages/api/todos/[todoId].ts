import type { NextApiHandler } from 'next';
import prisma from '../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'DELETE') {
    const { todoId } = req.query;
    if (!!!todoId) return res.json({ ok: false });

    try {
      await prisma.todo.delete({
        where: {
          id: todoId,
        },
      });
      res.json({
        ok: true,
      });
      return;
    } catch (error) {
      res.json({ ok: false, error });
    }
  }
};
export default handler;
