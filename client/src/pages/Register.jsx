import { Link } from 'react-router';

function Register() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">NEXXO</h1>
          <p className="text-neutral-500 mt-2">Crear Cuenta</p>
        </div>
        
        <div className="card">
          <p className="text-center mb-6 text-neutral-600">
            ¿Cómo quieres registrarte?
          </p>
          
          <div className="space-y-4">
            <Link
              to="/register/influencer"
              className="block w-full p-4 border-2 border-primary/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Soy Influencer</h3>
                  <p className="text-sm text-neutral-500">Quiero promocionedo mi contenido y conectar con marcas</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/register/client"
              className="block w-full p-4 border-2 border-secondary/20 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Soy Negocio / Marca</h3>
                  <p className="text-sm text-neutral-500">Quiero encontrar influencers para mis campañas</p>
                </div>
              </div>
            </Link>
          </div>
          
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

export default Register;
