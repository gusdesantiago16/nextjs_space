'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPatient } from '@/app/actions/patients'
import { Save, ArrowLeft, Loader2, KeyRound } from 'lucide-react'
import Link from 'next/link'

export default function PatientForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    phone: '',
  })

  // Generar un usuario automático basado en el nombre
  const handleNameChange = (e: any) => {
    const newName = e.target.value
    setFormData(prev => {
      // Si el usuario no ha escrito manualmente un username, sugerimos uno
      if (prev.username === '' || prev.username === prev.name.toLowerCase().replace(/\\s+/g, '.')) {
        const suggestedUsername = newName.toLowerCase().trim().replace(/\\s+/g, '.')
        return { ...prev, name: newName, username: suggestedUsername }
      }
      return { ...prev, name: newName }
    })
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generatePassword = () => {
    const randomPass = Math.random().toString(36).slice(-8)
    setFormData(prev => ({ ...prev, password: randomPass }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await createPatient(formData)
      alert("Paciente creado correctamente. Copia el usuario y contraseña para enviárselos.")
      router.push('/dashboard/pacientes')
    } catch (error: any) {
      console.error(error)
      alert(error.message || "Hubo un error al crear el paciente")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-pastel-200">
      <div className="flex justify-between items-center mb-8">
        <Link href="/dashboard/pacientes" className="flex items-center gap-2 text-slate-500 hover:text-apsid-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Volver
        </Link>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Crear Paciente
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo *</label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              placeholder="Ej. María López" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono (WhatsApp)</label>
            <input 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              placeholder="Ej. +52 477 123 4567" 
            />
          </div>
        </div>

        <div className="space-y-4 bg-pastel-50 p-6 rounded-2xl border border-pastel-100">
          <h3 className="font-medium text-apsid-500 mb-4 flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Credenciales de Acceso
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Estos son los datos con los que el paciente podrá iniciar sesión en la plataforma.
          </p>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Usuario *</label>
            <input 
              required
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-pastel-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono" 
              placeholder="Ej. maria.lopez" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña *</label>
            <div className="flex gap-2">
              <input 
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-pastel-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono" 
                placeholder="Escribe una contraseña" 
              />
              <button 
                type="button"
                onClick={generatePassword}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-sm font-medium transition-colors"
              >
                Generar
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Si dejas esto en blanco, por defecto será <strong>apsid123</strong>, pero recomendamos generar una.
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
