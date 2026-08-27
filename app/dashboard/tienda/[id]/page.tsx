import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import ProductForm from "../product-form"

const prisma = new PrismaClient()

export default async function EditarProductoPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login")
  }

  const product = await prisma.product.findUnique({
    where: { id: params.id }
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="font-serif text-3xl text-apsid-500">Editar Producto</h1>
        <p className="text-slate-600 mt-1">Actualiza los datos de tu infoproducto.</p>
      </div>
      
      <ProductForm initialData={product} />
    </div>
  )
}
