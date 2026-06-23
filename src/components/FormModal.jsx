import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Calendar, MessageSquare, User, Phone, Cake } from 'lucide-react';

export default function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    const mensajeBase = `¡Hola! Me gustaría solicitar un presupuesto para un evento.
👤 *Nombre:* ${data.nombre}
📞 *Teléfono:* ${data.telefono}
📅 *Fecha del Evento:* ${data.fecha}
🍰 *Tipo de Producto:* ${data.tipo}
💬 *Detalles/Idea:* ${data.detalles}`;

    const urlWhatsApp = `https://wa.me/543765380766?text=${encodeURIComponent(mensajeBase)}`;
    window.open(urlWhatsApp, '_blank');
    reset();
    setIsOpen(false);
  };

  return (
    <>
      {/* BOTÓN DISPARADOR: Se queda estático en la Navbar perfectamente */}
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-500/10 hover:shadow-pink-500/20 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
      >
        Pedir Presupuesto 🍰
      </button>

      {/* MODAL GLOBAL: Usamos fixed e inset-0 para que rompa el contenedor de la Navbar y flote sobre TODA la web */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] w-screen h-screen bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          
          {/* Tarjeta del Formulario Centrada Absoluta */}
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-pink-50 my-auto">
            
            {/* Cabecera */}
            <div className="flex items-center justify-between border-b border-pink-100/50 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Diseña tu Presupuesto</h3>
                <p className="text-xs text-slate-500">Contanos tu idea y la hacemos realidad</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-pink-50 hover:text-pink-500 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4 text-left">
              
              {/* Campo Nombre */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Ej: Sabrina Gómez"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                    className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-pink-400 focus:outline-none text-slate-800"
                  />
                </div>
                {errors.nombre && <p className="mt-1 text-xs font-medium text-rose-500">{errors.nombre.message}</p>}
              </div>

              {/* Campo Teléfono */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Teléfono de Contacto</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input 
                    type="tel" 
                    placeholder="Ej: 3764123456"
                    {...register("telefono", { required: "El teléfono es obligatorio" })}
                    className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-pink-400 focus:outline-none text-slate-800"
                  />
                </div>
                {errors.telefono && <p className="mt-1 text-xs font-medium text-rose-500">{errors.telefono.message}</p>}
              </div>

              {/* Grid Fecha y Tipo */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Fecha del Evento</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input 
                      type="date" 
                      {...register("fecha", { required: "Selecciona una fecha" })}
                      className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-pink-400 focus:outline-none text-slate-700"
                    />
                  </div>
                  {errors.fecha && <p className="mt-1 text-xs font-medium text-rose-500">{errors.fecha.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Tipo de Pedido</label>
                  <div className="relative">
                    <Cake className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <select 
                      {...register("tipo")}
                      className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-pink-400 focus:outline-none text-slate-700 bg-white"
                    >
                      <option value="Torta de Cumpleaños">Torta de Cumpleaños</option>
                      <option value="Torta de Casamiento">Torta de Casamiento</option>
                      <option value="Mesa Dulce Completa">Mesa Dulce Completa</option>
                      <option value="Tarta Tradicional">Tarta Tradicional</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Detalles */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Detalles o Idea del Diseño</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <textarea 
                    rows="3"
                    placeholder="Contanos los colores, temática o sabores que te imaginas..."
                    {...register("detalles", { required: "Escribe algunos detalles para guiar el presupuesto" })}
                    className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-pink-400 focus:outline-none text-slate-800 resize-none"
                  ></textarea>
                </div>
                {errors.detalles && <p className="mt-1 text-xs font-medium text-rose-500">{errors.detalles.message}</p>}
              </div>

              {/* Botón de Enviar */}
              <button 
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 hover:scale-[1.01] transition-all duration-200 mt-2 cursor-pointer"
              >
                Enviar Solicitud por WhatsApp 🟢
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}