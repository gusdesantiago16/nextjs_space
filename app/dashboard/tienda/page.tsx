import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Store, Plus, ExternalLink, Package } from "lucide-react"
import { PrismaClient } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function TiendaDashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login")
  }

  // Fetch all products from the database
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-apsid-500 flex items-center gap-3">
            <Store className="w-8 h-8 text-manaoca-500" />
            Mi Tienda
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Gestiona tus infoproductos y enlaces de Hotmart.
          </p>
        </div>
        <Link href="/dashboard/tienda/nuevo" className="flex items-center gap-2 px-6 py-3 bg-manaoca-500 text-white font-medium rounded-xl hover:bg-manaoca-600 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className={`bg-white rounded-3xl overflow-hidden shadow-md border flex flex-col hover:shadow-lg transition-all group ${product.isActive ? 'border-pastel-200' : 'border-red-200 opacity-75'}`}>
            {product.imageUrl ? (
              <div className="relative aspect-square w-full bg-pastel-100 overflow-hidden">
                <Image 
                  src={product.imageUrl} 
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-apsid-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                  {product.type}
                </div>
                {!product.isActive && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                    Inactivo
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square bg-pastel-100 flex items-center justify-center text-pastel-300 relative">
                <Package className="w-16 h-16" />
                <div className="absolute top-4 left-4 bg-apsid-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                  {product.type}
                </div>
              </div>
            )}
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-serif text-xl text-apsid-500 mb-2 line-clamp-2 leading-tight">
                {product.title}
              </h3>
              <p className="text-sm text-slate-500 mb-6 whitespace-pre-wrap flex-1 line-clamp-4">
                {product.description}
              </p>
              
              <div className="flex gap-2 mt-auto">
                {product.purchaseUrl && (
                  <a 
                    href={product.purchaseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-pastel-50 text-apsid-500 py-2 rounded-xl text-sm font-medium flex justify-center items-center gap-2 hover:bg-pastel-100 border border-pastel-200"
                  >
                    Ver Link <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Link href={`/dashboard/tienda/${product.id}`} className="flex-1 bg-apsid-50 text-apsid-500 py-2 rounded-xl text-sm font-medium hover:bg-apsid-100 text-center">
                  Editar
                </Link>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-pastel-200 rounded-3xl bg-white">
            <Store className="w-16 h-16 text-pastel-300 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-apsid-500 mb-2">Tu tienda está vacía</h3>
            <p className="text-slate-500 mb-6">Aún no has agregado ningún producto para vender.</p>
            <button className="px-6 py-2 bg-manaoca-500 text-white font-medium rounded-xl hover:bg-manaoca-600 transition-colors shadow-sm">
              Agregar el primer producto
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
