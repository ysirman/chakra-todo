import type { NextApiHandler } from 'next';
import prisma from '../../../lib/prisma';
import * as z from 'zod';

const requestBodySchema = z.object({
  detail: z.string().min(1),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    const result = requestBodySchema.parse(req.body);
    await prisma.todo.create({
      data: {
        detail: result.detail,
      },
    });
    res.json({
      ok: true,
    });
    return;
  } catch (error) {
    res.json({ ok: false, error });
  }
};
export default handler;
