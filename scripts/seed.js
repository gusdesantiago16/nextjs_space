const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Olga.1976', 10)

  const admin = await prisma.user.upsert({
    where: { username: 'Olga' },
    update: {},
    create: {
      username: 'Olga',
      password: hashedPassword,
      name: 'Lic. Olga Mendoza',
      role: 'ADMIN',
    },
  })

  console.log('Usuario administrador creado:', admin.username)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
