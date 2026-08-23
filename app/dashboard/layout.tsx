import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardSidebar from "./sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Si no es ADMIN, podríamos redirigirlo al portal de pacientes. 
  // Por ahora lo dejamos pasar o redirigimos después si queremos ser estrictos.
  if ((session.user as any).role !== "ADMIN") {
    // redirect("/portal") // Próximamente el portal del paciente
  }

  return (
    <div className="flex h-screen bg-pastel-50 overflow-hidden">
      {/* Sidebar (solo escritorio por ahora) */}
      <DashboardSidebar userName={session.user.name || "Olga"} />
      
      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
