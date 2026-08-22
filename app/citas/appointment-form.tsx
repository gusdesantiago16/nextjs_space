'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Phone, Calendar, Clock, MessageSquare, Send, CheckCircle, Loader2 } from 'lucide-react'

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'APSID',
    preferredDate: '',
    preferredTime: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {}
    setFormData(prev => ({ ...(prev ?? {}), [name ?? '']: value ?? '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData ?? {}),
      })

      const data = await response?.json?.()

      if (data?.success) {
        // Redirigir a WhatsApp
        const phoneNumber = "524776719821" 
        const text = `Hola Lic. Olga. Soy ${formData.name}. Me interesa agendar una cita para el servicio de ${formData.service}.\n\n📅 Fecha: ${formData.preferredDate}\n⏰ Hora: ${formData.preferredTime}\n\nMotivo: ${formData.message || 'Consulta general'}\n\nMi correo es: ${formData.email}\nMi teléfono es: ${formData.phone}`
        const encodedText = encodeURIComponent(text)
        window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank')

        setIsSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'APSID',
          preferredDate: '',
          preferredTime: '',
          message: '',
        })
      } else {
        setError(data?.message ?? 'Error al enviar la solicitud')
      }
    } catch (err) {
      setError('Error de conexión. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-pastel-50 rounded-3xl p-8 shadow-lg text-center border border-pastel-100"
      >
        <div className="w-20 h-20 bg-apsid-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-apsid-500" />
        </div>
        <h3 className="font-serif text-2xl text-apsid-500 mb-4">¡Solicitud Enviada!</h3>
        <p className="text-slate-600 mb-6">
          Hemos recibido tu solicitud de cita. Nos pondremos en contacto contigo pronto para confirmar la fecha y hora.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-3 bg-apsid-500 text-white rounded-xl hover:bg-apsid-600 transition-colors"
        >
          Agendar otra cita
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-pastel-50 rounded-3xl p-6 md:p-8 shadow-lg border border-pastel-100">
      <h3 className="font-serif text-xl text-apsid-500 mb-6">Solicitud de Cita</h3>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-5">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-apsid-500 mb-1">Nombre completo *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="name"
              value={formData?.name ?? ''}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-pastel-200 rounded-xl focus:ring-2 focus:ring-apsid-300 focus:border-apsid-300 outline-none transition-all bg-white"
              placeholder="Tu nombre"
            />
          </div>
        </div>

        {/* Email y Teléfono */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-apsid-500 mb-1">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData?.email ?? ''}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-pastel-200 rounded-xl focus:ring-2 focus:ring-apsid-300 focus:border-apsid-300 outline-none transition-all bg-white"
                placeholder="tu@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-apsid-500 mb-1">Teléfono *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                name="phone"
                value={formData?.phone ?? ''}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-pastel-200 rounded-xl focus:ring-2 focus:ring-apsid-300 focus:border-apsid-300 outline-none transition-all bg-white"
                placeholder="Tu teléfono"
              />
            </div>
          </div>
        </div>

        {/* Servicio */}
        <div>
          <label className="block text-sm font-medium text-apsid-500 mb-1">Servicio de interés *</label>
          <select
            name="service"
            value={formData?.service ?? 'APSID'}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-pastel-200 rounded-xl focus:ring-2 focus:ring-apsid-300 focus:border-apsid-300 outline-none transition-all bg-white"
          >
            <option value="APSID">APSID - Psicología Clínica</option>
            <option value="MANAOCA">MANAOCA - Educación / Desarrollo</option>
            <option value="Ambos">Ambos servicios</option>
          </select>
        </div>

        {/* Fecha y Hora */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-apsid-500 mb-1">Fecha preferida *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="date"
                name="preferredDate"
                value={formData?.preferredDate ?? ''}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-pastel-200 rounded-xl focus:ring-2 focus:ring-apsid-300 focus:border-apsid-300 outline-none transition-all bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-apsid-500 mb-1">Hora preferida *</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="time"
                name="preferredTime"
                value={formData?.preferredTime ?? ''}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-pastel-200 rounded-xl focus:ring-2 focus:ring-apsid-300 focus:border-apsid-300 outline-none transition-all bg-white"
              />
            </div>
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-sm font-medium text-apsid-500 mb-1">Motivo de consulta</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <textarea
              name="message"
              value={formData?.message ?? ''}
              onChange={handleChange}
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-pastel-200 rounded-xl focus:ring-2 focus:ring-apsid-300 focus:border-apsid-300 outline-none transition-all resize-none bg-white"
              placeholder="Cuéntanos brevemente el motivo de tu consulta (opcional)"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-apsid-500 text-white rounded-xl hover:bg-apsid-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar Solicitud
            </>
          )}
        </button>

        <p className="text-xs text-slate-500 text-center">
          Tu información es confidencial y será tratada con total privacidad.
        </p>
      </div>
    </form>
  )
}