require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.booking.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Paulo Galarza",
      email: "paulo.galarza@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  const maria = await prisma.user.create({
    data: {
      name: "Maria Quiroz",
      email: "mlquiroz1@espe.edu.ec",
      password: await bcrypt.hash("user123", 10),
      role: "USER",
    },
  });

  const horario1 = await prisma.schedule.create({
    data: {
      court: "Ecuavoley 2",
      startTime: new Date("2026-11-19T08:00:00Z"),
      endTime: new Date("2026-11-19T10:00:00Z"),
    },
  });

  const horario2 = await prisma.schedule.create({
    data: {
      court: "Tenis 3",
      startTime: new Date("2026-11-19T10:00:00Z"),
      endTime: new Date("2026-11-19T12:00:00Z"),
    },
  });

  await prisma.booking.create({
    data: {
      date: new Date("2026-11-19T00:00:00Z"),
      user: { connect: { id: maria.id } },
      schedule: { connect: { id: horario1.id } },
    },
  });

  await prisma.booking.create({
    data: {
      date: new Date("2026-11-19T00:00:00Z"),
      user: { connect: { id: admin.id } },
      schedule: { connect: { id: horario2.id } },
    },
  });

  console.log("Seed completado");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });