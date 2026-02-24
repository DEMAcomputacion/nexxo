import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { api } from '../services/api';

function RegisterBusiness() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }
    
    setLoading(true);
    
    try {
      await api.post('/auth/register-business', {
        companyName: formData.companyName,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { registered: true } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">¡Registro exitoso!</h2>
          <p className="text-neutral-500">Tu negocio ha sido registrado. Serás redirigido al login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <p className="text-neutral-500 mt-2">Registro de Negocio</p>
        </div>
        
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre del Negocio *</label>
              <input
                type="text"
                className="input"
                placeholder="Mi Negocio S.A.S"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                className="input"
                placeholder="contacto@minegocio.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña *</label>
              <input
                type="password"
                className="input"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Confirmar Contraseña *</label>
              <input
                type="password"
                className="input"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
            
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 text-primary rounded border-neutral-300 focus:ring-primary"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                />
                <span className="text-sm text-neutral-600">
                  Acepto los términos y condiciones y la política de privacidad.
                </span>
              </label>
            </div>
            
            {error && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>
          
          <p className="text-center text-sm text-neutral-500 mt-6">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterBusiness;
