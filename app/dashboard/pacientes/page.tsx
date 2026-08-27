import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Users, Plus, UserCircle, Search, ChevronRight } from "lucide-react"
import { PrismaClient } from "@prisma/client"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function PacientesDashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login")
  }

  const patients = await prisma.user.findMany({
    where: { role: 'PATIENT' },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { patientResources: true, clinicalNotes: true }
      }
    }
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-apsid-500 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            Pacientes
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Da de alta pacientes y genera sus accesos al portal.
          </p>
        </div>
        <Link href="/dashboard/pacientes/nuevo" className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Nuevo Paciente
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-pastel-200 overflow-hidden">
        {/* Barra de búsqueda (Visual) */}
        <div className="p-4 border-b border-pastel-200 flex gap-4 items-center bg-pastel-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar paciente por nombre..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-pastel-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Lista de pacientes */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-pastel-200 text-sm text-slate-500 uppercase tracking-wider">
                <th className="p-4 font-medium">Paciente</th>
                <th className="p-4 font-medium">Usuario de Acceso</th>
                <th className="p-4 font-medium">Teléfono</th>
                <th className="p-4 font-medium">Archivos Asignados</th>
                <th className="p-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pastel-100">
              {patients.map(patient => (
                <tr key={patient.id} className="hover:bg-pastel-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                        {patient.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-medium text-slate-800">{patient.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-mono text-sm">
                    {patient.username}
                  </td>
                  <td className="p-4 text-slate-600">
                    {patient.phone || <span className="text-slate-400 italic">No registrado</span>}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {patient._count.patientResources} recursos
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      href={`/dashboard/pacientes/${patient.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Ver Expediente <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              
              {patients.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    <UserCircle className="w-16 h-16 text-pastel-300 mx-auto mb-4" />
                    <p className="text-lg font-medium text-slate-700">Aún no hay pacientes registrados.</p>
                    <p className="text-sm">Agrega tu primer paciente usando el botón de arriba.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
