'use server'

import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function checkAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any).role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
}

export async function createPatient(data: { name: string; username: string; password?: string; phone?: string }) {
  await checkAdmin()
  
  // Verify username doesn't exist
  const existing = await prisma.user.findUnique({ where: { username: data.username } })
  if (existing) {
    throw new Error('El usuario (username) ya existe.')
  }

  // Create password hash (default to 'apsid123' if not provided)
  const rawPassword = data.password || 'apsid123'
  const hashedPassword = await bcrypt.hash(rawPassword, 10)

  const patient = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username.toLowerCase().trim(),
      password: hashedPassword,
      phone: data.phone || null,
      role: 'PATIENT',
    }
  })

  revalidatePath('/dashboard/pacientes')
  return patient
}

export async function deletePatient(id: string) {
  await checkAdmin()
  await prisma.user.delete({ where: { id, role: 'PATIENT' } })
  revalidatePath('/dashboard/pacientes')
}
