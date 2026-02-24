function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="input" placeholder="tu@email.com" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
