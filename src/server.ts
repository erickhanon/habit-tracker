import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors, {
    origin: "http://localhost:3333",
})

app.get("/", async (req, res) => {
  const habits = await prisma.habit.findMany();
  return habits;
});

app.listen({
    port: 3333,
}).then(() => {
    console.log("Server started on http://localhost:3333");
})