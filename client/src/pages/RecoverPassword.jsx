function RecoverPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h1>
        <p className="text-neutral-600 mb-6 text-center">
          Ingresa tu email y te enviaremos instrucciones para recuperar tu contraseña.
        </p>
        <form>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="input" placeholder="tu@email.com" />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Enviar Instrucciones
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecoverPassword;
