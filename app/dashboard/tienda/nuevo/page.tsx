import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import ProductForm from "../product-form"

export default async function NuevoProductoPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login")
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="font-serif text-3xl text-apsid-500">Agregar Nuevo Producto</h1>
        <p className="text-slate-600 mt-1">Completa los datos para publicar un producto en tu tienda.</p>
      </div>
      
      <ProductForm />
    </div>
  )
}
