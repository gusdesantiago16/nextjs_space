'use client'

import { useState } from 'react'
import { addClinicalNote, addPayment, createAndAssignResource } from '@/app/actions/patient-actions'
import { Loader2, X } from 'lucide-react'

// --- NOTA CLÍNICA ---
export function AddNoteButton({ patientId }: { patientId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await addClinicalNote(patientId, content)
    setLoading(false)
    setIsOpen(false)
    setContent('')
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
        + Nota
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-2xl text-purple-600">Nueva Nota Clínica</h3>
              <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6"/></button>
            </div>
            <textarea required value={content} onChange={e => setContent(e.target.value)} rows={5} className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none mb-4" placeholder="Escribe tus observaciones aquí..." />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl font-medium">Cancelar</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 flex items-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin"/>} Guardar Nota
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

// --- PAGO ---
export function AddPaymentButton({ patientId }: { patientId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [concept, setConcept] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await addPayment(patientId, parseFloat(amount), concept)
    setLoading(false)
    setIsOpen(false)
    setAmount('')
    setConcept('')
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
        + Pago
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-2xl text-green-600">Registrar Pago</h3>
              <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6"/></button>
            </div>
            
            <label className="block text-sm font-medium text-slate-700 mb-1">Concepto</label>
            <input required value={concept} onChange={e => setConcept(e.target.value)} className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none mb-4" placeholder="Ej. Consulta Terapia" />
            
            <label className="block text-sm font-medium text-slate-700 mb-1">Monto ($)</label>
            <input required type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none mb-6" placeholder="0.00" />
            
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl font-medium">Cancelar</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 flex items-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin"/>} Guardar Pago
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

// --- ASIGNAR RECURSO ---
export function AssignResourceButton({ patientId }: { patientId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('PDF')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await createAndAssignResource(patientId, title, type, url)
    setLoading(false)
    setIsOpen(false)
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
        + Asignar
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-2xl text-orange-600">Asignar Material</h3>
              <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-6 h-6"/></button>
            </div>
            
            <label className="block text-sm font-medium text-slate-700 mb-1">Título del Material</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none mb-4" placeholder="Ej. Tareas Semanales" />
            
            <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Archivo</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none mb-4">
              <option value="PDF">Documento PDF</option>
              <option value="VIDEO">Video</option>
              <option value="AUDIO">Audio</option>
            </select>

            <label className="block text-sm font-medium text-slate-700 mb-1">Enlace del Archivo (URL o Drive)</label>
            <input required type="url" value={url} onChange={e => setUrl(e.target.value)} className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none mb-6" placeholder="https://..." />
            
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl font-medium">Cancelar</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 flex items-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin"/>} Asignar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
