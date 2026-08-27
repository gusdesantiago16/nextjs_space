'use server'

import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

// Verificar que sea admin
async function checkAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any).role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
}

export async function createProduct(data: any) {
  await checkAdmin()
  
  const product = await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price ? parseFloat(data.price) : null,
      imageUrl: data.imageUrl,
      purchaseUrl: data.purchaseUrl,
      type: data.type,
      isActive: data.isActive ?? true,
    }
  })
  
  revalidatePath('/dashboard/tienda')
  revalidatePath('/tienda')
  return product
}

export async function updateProduct(id: string, data: any) {
  await checkAdmin()
  
  const product = await prisma.product.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      price: data.price ? parseFloat(data.price) : null,
      imageUrl: data.imageUrl,
      purchaseUrl: data.purchaseUrl,
      type: data.type,
      isActive: data.isActive ?? true,
    }
  })
  
  revalidatePath('/dashboard/tienda')
  revalidatePath('/tienda')
  return product
}

export async function deleteProduct(id: string) {
  await checkAdmin()
  await prisma.product.delete({ where: { id } })
  revalidatePath('/dashboard/tienda')
  revalidatePath('/tienda')
}
