'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/app/actions/products'
import { Save, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ProductForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price?.toString() || '',
    imageUrl: initialData?.imageUrl || '',
    purchaseUrl: initialData?.purchaseUrl || '',
    type: initialData?.type || 'HOTMART',
    isActive: initialData ? initialData.isActive : true,
  })

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (initialData) {
        await updateProduct(initialData.id, formData)
      } else {
        await createProduct(formData)
      }
      router.push('/dashboard/tienda')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Hubo un error al guardar el producto")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-pastel-200">
      <div className="flex justify-between items-center mb-8">
        <Link href="/dashboard/tienda" className="flex items-center gap-2 text-slate-500 hover:text-apsid-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Volver
        </Link>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 bg-apsid-500 text-white font-medium rounded-xl hover:bg-apsid-600 transition-colors shadow-sm disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Guardar Producto
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Título del Producto *</label>
            <input 
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-apsid-500 outline-none transition-all" 
              placeholder="Ej. HOMESCHOOLING – EDUCACIÓN EN CASA" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tipo *</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-apsid-500 outline-none transition-all"
            >
              <option value="HOTMART">Infoproducto (Hotmart)</option>
              <option value="PDF">Documento PDF</option>
              <option value="PHYSICAL">Producto Físico</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Precio (Opcional si es Hotmart)</label>
            <input 
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-apsid-500 outline-none transition-all" 
              placeholder="0.00" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL de Compra (Link de Hotmart) *</label>
            <input 
              required
              type="url"
              name="purchaseUrl"
              value={formData.purchaseUrl}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-apsid-500 outline-none transition-all" 
              placeholder="https://go.hotmart.com/..." 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL de la Imagen *</label>
            <input 
              required
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-apsid-500 outline-none transition-all" 
              placeholder="/assets/tienda/imagen.png" 
            />
          </div>
          
          <div className="flex items-center gap-2 pt-2">
            <input 
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 rounded border-pastel-200 text-apsid-500 focus:ring-apsid-500" 
            />
            <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Producto Activo (Visible en la tienda pública)</label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descripción *</label>
          <textarea 
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={15}
            className="w-full p-3 rounded-xl border border-pastel-200 bg-pastel-50 focus:bg-white focus:ring-2 focus:ring-apsid-500 outline-none transition-all resize-none" 
            placeholder="Descripción detallada del producto..." 
          />
        </div>
      </div>
    </form>
  )
}
