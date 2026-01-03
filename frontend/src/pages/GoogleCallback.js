import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { XCircle } from 'lucide-react';
import { BACKEND_URL } from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import GalacticLoader from '../components/GalacticLoader';

// Detectar si es el dominio de producción (lapulperiahn.shop)
const isCustomDomain = () => {
  const hostname = window.location.hostname;
  return hostname === 'lapulperiahn.shop' || hostname === 'www.lapulperiahn.shop';
};

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithUser } = useAuth();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Procesando...');

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      console.log('[GoogleCallback] Starting...');
      console.log('[GoogleCallback] Domain:', window.location.hostname);
      console.log('[GoogleCallback] Is custom domain:', isCustomDomain());
      console.log('[GoogleCallback] Code:', code ? 'present' : 'missing');

      // Solo procesar si es dominio de producción (lapulperiahn.shop)
      if (!isCustomDomain()) {
        console.log('[GoogleCallback] Not production domain, redirecting to home');
        navigate('/', { replace: true });
        return;
      }

      if (errorParam) {
        setError('Autenticación cancelada');
        setTimeout(() => navigate('/', { replace: true }), 3000);
        return;
      }

      if (!code) {
        setError('Código no encontrado');
        setTimeout(() => navigate('/', { replace: true }), 3000);
        return;
      }

      try {
        setStatus('Verificando con Google...');
        
        const redirectUri = `${window.location.origin}/auth/callback`;
        console.log('[GoogleCallback] Backend URL:', BACKEND_URL);
        console.log('[GoogleCallback] Redirect URI:', redirectUri);
        
        // Intercambiar código por sesión
        const response = await axios.post(
          `${BACKEND_URL}/api/auth/google/callback`,
          null,
          {
            params: { code, redirect_uri: redirectUri },
            timeout: 30000
          }
        );

        console.log('[GoogleCallback] Authentication successful');

        if (response.data && response.data.session_token) {
          setStatus('¡Bienvenido!');
          
          // Guardar token en localStorage
          localStorage.setItem('session_token', response.data.session_token);
          
          // Actualizar el contexto de auth
          loginWithUser(response.data);
          
          // Determinar redirección
          const user = response.data;
          
          setTimeout(async () => {
            if (!user.user_type) {
              navigate('/select-type', { replace: true });
            } else if (user.user_type === 'pulperia') {
              navigate('/dashboard', { replace: true });
            } else {
              navigate('/map', { replace: true });
            }
          }, 500);
        } else {
          throw new Error('No se recibió token de sesión');
        }
      } catch (err) {
        console.error('[GoogleCallback] Error:', err);
        const errorMsg = err.response?.data?.detail || err.message || 'Error al iniciar sesión';
        setError(errorMsg);
        setTimeout(() => navigate('/', { replace: true }), 4000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, loginWithUser]);

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center relative overflow-hidden">
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
      
      <div className="relative z-10 text-center px-4">
        {error ? (
          <>
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <p className="text-red-400 font-medium text-lg">{error}</p>
            <p className="text-stone-500 text-sm mt-2">Redirigiendo...</p>
          </>
        ) : (
          <>
            <GalacticLoader size="large" text={status} />
            <p className="text-stone-500 text-sm mt-4">Conectando con Google</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
