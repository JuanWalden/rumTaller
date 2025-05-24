
import React from 'react';
import { LogOut } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import AuthForm from './components/Auth/AuthForm';
import RuminationContent from './components/Rumination/RuminationContent';
import LoadingSpinner from './components/Common/LoadingSpinner';
import { auth, db, firebaseInitializationError } from './config/firebase'; // Import firebaseInitializationError

const AppContent: React.FC = () => {
  const { currentUser, logout, loadingAuth, userId } = useAuth();

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando aplicación..." />
      </div>
    );
  }
  
  const isAuthenticatedUser = currentUser && !currentUser.isAnonymous;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-3 sm:p-6 selection:bg-purple-500 selection:text-white">
      <div className="max-w-7xl mx-auto">
        {isAuthenticatedUser && (
          <div className="flex justify-between items-center mb-6 pt-4 px-2">
            <div className="text-left">
              <p className="text-sm text-gray-300">Conectado como: <span className="font-semibold text-gray-100">{currentUser.email || 'Usuario Registrado'}</span></p>
              <p className="text-xs text-gray-500">User ID: {userId}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-white transition-colors text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        )}

        {(!currentUser || (!isAuthenticatedUser && !currentUser.isAnonymous)) && <AuthForm />}
        
        {(isAuthenticatedUser || currentUser?.isAnonymous) && <RuminationContent />}

        {currentUser?.isAnonymous && (
          <div className="mt-10 p-5 bg-yellow-600/30 text-yellow-200 border border-yellow-500/50 rounded-lg text-center max-w-2xl mx-auto shadow-lg">
            <p className="font-semibold">Estás usando la aplicación de forma anónima.</p>
            <p className="text-sm mt-1">
              Para guardar tu progreso y acceder desde otros dispositivos, por favor {' '}
              <button 
                onClick={async () => { 
                  if(logout) {
                    try {
                      await logout();
                      console.log("Logged out anonymous user to allow sign in/up");
                    } catch (e) {
                      console.error("Error logging out anonymous user:", e);
                    }
                  }
                }} 
                className="underline font-semibold hover:text-yellow-100 transition-colors"
              >
                crea una cuenta o inicia sesión
              </button>.
            </p>
            <p className="text-xs text-gray-400 mt-3">User ID (Anónimo): {userId}</p>
          </div>
        )}
      </div>
       <footer className="text-center py-10 mt-12 border-t border-gray-700/50">
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} RumTaller por Juan Orta. Todos los derechos reservados.</p>
        <p className="text-gray-500 text-xs mt-1">Una herramienta para explorar y entender los ciclos de rumiación.</p>
      </footer>
    </div>
  );
};

const RumTallerApp: React.FC = () => {
  if (firebaseInitializationError) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Error de Configuración de Firebase</h1>
            <p className="text-gray-300 text-sm">
                {firebaseInitializationError}
            </p>
            <p className="mt-3 text-xs text-gray-400">
                Por favor, revisa la consola del navegador para mensajes de error más detallados y asegúrate de que tu configuración de Firebase (API Key, etc.) sea correcta.
            </p>
          </div>
      </div>
    );
  }

  // Fallback check: if no specific error string, but auth/db are still null.
  // This indicates an issue not caught by the API key check or general try-catch in firebase.ts,
  // or that firebase.ts itself couldn't run.
  if (!auth || !db) {
     return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Error de Inicialización de Firebase</h1>
            <p className="text-gray-300 text-sm">
                Los módulos de Firebase (Autenticación o Base de Datos) no se pudieron inicializar correctamente.
                Esto puede suceder si la configuración de Firebase no se cargó o es inválida.
            </p>
             <p className="mt-3 text-xs text-gray-400">
                Revisa la consola del navegador para cualquier error adicional y verifica tu configuración de Firebase.
            </p>
          </div>
      </div>
    );   
  }

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default RumTallerApp;
