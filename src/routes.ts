import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (req) => {
    const createHabitBodySchema = z.object({
      title: z.string(), 
      WeekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, WeekDays } = createHabitBodySchema.parse(req.body);

    const today = dayjs().startOf('day').toDate();

    await prisma.habit.create({
      data: {
        title,
        createdAt: new Date(),
        WeekDays: {
          create: WeekDays.map((weekDay) => ({ weekDay })),
        },
      },
      include: {
        WeekDays: true,
      },
    });
  });
}
