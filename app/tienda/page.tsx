import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { Store, ShoppingBag, ExternalLink, Download } from "lucide-react"
import SectionWrapper from "../components/section-wrapper"

export const dynamic = "force-dynamic"

export default async function PublicTiendaPage() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = []
  try {
    products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("No se pudo conectar a la base de datos en /tienda:", error)
  }

  return (
    <div className="min-h-screen bg-pastel-50">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-apsid-500 to-apsid-600">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                <Store className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Tienda APSID</h1>
              <p className="text-apsid-100 max-w-2xl mx-auto text-lg">
                Recursos exclusivos, guías prácticas y cursos diseñados por la Lic. Olga Mendoza para tu crecimiento personal y familiar.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Grid de Productos */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <SectionWrapper key={product.id} delay={index * 0.1}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-pastel-200 flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300">
                  {product.imageUrl && (
                    <div className="relative aspect-[4/3] w-full bg-pastel-100 overflow-hidden">
                      <Image 
                        src={product.imageUrl} 
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {product.type === 'HOTMART' && (
                        <div className="absolute top-4 left-4 bg-[#F15722] text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-md flex items-center gap-1">
                          <ShoppingBag className="w-3 h-3" /> Curso Hotmart
                        </div>
                      )}
                      {product.type === 'PDF' && (
                        <div className="absolute top-4 left-4 bg-apsid-500 text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-md flex items-center gap-1">
                          <Download className="w-3 h-3" /> Guía PDF
                        </div>
                      )}
                      {product.price && (
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-apsid-500 text-sm px-4 py-1.5 rounded-full font-bold shadow-lg border border-white">
                          ${product.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="font-serif text-2xl text-apsid-500 mb-3 leading-tight group-hover:text-manaoca-500 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-slate-600 mb-8 whitespace-pre-wrap flex-1 text-sm leading-relaxed opacity-90">
                      {product.description}
                    </p>
                    
                    <div className="mt-auto">
                      {product.purchaseUrl && (
                        <a 
                          href={product.purchaseUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`w-full py-4 rounded-2xl text-sm font-bold flex justify-center items-center gap-2 transition-all shadow-md hover:shadow-lg ${
                            product.type === 'HOTMART' 
                              ? 'bg-[#F15722] text-white hover:bg-[#d64a1a]' 
                              : 'bg-manaoca-500 text-white hover:bg-manaoca-600'
                          }`}
                        >
                          Ir a comprar
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            ))}

            {products.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <Store className="w-16 h-16 text-pastel-300 mx-auto mb-4" />
                <h3 className="text-xl font-serif text-apsid-500 mb-2">Próximamente</h3>
                <p className="text-slate-500">Estamos preparando recursos increíbles para ti.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
