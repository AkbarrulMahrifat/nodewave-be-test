import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

async function seed() {
    // Seed Function Call Goes Here
    const countAdmin = await prisma.user.count({
        where: {
            role: "ADMIN"
        }
    })

    if (countAdmin === 0) {
        const hashedPassword = await bcrypt.hash("admin123", 12)

        await prisma.user.create({
            data: {
                fullName: "Admin",
                password: hashedPassword,
                email: "admin@test.com",
                role: Role.ADMIN
            }
        })

        console.log("Admin seeded")
    }

    console.log("Admin already seeded")
}

seed().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})