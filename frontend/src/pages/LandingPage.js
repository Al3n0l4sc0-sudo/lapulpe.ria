import { useState } from 'react';
import { ArrowRight, Copy, Check, ExternalLink, ShoppingBag, Store, Bell, MapPin } from 'lucide-react';
import DisclaimerModal from '../components/DisclaimerModal';
import { BACKEND_URL } from '../config/api';

// Iconos de redes sociales
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Modal de "Cómo Funciona"
const HowItWorksModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
    <div className="bg-stone-900 rounded-3xl border border-stone-700 max-w-md w-full shadow-2xl max-h-[85vh] overflow-y-auto">
      <div className="px-6 pt-6 pb-4 border-b border-stone-800">
        <h2 className="text-xl font-bold text-white text-center">¿Cómo funciona?</h2>
        <p className="text-stone-500 text-sm text-center mt-1">3 simples pasos</p>
      </div>

      <div className="px-6 py-5 space-y-4">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold">1. Explora</h3>
            <p className="text-stone-400 text-sm mt-1">Encuentra pulperías cercanas a tu ubicación en el mapa</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold">2. Ordena</h3>
            <p className="text-stone-400 text-sm mt-1">Agrega productos al carrito y haz tu pedido</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold">3. Recibe</h3>
            <p className="text-stone-400 text-sm mt-1">Te notificamos cuando tu orden esté lista para recoger</p>
          </div>
        </div>

        <div className="bg-stone-800 rounded-2xl p-4 mt-4">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">¿Tienes una pulpería?</h3>
              <p className="text-stone-400 text-xs mt-1">Registra tu negocio gratis y empieza a recibir pedidos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-bold transition-colors"
        >
          ¡Empezar!
        </button>
      </div>
    </div>
  </div>
);

// Logo de La Pulpería
const PulperiaLogo = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="15" width="80" height="14" rx="2" fill="#DC2626"/>
    <rect x="15" y="18" width="70" height="8" rx="1" fill="#B91C1C"/>
    <path d="M10 32 Q22 26 34 32 Q46 38 58 32 Q70 26 82 32 Q88 29 90 32" 
          fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round"/>
    <rect x="15" y="38" width="70" height="48" rx="2" fill="#FEF3C7"/>
    <rect x="15" y="38" width="70" height="48" rx="2" fill="none" stroke="#B45309" strokeWidth="1.5"/>
    <rect x="22" y="46" width="18" height="16" rx="1" fill="#1F2937"/>
    <line x1="31" y1="46" x2="31" y2="62" stroke="#FCD34D" strokeWidth="1.5"/>
    <line x1="22" y1="54" x2="40" y2="54" stroke="#FCD34D" strokeWidth="1.5"/>
    <rect x="60" y="46" width="18" height="16" rx="1" fill="#1F2937"/>
    <line x1="69" y1="46" x2="69" y2="62" stroke="#FCD34D" strokeWidth="1.5"/>
    <line x1="60" y1="54" x2="78" y2="54" stroke="#FCD34D" strokeWidth="1.5"/>
    <path d="M42 86 L42 58 Q50 48 58 58 L58 86 Z" fill="#78350F"/>
    <path d="M44 86 L44 60 Q50 52 56 60 L56 86" fill="none" stroke="#D4AF37" strokeWidth="1"/>
    <circle cx="54" cy="72" r="2.5" fill="#FCD34D"/>
    <rect x="10" y="86" width="80" height="6" rx="2" fill="#92400E"/>
  </svg>
);

const LandingPage = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    
    // USAR SOLO GOOGLE OAUTH PROPIO
    try {
      const redirectUri = `${window.location.origin}/auth/callback`;
      console.log('[Login] Initiating Google OAuth');
      console.log('[Login] Backend:', BACKEND_URL);
      console.log('[Login] Redirect URI:', redirectUri);
      
      const response = await fetch(
        `${BACKEND_URL}/api/auth/google/url?redirect_uri=${encodeURIComponent(redirectUri)}`,
        { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('[Login] Response received');
      
      if (data?.auth_url) {
        console.log('[Login] Redirecting to Google OAuth...');
        window.location.href = data.auth_url;
      } else {
        throw new Error('No auth URL received from server');
      }
    } catch (error) {
      console.error('[Login] OAuth error:', error);
      alert('Error al iniciar sesión con Google. Por favor intenta de nuevo.');
      setIsLoggingIn(false);
    }
  };

  const handleDisclaimerClose = () => {
    setShowDisclaimer(false);
    setShowHowItWorks(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'La Pulpería',
          text: '¡Descubre La Pulpería! Conectando comunidades hondureñas',
          url: window.location.origin
        });
      } catch (e) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Modals */}
      {showDisclaimer && <DisclaimerModal onClose={handleDisclaimerClose} />}
      {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} />}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-3 animate-scale-in">
              <PulperiaLogo />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                La <span className="text-red-500">Pulpería</span>
              </h1>
            </div>
            
            <p className="text-stone-500 text-base mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>¿Qué deseaba?</p>
            
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-medium py-3.5 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed animate-scale-in hover-lift"
              style={{ animationDelay: '0.2s' }}
            >
              {!isLoggingIn ? (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Comenzar con Google
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </>
              ) : (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Conectando...
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Section - Redes y Compartir */}
        <div className="px-6 pb-8 animate-slide-in" style={{ animationDelay: '0.3s' }}>
          {/* Social Links */}
          <div className="flex justify-center gap-3 mb-4">
            <a
              href="https://x.com/LaPul_periaHN"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-sm hover:bg-stone-800 text-white py-2.5 px-4 rounded-xl transition-all duration-300 border border-stone-800 hover-lift"
            >
              <XIcon />
              <span className="text-sm font-medium">X</span>
            </a>
            <a
              href="https://www.instagram.com/lapulperiah?igsh=MXJlemJzaTl4NDIxdQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-2.5 px-4 rounded-xl transition-all duration-300 hover-lift"
            >
              <InstagramIcon />
              <span className="text-sm font-medium">Instagram</span>
            </a>
          </div>

          {/* Share Section */}
          <div className="max-w-sm mx-auto">
            <div className="bg-stone-900/50 backdrop-blur-sm rounded-2xl p-3 border border-stone-800">
              <p className="text-stone-500 text-xs text-center mb-2">Comparte La Pulpería</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-stone-800 rounded-lg px-3 py-2 text-xs text-stone-500 truncate">
                  {window.location.host}
                </div>
                <button
                  onClick={handleCopyLink}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${copied ? 'bg-green-600' : 'bg-stone-700 hover:bg-stone-600'} text-white hover-lift`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleShare}
                  className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all duration-300 hover-lift"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-stone-600 text-xs mt-4">🇭🇳 Conectando comunidades hondureñas</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
