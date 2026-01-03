import { Shield, Clock, MapPin, X } from 'lucide-react';

// Disclaimer Modal - Estilo con nebulosa de fondo
const DisclaimerModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Fondo con nebulosa realista */}
      <div 
        className="absolute inset-0 bg-black/90"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.85)),
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(220, 38, 38, 0.3), transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(185, 28, 28, 0.2), transparent 50%),
            radial-gradient(ellipse 50% 35% at 50% 50%, rgba(250, 204, 21, 0.15), transparent 45%),
            radial-gradient(ellipse 40% 30% at 30% 80%, rgba(147, 51, 234, 0.12), transparent 40%),
            radial-gradient(ellipse 35% 25% at 70% 20%, rgba(249, 115, 22, 0.1), transparent 35%)
          `
        }}
      />
      
      {/* Estrellas de fondo */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 50% 30%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1.5px 1.5px at 15% 70%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 85% 85%, rgba(255,255,255,0.4), transparent)
          `
        }}
      />
      
      <div className="relative galactic-card rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
        {/* Borde brillante superior */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60" />
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5 text-stone-400" />
        </button>
        
        {/* Header */}
        <div className="relative px-6 pt-8 pb-4 text-center">
          <h2 className="text-2xl font-bold text-white">
            Aviso Legal
          </h2>
          <p className="text-stone-500 text-sm mt-1">Antes de continuar</p>
        </div>

        {/* Content */}
        <div className="px-6 pb-4 space-y-3">
          {/* Card 1 */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-amber-950/50 to-amber-900/30 border border-amber-500/20 rounded-2xl p-4 hover:border-amber-500/40 transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-amber-100 text-sm font-medium leading-relaxed">
                  Comercio libre entre personas y negocios
                </p>
                <p className="text-amber-200/60 text-xs mt-1.5 leading-relaxed">
                  Todo lo que hagas es tu responsabilidad. <span className="text-amber-400 font-medium">Verifica antes de comprar.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-950/50 to-blue-900/30 border border-blue-500/20 rounded-2xl p-4 hover:border-blue-500/40 transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">
                  Dale tiempo si está lenta
                </p>
                <p className="text-blue-200/60 text-xs mt-1.5 leading-relaxed">
                  Comprueba tu conexión o sigue esperando un momento.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-purple-950/50 to-purple-900/30 border border-purple-500/20 rounded-2xl p-4 hover:border-purple-500/40 transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-purple-100 text-sm font-medium leading-relaxed">
                  ¿No hay tiendas cerca?
                </p>
                <p className="text-purple-200/60 text-xs mt-1.5 leading-relaxed">
                  Es porque no hay registradas en tu zona. <span className="text-purple-400 font-medium">¡Invita a tu pulpería favorita!</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={onClose}
            className="w-full relative overflow-hidden galactic-button text-white py-4 rounded-2xl font-bold text-lg transition-all group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">
              Entendido, continuar
            </span>
          </button>
          
          <p className="text-center text-stone-600 text-xs mt-4">
            🇭🇳 Conectando comunidades hondureñas
          </p>
        </div>
        
        {/* Borde brillante inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      </div>
    </div>
  );
};

export default DisclaimerModal;
