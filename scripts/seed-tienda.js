import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const product = await prisma.product.create({
    data: {
      title: 'HOMESCHOOLING – EDUCACIÓN EN CASA',
      description: `Con el MasterClass HOMESCHOOLING – EDUCACIÓN EN CASA, lograrás que tus hijos aprendan distinto, de manera más flexible, amorosa y respetuosa.

¿QUÉ VAS A LOGRAR?
• Tendrás una solución real y efectiva a la educación de tus hijos.
• Lograrás que tus hijos sean más felices, ellos lo merecen.
• Encontrarás opciones diferentes al colegio de toda la vida.
• Descubrirás que tal vez este tipo de educación sea la indicada para tu familia.`,
      imageUrl: '/assets/tienda/homeschooling.png',
      purchaseUrl: 'https://go.hotmart.com/EjemPlO', // Temporary URL
      type: 'HOTMART',
      price: null, // Si se cobra en hotmart, podemos ocultarlo aquí
    }
  })

  console.log('Producto creado:', product)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
