import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const feedback1 = await prisma.feedback.upsert({
    where: { title: "I am feedback1" },
    update: {},
    create: {
      title: "I am feedback1",
      rating: 4
    }
  })

  const feedback2 = await prisma.feedback.upsert({
    where: { title: "I am feedback2" },
    update: {},
    create: {
      title: "I am feedback2",
      rating: 3
    }
  })

}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
