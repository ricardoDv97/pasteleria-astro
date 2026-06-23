import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Lock, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function LoginCard() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null); // 'success' | 'error' | null

  const onSubmit = (data) => {
    setIsLoading(true);
    setLoginStatus(null);

    // Simulación de petición al backend de Astro (1.5 segundos de retraso)
    setTimeout(() => {
      setIsLoading(false);
      // Credenciales de prueba temporales para el MVP
      if (data.email === "admin@amanecerpastelero.com" && data.password === "sabri123") {
        setLoginStatus('success');
        // Aquí redirigirías al panel administrativo en el futuro:
        // window.location.href = '/admin';
      } else {
        setLoginStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl shadow-pink-100/40 border border-pink-100/30 text-left">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Panel de Administración</h2>
        <p className="text-xs text-slate-500 mt-1">Ingresa tus credenciales para gestionar el catálogo</p>
      </div>

      {/* Alertas de Estado */}
      {loginStatus === 'success' && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700 border border-emerald-100">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>¡Acceso concedido! Redirigiendo...</span>
        </div>
      )}

      {loginStatus === 'error' && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-700 border border-rose-100">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>Usuario o contraseña incorrectos.</span>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Campo Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Correo Electrónico</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input 
              type="email" 
              placeholder="admin@amanecerpastelero.com"
              {...register("email", { 
                required: "El correo es obligatorio",
                pattern: { value: /^\S+@\S+$/i, message: "Formato de correo inválido" }
              })}
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-pink-400 focus:outline-none text-slate-800"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs font-medium text-rose-500">{errors.email.message}</p>}
        </div>

        {/* Campo Contraseña */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input 
              type="password" 
              placeholder="••••••••"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-pink-400 focus:outline-none text-slate-800"
            />
          </div>
          {errors.password && <p className="mt-1 text-xs font-medium text-rose-500">{errors.password.message}</p>}
        </div>

        {/* Botón con Spinner Integrado */}
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 hover:scale-[1.01] transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verificando seguridad...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </button>

      </form>
    </div>
  );
}