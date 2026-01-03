import { useState, useEffect } from 'react';
import { api } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { 
  Megaphone, Calendar, ExternalLink, ChevronRight, Sparkles, 
  Store, Clock, ArrowRight, Star, Gift, Zap
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
  
  // Combinar todos los anuncios
  const allAnnouncements = [
    ...globalAnnouncements.map(a => ({ ...a, type: 'global' })),
    ...featuredAds.map(a => ({ ...a, type: 'featured' }))
  ];

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
              <h2 className="text-lg font-black text-white">Anuncios</h2>
              <p className="text-sm text-orange-300">Ofertas exclusivas y promociones</p>
            </div>
          </div>
        </div>

        {/* All Announcements */}
        <div className="space-y-4">
          {allAnnouncements.length === 0 ? (
            <div className="bg-stone-800/50 backdrop-blur-sm rounded-2xl border border-stone-700/50 p-8 text-center">
              <Megaphone className="w-12 h-12 mx-auto text-stone-600 mb-3" />
              <h3 className="text-white font-bold mb-2">Sin anuncios</h3>
              <p className="text-stone-500 text-sm">No hay anuncios activos en este momento</p>
            </div>
          ) : (
            allAnnouncements.map((item, index) => (
              <div 
                key={item.announcement_id || item.ad_id || index}
                className={`bg-stone-800/50 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all hover:border-orange-500/50 ${
                  item.type === 'global' && item.priority > 5 ? 'border-orange-500/30' : 'border-stone-700/50'
                }`}
              >
                {/* Priority Badge for Global */}
                {item.type === 'global' && item.priority > 5 && (
                  <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-1.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-bold">DESTACADO</span>
                  </div>
                )}
                
                {/* Sponsored Badge for Featured */}
                {item.type === 'featured' && (
                  <div className="bg-gradient-to-r from-amber-600 to-yellow-500 px-4 py-1.5 flex items-center gap-2">
                    <Star className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-bold">PATROCINADO</span>
                  </div>
                )}
                
                {/* Image - Fixed aspect ratio */}
                {(item.image_url) && (
                  <div className="relative bg-stone-900 aspect-video">
                    <img 
                      src={item.image_url} 
                      alt={item.title || item.pulperia_name || 'Anuncio'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    {item.type === 'global' && item.priority > 5 && (
                      <Zap className="w-5 h-5 text-amber-400" />
                    )}
                    {item.title || item.pulperia_name}
                  </h3>
                  
                  {(item.content || item.description) && (
                    <p className="text-stone-400 text-sm mb-4 whitespace-pre-wrap">
                      {item.content || item.description}
                    </p>
                  )}
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.created_at)}
                      {item.type === 'featured' && item.pulperia_name && (
                        <>
                          <span className="mx-1">•</span>
                          <Store className="w-3 h-3" />
                          {item.pulperia_name}
                        </>
                      )}
                    </div>
                    
                    {item.link_url && (
                      <a 
                        href={item.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors"
                      >
                        Ver más
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    
                    {item.type === 'featured' && item.pulperia_id && (
                      <button
                        onClick={() => navigate(`/pulperia/${item.pulperia_id}`)}
                        className="flex items-center gap-1 text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors"
                      >
                        Ver tienda
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

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
