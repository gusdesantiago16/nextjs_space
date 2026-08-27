import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { FileText, CreditCard, Download, Play, Headphones, Calendar } from "lucide-react"
import Link from "next/link"
import LogoutButton from "./logout-button"

const prisma = new PrismaClient()

export default async function MiEspacioPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }

  // Si un admin entra aquí por error, lo mandamos a su dashboard
  if ((session.user as any).role === "ADMIN") {
    redirect("/dashboard")
  }

  const userId = (session.user as any).id

  const patient = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      patientResources: {
        include: { resource: true },
        orderBy: { assignedAt: 'desc' }
      },
      payments: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!patient) {
    redirect("/login")
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-6 h-6 text-blue-500" />
      case 'VIDEO': return <Play className="w-6 h-6 text-red-500" />
      case 'AUDIO': return <Headphones className="w-6 h-6 text-purple-500" />
      default: return <FileText className="w-6 h-6 text-orange-500" />
    }
  }

  return (
    <div className="min-h-screen bg-pastel-50 pb-20">
      {/* Header personalizado para el paciente */}
      <div className="bg-white border-b border-pastel-200 pt-8 pb-12 px-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-apsid-400 to-apsid-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {patient.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-serif text-3xl text-apsid-600">Hola, {patient.name.split(' ')[0]}</h1>
              <p className="text-slate-500">Bienvenido a tu espacio clínico privado.</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Columna Principal: Material Asignado */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-pastel-200">
              <h2 className="font-serif text-2xl text-apsid-500 flex items-center gap-2 mb-6">
                <FileText className="w-6 h-6 text-orange-500" />
                Mi Material Clínico
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                Aquí encontrarás los archivos, tareas y recursos que la Lic. Olga ha preparado específicamente para ti.
              </p>

              {patient.patientResources.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {patient.patientResources.map(pr => (
                    <a 
                      key={pr.id} 
                      href={pr.resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex flex-col p-5 bg-pastel-50 rounded-2xl border border-pastel-100 hover:border-orange-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          {getIconForType(pr.resource.type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800 line-clamp-2 group-hover:text-apsid-600 transition-colors">
                            {pr.resource.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">Asignado el {new Date(pr.assignedAt).toLocaleDateString('es-MX')}</p>
                        </div>
                      </div>
                      <div className="mt-auto flex items-center gap-2 text-sm font-bold text-orange-500 bg-orange-100/50 px-3 py-2 rounded-xl justify-center group-hover:bg-orange-100 transition-colors">
                        <Download className="w-4 h-4" />
                        Abrir {pr.resource.type}
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-pastel-50 rounded-2xl border-2 border-dashed border-pastel-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <FileText className="w-8 h-8 text-pastel-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-1">No hay material asignado</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Cuando tu terapeuta te asigne tareas o lecturas, aparecerán aquí para que las descargues.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Barra Lateral: Historial de Pagos y Contacto */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-pastel-200">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-green-500" />
                Mis Pagos
              </h3>
              
              {patient.payments.length > 0 ? (
                <div className="space-y-3">
                  {patient.payments.map(payment => (
                    <div key={payment.id} className="flex flex-col p-3 border border-pastel-100 rounded-xl bg-pastel-50">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm text-slate-800">{payment.concept}</p>
                        <p className="font-bold text-green-600">${payment.amount.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>{new Date(payment.createdAt).toLocaleDateString('es-MX')}</span>
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold text-[10px]">PAGADO</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-4 bg-pastel-50 rounded-xl border border-pastel-100">
                  No hay pagos registrados.
                </p>
              )}
            </div>

            <div className="bg-gradient-to-br from-manaoca-500 to-manaoca-600 rounded-3xl p-6 shadow-md text-white">
              <h3 className="font-bold flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                ¿Necesitas una cita?
              </h3>
              <p className="text-manaoca-50 text-sm mb-4">
                Agenda o modifica tu próxima sesión directamente a través de WhatsApp.
              </p>
              <a 
                href="https://wa.me/524776719821" 
                target="_blank" 
                rel="noreferrer"
                className="block text-center w-full bg-white text-manaoca-600 font-bold py-3 rounded-xl hover:bg-pastel-50 transition-colors shadow-sm"
              >
                Contactar a Olga
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
