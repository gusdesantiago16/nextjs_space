import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { ArrowLeft, UserCircle, Phone, Calendar, CreditCard, FileText, ClipboardList } from "lucide-react"
import Link from "next/link"
import { AddNoteButton, AddPaymentButton, AssignResourceButton } from "./patient-modals"

const prisma = new PrismaClient()

export default async function PacienteExpedientePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login")
  }

  const patient = await prisma.user.findUnique({
    where: { id: params.id, role: 'PATIENT' },
    include: {
      clinicalNotes: { orderBy: { createdAt: 'desc' } },
      payments: { orderBy: { createdAt: 'desc' } },
      patientResources: {
        include: { resource: true },
        orderBy: { assignedAt: 'desc' }
      }
    }
  })

  if (!patient) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/pacientes" className="p-2 bg-white rounded-xl shadow-sm border border-pastel-200 text-slate-500 hover:text-blue-500 hover:border-blue-200 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-apsid-500">Expediente Clínico</h1>
          <p className="text-slate-500 text-sm">Gestiona todo lo relacionado con este paciente.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: Perfil y Notas */}
        <div className="lg:col-span-1 space-y-6">
          {/* Tarjeta de Perfil */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-pastel-200 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-blue-500"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white rounded-full mx-auto border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-blue-500 mb-4 mt-6">
                {patient.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{patient.name}</h2>
              <p className="text-slate-500 font-mono text-sm mb-4">@{patient.username}</p>
              
              <div className="space-y-3 text-left bg-pastel-50 p-4 rounded-2xl border border-pastel-100">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-blue-500" />
                  {patient.phone || 'Sin teléfono'}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  Registrado el {new Date(patient.createdAt).toLocaleDateString('es-MX')}
                </div>
              </div>
            </div>
          </div>

          {/* Notas Clínicas Resumen */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-pastel-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-purple-500" />
                Notas Privadas
              </h3>
              <AddNoteButton patientId={patient.id} />
            </div>
            
            {patient.clinicalNotes.length > 0 ? (
              <div className="space-y-4">
                {patient.clinicalNotes.slice(0, 3).map(note => (
                  <div key={note.id} className="p-3 bg-pastel-50 rounded-xl border border-pastel-100 text-sm">
                    <p className="text-slate-700 line-clamp-3">{note.content}</p>
                    <p className="text-xs text-slate-400 mt-2 text-right">
                      {new Date(note.createdAt).toLocaleDateString('es-MX')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4 italic">No hay notas clínicas registradas.</p>
            )}
          </div>
        </div>

        {/* Columna Derecha: Materiales y Pagos */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Material Asignado */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-pastel-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Material Clínico Asignado
              </h3>
              <AssignResourceButton patientId={patient.id} />
            </div>
            
            {patient.patientResources.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {patient.patientResources.map(pr => (
                  <div key={pr.id} className="p-4 border border-pastel-200 rounded-2xl flex items-start gap-3 bg-white hover:border-orange-200 transition-colors">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-800 line-clamp-2">{pr.resource.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{pr.resource.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-pastel-50 rounded-2xl border border-dashed border-pastel-200">
                <p className="text-sm text-slate-500">Este paciente no tiene material asignado aún.</p>
              </div>
            )}
          </div>

          {/* Finanzas / Pagos */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-pastel-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-500" />
                Historial de Pagos
              </h3>
              <AddPaymentButton patientId={patient.id} />
            </div>
            
            {patient.payments.length > 0 ? (
              <div className="space-y-3">
                {patient.payments.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-pastel-100 rounded-2xl bg-pastel-50">
                    <div>
                      <p className="font-medium text-sm text-slate-800">{payment.concept}</p>
                      <p className="text-xs text-slate-400">{new Date(payment.createdAt).toLocaleDateString('es-MX')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${payment.amount.toFixed(2)}</p>
                      <span className="text-[10px] uppercase font-bold text-slate-400">{payment.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-pastel-50 rounded-2xl border border-dashed border-pastel-200">
                <p className="text-sm text-slate-500">No hay pagos registrados para este paciente.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
