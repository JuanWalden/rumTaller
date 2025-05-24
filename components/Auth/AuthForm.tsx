
import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../config/firebase';
import LoadingSpinner from '../Common/LoadingSpinner';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      // Successful login/signup will trigger onAuthStateChanged and App component will re-render
    } catch (err: any) {
      setError(err.message || 'Fallo al autenticar. Por favor, revisa tus credenciales.');
      console.error("Auth error:", err);
    }
    setLoading(false);
  };

  if (!auth) { 
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
                <h2 className="text-2xl font-bold mb-4 text-red-500">Firebase No Inicializado</h2>
                <p className="text-gray-300">
                    Los servicios de autenticación no están disponibles. Asegúrate de que Firebase esté configurado correctamente.
                </p>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 mb-8">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
        {error && <p className="bg-red-700/50 text-red-300 p-3 rounded-md mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-blue-700 disabled:opacity-70 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />)}
            {isLogin ? 'Entrar' : 'Registrarse'}
          </button>
        </form>
        <button
          onClick={() => { setIsLogin(!isLogin); setError(''); }}
          className="mt-6 text-sm text-center w-full text-purple-400 hover:text-purple-300 transition-colors"
        >
          {isLogin ? '¿No tienes cuenta? Crear una' : '¿Ya tienes cuenta? Iniciar Sesión'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
