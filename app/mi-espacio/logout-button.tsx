'use client'

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex items-center gap-2 px-4 py-2 bg-pastel-100 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors text-sm font-medium"
    >
      <LogOut className="w-4 h-4" />
      Cerrar Sesión
    </button>
  )
}
