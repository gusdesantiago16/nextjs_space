import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Users, FileText, CreditCard, Calendar, UserPlus, UploadCloud, Banknote } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  // Estos datos serán dinámicos cuando los conectemos a la base de datos
  const stats = [
    { label: "Pacientes Activos", value: "0", icon: Users, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "Materiales Subidos", value: "0", icon: FileText, color: "text-purple-500", bg: "bg-purple-100" },
    { label: "Pagos Pendientes", value: "0", icon: CreditCard, color: "text-orange-500", bg: "bg-orange-100" },
    { label: "Citas Nuevas", value: "0", icon: Calendar, color: "text-green-500", bg: "bg-green-100" },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-apsid-500">
          Bienvenida, Lic. {session?.user?.name || "Olga"}
        </h1>
        <p className="text-slate-600 mt-2 text-lg">
          Este es tu centro de control privado. Aquí puedes administrar toda tu clínica.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-pastel-200 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-gradient-to-br from-apsid-500 to-manaoca-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <h2 className="font-serif text-2xl mb-6 relative z-10">¿Qué quieres hacer hoy?</h2>
        
        <div className="grid md:grid-cols-3 gap-4 relative z-10">
          <Link href="/dashboard/pacientes/nuevo" className="group bg-white/10 hover:bg-white/20 transition-all p-5 rounded-2xl border border-white/20 backdrop-blur-sm">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <span className="block font-bold text-lg mb-1">Nuevo Paciente</span>
            <span className="text-sm text-pastel-100 line-clamp-2">Registrar y generar contraseña temporal</span>
          </Link>

          <Link href="/dashboard/materiales/nuevo" className="group bg-white/10 hover:bg-white/20 transition-all p-5 rounded-2xl border border-white/20 backdrop-blur-sm">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-5 h-5 text-white" />
            </div>
            <span className="block font-bold text-lg mb-1">Subir Material</span>
            <span className="text-sm text-pastel-100 line-clamp-2">Agregar nuevo PDF o video para pacientes</span>
          </Link>

          <Link href="/dashboard/finanzas/nuevo" className="group bg-white/10 hover:bg-white/20 transition-all p-5 rounded-2xl border border-white/20 backdrop-blur-sm">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Banknote className="w-5 h-5 text-white" />
            </div>
            <span className="block font-bold text-lg mb-1">Registrar Pago</span>
            <span className="text-sm text-pastel-100 line-clamp-2">Anotar abono o compra de paquete</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
