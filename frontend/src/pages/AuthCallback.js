import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import GalacticLoader from '../components/GalacticLoader';

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
const AuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent double processing (StrictMode)
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleAuth = async () => {
      try {
        console.log('[AuthCallback] Processing authentication...');
        console.log('[AuthCallback] Current URL:', window.location.href);
        
        // Extract session_id from URL hash
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const sessionId = params.get('session_id');

        if (!sessionId) {
          console.error('[AuthCallback] No session_id found in URL');
          toast.error('Error de autenticación: No se recibió información de sesión');
          setTimeout(() => navigate('/', { replace: true }), 2000);
          return;
        }

        console.log('[AuthCallback] Session ID found, calling login...');
        const user = await login(sessionId);

        if (!user) {
          console.error('[AuthCallback] Login failed - no user returned');
          toast.error('Error al procesar la autenticación');
          setTimeout(() => navigate('/', { replace: true }), 2000);
          return;
        }

        console.log('[AuthCallback] Login successful:', user.email);
        
        // Clear the hash from URL
        window.history.replaceState(null, '', window.location.pathname);

        // Redirect based on user type
        if (!user.user_type) {
          console.log('[AuthCallback] New user - redirecting to type selector');
          navigate('/select-type', { replace: true, state: { user } });
        } else if (user.user_type === 'pulperia') {
          console.log('[AuthCallback] Pulperia user - redirecting to dashboard');
          toast.success(`¡Bienvenido de vuelta, ${user.name}!`);
          navigate('/dashboard', { replace: true, state: { user } });
        } else {
          console.log('[AuthCallback] Cliente user - redirecting to map');
          toast.success(`¡Bienvenido de vuelta, ${user.name}!`);
          navigate('/map', { replace: true, state: { user } });
        }
      } catch (error) {
        console.error('[AuthCallback] Error:', error);
        toast.error('Error al iniciar sesión. Por favor intenta nuevamente.');
        setTimeout(() => navigate('/', { replace: true }), 2000);
      }
    };

    handleAuth();
  }, [login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 relative overflow-hidden">
      {/* Nebulosa de fondo */}
      <div 
        className="absolute inset-0 animate-nebula-pulse"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 30% 50%, rgba(220, 38, 38, 0.25), transparent 50%),
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(250, 204, 21, 0.15), transparent 45%),
            radial-gradient(ellipse 60% 50% at 50% 70%, rgba(147, 51, 234, 0.1), transparent 40%)
          `
        }}
      />
      {/* Estrellas */}
      <div 
        className="absolute inset-0 animate-twinkle"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 10% 20%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 50% 30%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 90% 45%, rgba(255,255,255,0.6), transparent)
          `
        }}
      />
      <div className="relative z-10 text-center">
        <GalacticLoader size="large" text="Iniciando sesión..." />
        <p className="text-stone-500 text-sm mt-4">Conectando con Google</p>
      </div>
    </div>
  );
};

export default AuthCallback;
