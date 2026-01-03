import { useState, useEffect, useMemo } from 'react';
import { api, BACKEND_URL } from '../config/api';
import { toast } from 'sonner';
import { User as UserIcon, LogOut, Mail, CreditCard, Heart, Shield, Store, ShoppingBag, ArrowRightLeft, Eye, XCircle, AlertTriangle, Sparkles, Star, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import AnimatedBackground from '../components/AnimatedBackground';
import GalacticLoader from '../components/GalacticLoader';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';


const UserProfile = () => {
  const navigate = useNavigate();
  const { user, loading, logout, setUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [changingType, setChangingType] = useState(false);
  const [myPulperias, setMyPulperias] = useState([]);
  const [showCloseStoreDialog, setShowCloseStoreDialog] = useState(false);
  const [selectedPulperiaToClose, setSelectedPulperiaToClose] = useState(null);
  const [closeConfirmation, setCloseConfirmation] = useState('');
  const [isClosingStore, setIsClosingStore] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        setCart([]);
      }
    }
    
    const fetchMyPulperias = async () => {
      if (user?.user_type === 'pulperia') {
        try {
          const res = await api.get('/api/pulperias');
          const mine = res.data.filter(p => p.owner_user_id === user.user_id);
          setMyPulperias(mine);
        } catch (e) {
          console.error('Error fetching pulperias:', e);
        }
      }
    };
    
    if (user) {
      fetchMyPulperias();
    }
  }, [user]);

  const handleCloseStore = async () => {
    if (!selectedPulperiaToClose) return;
    
    if (closeConfirmation.trim().toLowerCase() !== selectedPulperiaToClose.name.trim().toLowerCase()) {
      toast.error(`Debes escribir exactamente "${selectedPulperiaToClose.name}" para confirmar`);
      return;
    }
    
    setIsClosingStore(true);
    try {
      const response = await api.delete(`/api/pulperias/${selectedPulperiaToClose.pulperia_id}/close`, {
        data: { confirmation_phrase: closeConfirmation }
      });
      
      toast.success(response.data.message || '¡Tu tienda ha sido cerrada!');
      setShowCloseStoreDialog(false);
      setCloseConfirmation('');
      setSelectedPulperiaToClose(null);
      
      const res = await api.get('/api/pulperias');
      const mine = res.data.filter(p => p.owner_user_id === user.user_id);
      setMyPulperias(mine);
      
      if (mine.length === 0) {
        toast.info('Puedes crear una nueva pulpería desde el Dashboard');
      }
      
    } catch (error) {
      console.error('Error closing store:', error);
      const errorMsg = error.response?.data?.detail || 'Error al cerrar la tienda';
      toast.error(errorMsg);
    } finally {
      setIsClosingStore(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('cart');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  const handleChangeUserType = async () => {
    if (changingType) return;
    
    const newType = user.user_type === 'cliente' ? 'pulperia' : 'cliente';
    const confirmMsg = newType === 'cliente' 
      ? '¿Quieres cambiar a cuenta de Cliente?' 
      : '¿Quieres cambiar a cuenta de Pulpería?';
    
    if (!window.confirm(confirmMsg)) return;
    
    setChangingType(true);
    try {
      const response = await api.post(`/api/auth/change-user-type`,
        { new_type: newType },
        { withCredentials: true }
      );
      
      setUser(response.data);
      toast.success(`¡Cambiado a ${newType === 'cliente' ? 'Cliente' : 'Pulpería'}!`);
      
      if (newType === 'cliente') {
        navigate('/map');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error changing user type:', error);
      toast.error('Error al cambiar tipo de cuenta');
    } finally {
      setChangingType(false);
    }
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center relative overflow-hidden">
        <AnimatedBackground variant="minimal" />
        <div className="relative z-10">
          <GalacticLoader size="large" text="Cargando perfil..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 pb-24 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header con nebulosa personalizada */}
      <div className="relative overflow-hidden">
        {/* Fondo con nebulosa animada del perfil */}
        <div 
          className="absolute inset-0 animate-nebula-pulse"
          style={{
            background: `
              radial-gradient(ellipse 120% 100% at 50% 0%, rgba(220, 38, 38, 0.4), transparent 50%),
              radial-gradient(ellipse 80% 80% at 20% 50%, rgba(250, 204, 21, 0.2), transparent 40%),
              radial-gradient(ellipse 80% 80% at 80% 50%, rgba(147, 51, 234, 0.15), transparent 40%)
            `
          }}
        />
        
        {/* Estrellas en el header */}
        <div 
          className="absolute inset-0 animate-twinkle"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 15% 25%, rgba(255,255,255,0.8), transparent),
              radial-gradient(1.5px 1.5px at 35% 65%, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 55% 20%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1.5px 1.5px at 75% 45%, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 90% 75%, rgba(255,255,255,0.6), transparent)
            `
          }}
        />
        
        <div className="relative text-white px-6 py-10 text-center">
          {/* Avatar con glow animado */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 rounded-full blur-lg opacity-50 animate-pulse scale-110" />
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="relative w-24 h-24 rounded-full border-2 border-white/30 shadow-2xl"
              />
            ) : (
              <div className="relative w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-2 border-white/30">
                <UserIcon className="w-12 h-12" />
              </div>
            )}
            {/* Indicador de tipo de cuenta */}
            <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center ${
              user?.user_type === 'cliente' 
                ? 'bg-gradient-to-br from-blue-500 to-blue-700' 
                : 'bg-gradient-to-br from-amber-500 to-amber-700'
            } border-2 border-stone-950 shadow-lg`}>
              {user?.user_type === 'cliente' ? (
                <ShoppingBag className="w-4 h-4 text-white" />
              ) : (
                <Store className="w-4 h-4 text-white" />
              )}
            </div>
          </div>
          
          {/* Nombre con efecto */}
          <h1 className="text-2xl font-black mb-1 font-galactic tracking-wide">{user?.name}</h1>
          <p className="text-white/60 text-sm mb-3">{user?.email}</p>
          
          {/* Badge de tipo de cuenta */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            {user?.user_type === 'cliente' ? 'Cliente Galáctico' : 'Dueño Estelar'}
          </div>
          
          {/* Admin Badge */}
          {user?.is_admin && (
            <div className="inline-flex items-center gap-2 mt-2 ml-2 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full text-sm font-bold text-white shadow-lg shadow-amber-500/30">
              <Shield className="w-4 h-4" /> Admin
            </div>
          )}
        </div>
      </div>

      {/* Profile Actions - Sin recuadros innecesarios */}
      <div className="relative z-10 px-4 py-6 space-y-3">
        {/* Admin Panel Access */}
        {user?.is_admin && (
          <button
            onClick={() => navigate('/admin')}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-500 rounded-2xl p-4 flex items-center gap-4 hover:from-amber-500 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-white">Panel de Administrador</p>
              <p className="text-sm text-white/70">Gestionar anuncios y pulperías</p>
            </div>
            <Rocket className="w-5 h-5 text-white/60" />
          </button>
        )}

        {/* View Ad Assignment Log */}
        <button
          onClick={() => navigate('/ad-log')}
          className="w-full p-4 flex items-center gap-4 hover:bg-white/5 rounded-2xl transition-all active:scale-[0.98] group border border-stone-800/50"
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
            <Eye className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold text-white">Registro de Anuncios</p>
            <p className="text-sm text-stone-500">Ve cómo se asignan los perks</p>
          </div>
          <Star className="w-5 h-5 text-stone-600 group-hover:text-blue-400 transition-colors" />
        </button>

        {/* Change Account Type */}
        <button
          onClick={handleChangeUserType}
          disabled={changingType}
          className="w-full p-4 flex items-center gap-4 hover:bg-white/5 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 group border border-stone-800/50"
        >
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
            <ArrowRightLeft className="w-6 h-6 text-orange-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold text-white">
              {changingType ? 'Cambiando...' : 'Cambiar Tipo de Cuenta'}
            </p>
            <p className="text-sm text-stone-500">
              {user?.user_type === 'cliente' ? 'Cliente' : 'Pulpería'} → {user?.user_type === 'cliente' ? 'Pulpería' : 'Cliente'}
            </p>
          </div>
        </button>

        {/* Close Store - Only for pulperia owners with pulperias */}
        {user?.user_type === 'pulperia' && myPulperias.length > 0 && (
          <div className="p-4 rounded-2xl bg-red-950/30 border border-red-900/30">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-red-400">Cerrar Tienda</h3>
            </div>
            <p className="text-sm text-stone-500 mb-3">
              Cierra tu pulpería permanentemente. Podrás crear una nueva después.
            </p>
            {myPulperias.map(pulperia => (
              <button
                key={pulperia.pulperia_id}
                onClick={() => {
                  setSelectedPulperiaToClose(pulperia);
                  setShowCloseStoreDialog(true);
                }}
                className="w-full p-3 bg-red-900/20 rounded-xl flex items-center gap-3 hover:bg-red-900/30 transition-all mb-2 last:mb-0"
              >
                <Store className="w-5 h-5 text-red-400" />
                <span className="text-white flex-1 text-left">{pulperia.name}</span>
                <span className="text-red-400 text-sm">Cerrar</span>
              </button>
            ))}
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full p-4 flex items-center gap-4 hover:bg-white/5 rounded-2xl transition-all active:scale-[0.98] group border border-stone-800/50"
        >
          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
            <LogOut className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold text-white">Cerrar Sesión</p>
            <p className="text-sm text-stone-500">Salir de tu cuenta</p>
          </div>
        </button>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent my-4" />

        {/* Support Section - Simplificado */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2">
            <Heart className="w-4 h-4 text-red-400" />
            <h3 className="font-bold text-white text-sm">Apoya al Creador</h3>
          </div>
          
          <a 
            href="mailto:onol4sco05@gmail.com"
            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group"
          >
            <Mail className="w-5 h-5 text-red-400 group-hover:text-red-300" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-300">Contacto</p>
              <p className="text-xs text-stone-500 truncate">onol4sco05@gmail.com</p>
            </div>
          </a>

          <a 
            href="https://paypal.me/alejandronolasco979?locale.x=es_XC&country.x=HN"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group"
          >
            <CreditCard className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-300">PayPal</p>
              <p className="text-xs text-stone-500 truncate">Ayuda a mantener la plataforma 🙏</p>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center pt-6">
          <p className="text-sm text-stone-500 font-medium font-galactic">La Pulpería v2.0</p>
          <p className="text-xs text-stone-600 mt-1">© 2024 - Conectando comunidades hondureñas</p>
        </div>
      </div>

      <BottomNav user={user} cartCount={cartCount} />
      
      {/* Dialog para cerrar tienda */}
      <Dialog open={showCloseStoreDialog} onOpenChange={setShowCloseStoreDialog}>
        <DialogContent className="bg-stone-950 border-red-800/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-400 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" />
              ¿Cerrar Tu Tienda?
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-red-900/20 rounded-xl p-4">
              <p className="text-red-300 font-medium mb-2">⚠️ Esta acción eliminará los datos de esta tienda</p>
              <ul className="text-sm text-red-200/70 space-y-1 list-disc pl-4">
                <li>Se eliminarán todos tus productos</li>
                <li>Se eliminarán todas las órdenes</li>
                <li>Se eliminarán todas las reseñas</li>
                <li>Se eliminarán todos tus logros</li>
              </ul>
              <p className="text-green-400 text-sm mt-3">✓ Podrás crear una nueva pulpería después</p>
            </div>
            
            <div>
              <Label className="text-stone-400 text-sm">
                Para confirmar, escribe el nombre de tu pulpería:
              </Label>
              <p className="text-amber-400 font-bold mb-2 text-lg">&quot;{selectedPulperiaToClose?.name}&quot;</p>
              <Input
                value={closeConfirmation}
                onChange={(e) => setCloseConfirmation(e.target.value)}
                placeholder="Escribe el nombre exacto..."
                className="bg-stone-900 border-stone-700 text-white"
                data-testid="close-store-confirmation-input"
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowCloseStoreDialog(false);
                  setCloseConfirmation('');
                  setSelectedPulperiaToClose(null);
                }}
                className="flex-1 border-stone-700 text-stone-400 hover:bg-stone-800"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleCloseStore}
                disabled={isClosingStore || closeConfirmation.trim().toLowerCase() !== selectedPulperiaToClose?.name?.trim().toLowerCase()}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                data-testid="confirm-close-store-button"
              >
                {isClosingStore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Cerrando...
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Cerrar Tienda
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
