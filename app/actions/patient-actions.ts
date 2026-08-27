'use server'

import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

async function checkAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any).role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
}

export async function addClinicalNote(patientId: string, content: string) {
  await checkAdmin()
  await prisma.clinicalNote.create({
    data: { patientId, content }
  })
  revalidatePath(`/dashboard/pacientes/${patientId}`)
}

export async function addPayment(patientId: string, amount: number, concept: string, status: string = 'PAID') {
  await checkAdmin()
  await prisma.payment.create({
    data: { userId: patientId, amount, concept, status }
  })
  revalidatePath(`/dashboard/pacientes/${patientId}`)
}

export async function createAndAssignResource(patientId: string, title: string, type: string, url: string) {
  await checkAdmin()
  
  // Create resource
  const resource = await prisma.resource.create({
    data: { title, type, url }
  })
  
  // Assign to patient
  await prisma.patientResource.create({
    data: {
      userId: patientId,
      resourceId: resource.id
    }
  })
  
  revalidatePath(`/dashboard/pacientes/${patientId}`)
}
