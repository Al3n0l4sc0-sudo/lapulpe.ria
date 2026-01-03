import { useState, useEffect } from 'react';
import { api } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { 
  Megaphone, Calendar, ExternalLink, ChevronRight, Sparkles, 
  Store, Clock, ArrowRight, Star, Gift, Zap, Image as ImageIcon
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import AnimatedBackground from '../components/AnimatedBackground';
import GalacticLoader from '../components/GalacticLoader';

const GlobalAnnouncementsPage = ({ user }) => {
  const navigate = useNavigate();
  const [globalAnnouncements, setGlobalAnnouncements] = useState([]);
  const [featuredAds, setFeaturedAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('global');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [globalRes, featuredRes] = await Promise.all([
          api.get('/api/global-announcements').catch(() => ({ data: [] })),
          api.get('/api/featured-ads').catch(() => ({ data: [] }))
        ]);
        
        setGlobalAnnouncements(globalRes.data || []);
        setFeaturedAds(featuredRes.data || []);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-HN', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const cartCount = JSON.parse(localStorage.getItem('cart') || '[]').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
        <AnimatedBackground variant="minimal" />
        <GalacticLoader text="Cargando anuncios..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 pb-24">
      <AnimatedBackground variant="minimal" />
      
      <Header 
        user={user} 
        title="Anuncios" 
        subtitle="Ofertas y novedades"
      />

      {/* Hero Section */}
      <div className="relative z-10 px-4 py-6">
        <div className="bg-gradient-to-r from-orange-600/20 to-amber-600/20 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Centro de Anuncios</h2>
              <p className="text-sm text-orange-300">Ofertas exclusivas y promociones</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-stone-800/50 backdrop-blur-sm rounded-xl p-1 border border-stone-700/50 mb-6">
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'global' 
                ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg' 
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            Globales
            {globalAnnouncements.length > 0 && (
              <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {globalAnnouncements.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'featured' 
                ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg' 
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Star className="w-4 h-4" />
            Destacados
            {featuredAds.length > 0 && (
              <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {featuredAds.length}
              </span>
            )}
          </button>
        </div>

        {/* Global Announcements Tab */}
        {activeTab === 'global' && (
          <div className="space-y-4">
            {globalAnnouncements.length === 0 ? (
              <div className="bg-stone-800/50 backdrop-blur-sm rounded-2xl border border-stone-700/50 p-8 text-center">
                <Megaphone className="w-12 h-12 mx-auto text-stone-600 mb-3" />
                <h3 className="text-white font-bold mb-2">Sin anuncios globales</h3>
                <p className="text-stone-500 text-sm">No hay anuncios activos en este momento</p>
              </div>
            ) : (
              globalAnnouncements.map((announcement, index) => (
                <div 
                  key={announcement.announcement_id}
                  className={`bg-stone-800/50 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all hover:border-orange-500/50 ${
                    announcement.priority > 5 ? 'border-orange-500/30' : 'border-stone-700/50'
                  }`}
                >
                  {/* Priority Badge */}
                  {announcement.priority > 5 && (
                    <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-1.5 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-white text-xs font-bold">DESTACADO</span>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-4">
                    {/* Image */}
                    {announcement.image_url && (
                      <div className="relative mb-4 rounded-xl overflow-hidden">
                        <img 
                          src={announcement.image_url} 
                          alt={announcement.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
                      </div>
                    )}
                    
                    {/* Title & Content */}
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      {announcement.priority > 5 && (
                        <Zap className="w-5 h-5 text-amber-400" />
                      )}
                      {announcement.title}
                    </h3>
                    <p className="text-stone-400 text-sm mb-4 whitespace-pre-wrap">
                      {announcement.content}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(announcement.created_at)}
                        {announcement.expires_at && (
                          <>
                            <span className="mx-1">•</span>
                            <Clock className="w-3 h-3" />
                            Expira: {formatDate(announcement.expires_at)}
                          </>
                        )}
                      </div>
                      
                      {announcement.link_url && (
                        <a 
                          href={announcement.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors"
                        >
                          Ver más
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Featured Ads Tab */}
        {activeTab === 'featured' && (
          <div className="space-y-4">
            {featuredAds.length === 0 ? (
              <div className="bg-stone-800/50 backdrop-blur-sm rounded-2xl border border-stone-700/50 p-8 text-center">
                <Star className="w-12 h-12 mx-auto text-stone-600 mb-3" />
                <h3 className="text-white font-bold mb-2">Sin anuncios destacados</h3>
                <p className="text-stone-500 text-sm">Las pulperías pueden promocionarse aquí</p>
              </div>
            ) : (
              featuredAds.map((ad) => (
                <button 
                  key={ad.ad_id}
                  onClick={() => navigate(ad.link_url || `/p/${ad.pulperia_id}`)}
                  className="w-full bg-stone-800/50 backdrop-blur-sm rounded-2xl border border-stone-700/50 overflow-hidden text-left transition-all hover:border-amber-500/50 hover:scale-[1.01]"
                >
                  {/* Image */}
                  {ad.image_url && (
                    <div className="relative">
                      <img 
                        src={ad.image_url} 
                        alt={ad.title || ad.pulperia_name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="bg-amber-500/90 text-black text-xs font-bold px-2 py-1 rounded-full">
                          PATROCINADO
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold truncate">
                          {ad.title || ad.pulperia_name}
                        </h3>
                        {ad.description && (
                          <p className="text-stone-400 text-sm line-clamp-2 mt-1">
                            {ad.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Store className="w-3 h-3 text-stone-500" />
                          <span className="text-stone-500 text-xs">{ad.pulperia_name}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-stone-600 flex-shrink-0" />
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {/* Quick Access Section */}
        <div className="mt-8">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-400" />
            Acceso Rápido
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/map')}
              className="bg-stone-800/50 backdrop-blur-sm rounded-xl border border-stone-700/50 p-4 text-left hover:border-red-500/50 transition-all"
            >
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mb-3">
                <Store className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-white font-bold text-sm">Ver Pulperías</p>
              <p className="text-stone-500 text-xs">Explora el mapa</p>
            </button>
            
            <button
              onClick={() => navigate('/jobs')}
              className="bg-stone-800/50 backdrop-blur-sm rounded-xl border border-stone-700/50 p-4 text-left hover:border-yellow-500/50 transition-all"
            >
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-white font-bold text-sm">Chambas</p>
              <p className="text-stone-500 text-xs">Empleos y servicios</p>
            </button>
          </div>
        </div>
      </div>

      <BottomNav user={user} cartCount={cartCount} activeTab="anuncios" />
    </div>
  );
};

export default GlobalAnnouncementsPage;
