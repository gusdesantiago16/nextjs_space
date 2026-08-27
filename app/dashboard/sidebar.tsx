'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Users, FileText, CreditCard, Calendar, LogOut, LayoutDashboard, Store } from "lucide-react"

const menuItems = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/dashboard/pacientes", label: "Pacientes", icon: Users },
  { href: "/dashboard/materiales", label: "Material Clínico", icon: FileText },
  { href: "/dashboard/finanzas", label: "Finanzas", icon: CreditCard },
  { href: "/dashboard/citas", label: "Citas Web", icon: Calendar },
  { href: "/dashboard/tienda", label: "Mi Tienda", icon: Store },
]

export default function DashboardSidebar({ userName }: { userName: string }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-pastel-200 flex flex-col hidden md:flex shadow-lg relative z-10">
      <div className="p-6 border-b border-pastel-200 bg-apsid-500 text-white">
        <h2 className="font-serif text-2xl font-bold">Portal APSID</h2>
        <p className="text-sm text-apsid-100 mt-1">{userName.startsWith('Lic.') ? userName : `Lic. ${userName}`}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-manaoca-100 text-manaoca-600 font-medium shadow-sm" 
                  : "text-slate-600 hover:bg-pastel-100 hover:text-apsid-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-pastel-200">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-4 py-3 w-full text-left font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}
