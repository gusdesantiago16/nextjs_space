import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import PatientForm from "../patient-form"

export default async function NuevoPacientePage() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login")
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="font-serif text-3xl text-apsid-500">Nuevo Paciente</h1>
        <p className="text-slate-600 mt-1">Registra los datos básicos para darle acceso al portal.</p>
      </div>
      
      <PatientForm />
    </div>
  )
}
