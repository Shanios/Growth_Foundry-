import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const [username, password, email] = process.argv.slice(2);

if (!username || !password) {
  console.error("Usage: npm run admin:create -- <username> <password> [email]");
  process.exit(1);
}

if (password.length < 10) {
  console.error("Use an admin password with at least 10 characters.");
  process.exit(1);
}

try {
  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash, email: email || null },
    create: { username, passwordHash, email: email || null },
  });
  console.log(`Admin ready: ${admin.username}`);
} finally {
  await prisma.$disconnect();
}
