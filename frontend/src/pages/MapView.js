import { useState, useEffect, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { MapPin, Store as StoreIcon, Star, Crown, Sparkles, ChevronRight, Maximize2, Minimize2, Heart, Map, List, Search, Package, X, Store } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import GalacticLoader from '../components/GalacticLoader';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import { api, BACKEND_URL } from '../config/api';

// Función para crear marcador personalizado con foto de la pulpería
const createPulperiaIcon = (pulperia, isFeatured = false) => {
  const logoUrl = pulperia.logo_url || pulperia.image_url;
  const bgColor = pulperia.background_color || '#DC2626';
  
  const borderColor = isFeatured ? '#fbbf24' : '#ffffff';
  const borderWidth = isFeatured ? '3px' : '2px';
  const shadow = isFeatured ? '0 0 12px rgba(251, 191, 36, 0.6)' : '0 2px 8px rgba(0,0,0,0.5)';
  const size = isFeatured ? 48 : 40;
  
  const html = logoUrl 
    ? `<div style="
        width: ${size}px; 
        height: ${size}px; 
        border-radius: 50%; 
        border: ${borderWidth} solid ${borderColor};
        overflow: hidden;
        box-shadow: ${shadow};
        background: ${bgColor};
      ">
        <img src="${logoUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      ${isFeatured ? '<div style="position: absolute; top: -8px; right: -8px; font-size: 14px;">⭐</div>' : ''}`
    : `<div style="
        width: ${size}px; 
        height: ${size}px; 
        border-radius: 50%; 
        border: ${borderWidth} solid ${borderColor};
        background: ${bgColor};
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: ${shadow};
        font-size: 20px;
      ">🏪</div>
      ${isFeatured ? '<div style="position: absolute; top: -8px; right: -8px; font-size: 14px;">⭐</div>' : ''}`;
  
  return L.divIcon({
    html,
    className: 'custom-pulperia-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

function LocationMarker({ position }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14);
    }
  }, [map, position]);

  return position ? (
    <Marker position={position}>
      <Popup>Tu ubicación actual</Popup>
    </Marker>
  ) : null;
}

function MapResizer({ isExpanded }) {
  const map = useMap();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 350);
    return () => clearTimeout(timer);
  }, [map, isExpanded]);
  
  return null;
}

const MapView = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pulperias, setPulperias] = useState([]);
  const [allPulperias, setAllPulperias] = useState([]);
  const [featuredPulperias, setFeaturedPulperias] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [radius, setRadius] = useState(50); // 50km default to show more stores
  const [cart, setCart] = useState([]);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('nearby'); // 'nearby' | 'favorites'
  
  // Product search states
  const [productSearch, setProductSearch] = useState('');
  const [productResults, setProductResults] = useState([]);
  const [searchingProducts, setSearchingProducts] = useState(false);
  const [showProductResults, setShowProductResults] = useState(false);
  const [searchMode, setSearchMode] = useState('products'); // 'products' or 'pulperias'

  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  const filterPulperiasByRadius = useCallback((pulperiasData, coords, radiusKm) => {
    const filtered = pulperiasData.filter(pulperia => {
      if (!pulperia.location) return false;
      const distance = calculateDistance(
        coords[0], coords[1],
        pulperia.location.lat, pulperia.location.lng
      );
      return distance <= radiusKm;
    });
    
    // If no pulperias found nearby, show ALL pulperias
    if (filtered.length === 0 && pulperiasData.length > 0) {
      setPulperias(pulperiasData);
    } else {
      setPulperias(filtered);
    }
  }, [calculateDistance]);

  // Fetch favorites
  const fetchFavorites = useCallback(async () => {
    try {
      const response = await api.get(`/api/favorites`);
      setFavorites(response.data);
    } catch (error) {
      /* Ignore - user might not be logged in */
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pulperias first (doesn't require auth)
        const pulperiasRes = await api.get(`/api/pulperias`);
        setAllPulperias(pulperiasRes.data);
        
        // Try to get featured
        try {
          const featuredRes = await api.get(`/api/ads/featured`);
          setFeaturedPulperias(featuredRes.data);
        } catch (e) {
          setFeaturedPulperias([]);
        }
        
        // Try to get user (might not be logged in)
        try {
          const userRes = await api.get(`/api/auth/me`);
          setUser(userRes.data);
          fetchFavorites();
        } catch (e) {
          setUser(null);
        }

        // Get cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }

        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coords = [position.coords.latitude, position.coords.longitude];
              setUserLocation(coords);
              filterPulperiasByRadius(pulperiasRes.data, coords, radius);
            },
            () => {
              // Use Siguatepeque as fallback (where the pulperias are)
              const fallbackCoords = [14.6, -87.83];
              setUserLocation(fallbackCoords);
              filterPulperiasByRadius(pulperiasRes.data, fallbackCoords, radius);
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
          );
        } else {
          const fallbackCoords = [14.6, -87.83];
          setUserLocation(fallbackCoords);
          filterPulperiasByRadius(pulperiasRes.data, fallbackCoords, radius);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Still set a location so the map shows
        setUserLocation([14.6, -87.83]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterPulperiasByRadius, radius, fetchFavorites]);

  useEffect(() => {
    if (userLocation && allPulperias.length > 0) {
      filterPulperiasByRadius(allPulperias, userLocation, radius);
    }
  }, [radius, userLocation, allPulperias, filterPulperiasByRadius]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      if (userLocation) {
        filterPulperiasByRadius(allPulperias, userLocation, radius);
      }
      return;
    }
    
    try {
      const response = await api.get(`/api/pulperias?search=${searchTerm}`);
      setPulperias(response.data);
    } catch (error) {
      toast.error('Error en la búsqueda');
    }
  };

  // Product search function
  const handleProductSearch = async () => {
    if (!productSearch.trim()) {
      setProductResults([]);
      setShowProductResults(false);
      return;
    }
    
    setSearchingProducts(true);
    try {
      if (searchMode === 'products') {
        const response = await api.get(`/api/products?search=${encodeURIComponent(productSearch)}`);
        setProductResults(response.data || []);
      } else {
        // Search pulperias
        const response = await api.get(`/api/pulperias?search=${encodeURIComponent(productSearch)}`);
        setProductResults(response.data || []);
      }
      setShowProductResults(true);
    } catch (error) {
      toast.error(searchMode === 'products' ? 'Error buscando productos' : 'Error buscando pulperías');
    } finally {
      setSearchingProducts(false);
    }
  };

  const clearProductSearch = () => {
    setProductSearch('');
    setProductResults([]);
    setShowProductResults(false);
  };
  
  const toggleSearchMode = () => {
    setSearchMode(prev => prev === 'products' ? 'pulperias' : 'products');
    setProductSearch('');
    setProductResults([]);
    setShowProductResults(false);
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  // Display pulperias based on active tab
  const displayPulperias = activeTab === 'favorites' ? favorites : pulperias;

  if (loading || !userLocation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950 relative overflow-hidden">
        <AnimatedBackground variant="minimal" />
        <div className="relative z-10">
          <GalacticLoader size="default" text="Cargando mapa..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 pb-24">
      <AnimatedBackground variant="minimal" />
      
      <Header 
        user={user} 
        title="Explorar" 
        subtitle={activeTab === 'favorites' ? `${favorites.length} favoritas` : `${pulperias.length} en ${radius} km`}
      />

      {/* Tabs: Nearby / Favorites */}
      <div className="relative z-10 px-4 pt-3 pb-2">
        <div className="flex gap-2 bg-stone-900 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => setActiveTab('nearby')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'nearby' 
                ? 'bg-red-600 text-white' 
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Map className="w-4 h-4" />
            Cercanas
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'favorites' 
                ? 'bg-red-600 text-white' 
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            Favoritas ({favorites.length})
          </button>
        </div>
      </div>

      {activeTab === 'nearby' && (
        <>
          {/* Search and Filters */}
          <div className="relative z-10 px-4 py-2">
            {/* Radius Selector */}
            <div className="mb-3">
              <div className="flex gap-2">
                {[2, 5, 10, 20].map(r => (
                  <button
                    key={r}
                    onClick={() => setRadius(r)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                      radius === r 
                        ? 'bg-red-600 text-white' 
                        : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {r} km
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Pulperias */}
          {featuredPulperias.length > 0 && (
            <div className="px-4 pt-3">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Destacadas</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
                {featuredPulperias.map((pulperia) => {
                  const bgColor = pulperia.background_color || '#B91C1C';
                  return (
                    <div
                      key={pulperia.pulperia_id}
                      onClick={() => navigate(`/pulperia/${pulperia.pulperia_id}`)}
                      className="flex-shrink-0 w-48 rounded-2xl p-3 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] border border-white/10"
                      style={{ background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}99 100%)` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {pulperia.logo_url ? (
                          <img
                            src={pulperia.logo_url}
                            alt={pulperia.name}
                            className="w-9 h-9 rounded-full object-cover border-2 border-white/30"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                            <StoreIcon className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold truncate text-sm">{pulperia.name}</h3>
                        </div>
                      </div>
                      {pulperia.rating > 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                          <span className="font-bold">{pulperia.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mini Map */}
          <div className="px-4 py-3">
            <div className={`rounded-2xl overflow-hidden shadow-lg border border-stone-700 relative transition-all duration-300 ${
              isMapFullscreen ? 'h-[60vh]' : 'h-40'
            }`}>
              <button
                onClick={() => setIsMapFullscreen(!isMapFullscreen)}
                className="absolute top-2 right-2 z-[1000] bg-stone-800/90 hover:bg-stone-700 p-2 rounded-xl shadow-lg border border-stone-600 transition-all"
              >
                {isMapFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-red-400" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-red-400" />
                )}
              </button>

              <MapContainer
                center={userLocation}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                attributionControl={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker position={userLocation} />
                <MapResizer isExpanded={isMapFullscreen} />
                
                {pulperias.map((pulperia) => {
                  if (!pulperia.location) return null;
                  const isFeatured = featuredPulperias.some(f => f.pulperia_id === pulperia.pulperia_id);
                  return (
                    <Marker
                      key={pulperia.pulperia_id}
                      position={[pulperia.location.lat, pulperia.location.lng]}
                      icon={createPulperiaIcon(pulperia, isFeatured)}
                    >
                      <Popup>
                        <div className="p-1">
                          <div className="flex items-center gap-2 mb-2">
                            {pulperia.logo_url && (
                              <img src={pulperia.logo_url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                            )}
                            <div>
                              <h3 className="font-bold text-sm">{pulperia.name}</h3>
                              {pulperia.rating > 0 && (
                                <div className="flex items-center gap-1 text-xs text-amber-500">
                                  <Star className="w-3 h-3 fill-current" />
                                  {pulperia.rating.toFixed(1)}
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => navigate(`/pulperia/${pulperia.pulperia_id}`)}
                            className="w-full bg-red-600 text-white text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-red-700"
                          >
                            Ver Pulpería
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>
          
          {/* Unified Search Bar - Google Style */}
          <div className="px-4 py-3">
            <div className="relative">
              {/* Search Bar Container */}
              <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl shadow-xl border border-stone-700/50 overflow-hidden backdrop-blur-xl">
                {/* Toggle Button */}
                <div className="flex items-center justify-center py-2 px-4 border-b border-stone-700/50">
                  <button
                    onClick={toggleSearchMode}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      searchMode === 'products' 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                        : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    Productos
                  </button>
                  <div className="w-px h-6 bg-stone-700 mx-2" />
                  <button
                    onClick={toggleSearchMode}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      searchMode === 'pulperias' 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                        : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    Pulperías
                  </button>
                </div>
                
                {/* Search Input */}
                <div className="flex items-center px-4 py-3">
                  <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleProductSearch()}
                    placeholder={searchMode === 'products' 
                      ? "Buscar productos... ej: leche, pan, huevos" 
                      : "Buscar pulperías... ej: La Bodega"
                    }
                    className="flex-1 ml-3 text-white placeholder:text-stone-500 outline-none text-base bg-transparent"
                  />
                  {productSearch && (
                    <button 
                      onClick={clearProductSearch} 
                      className="p-1.5 hover:bg-stone-700/50 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-stone-400" />
                    </button>
                  )}
                  <button
                    onClick={handleProductSearch}
                    disabled={searchingProducts}
                    className="ml-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium px-5 py-2 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-red-500/20"
                  >
                    {searchingProducts ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Buscar'
                    )}
                  </button>
                </div>
              </div>
              
              {/* Results Dropdown - Products */}
              {showProductResults && searchMode === 'products' && productResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-stone-900 rounded-2xl shadow-2xl border border-stone-700/50 max-h-80 overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-stone-700/50 bg-stone-800/50">
                    <p className="text-stone-400 text-sm">{productResults.length} productos encontrados</p>
                  </div>
                  <div className="divide-y divide-stone-800">
                    {productResults.map((product) => (
                      <button
                        key={product.product_id}
                        onClick={() => {
                          navigate(`/pulperia/${product.pulperia_id}`);
                          clearProductSearch();
                        }}
                        className="w-full p-3 flex items-center gap-3 hover:bg-stone-800/50 transition-colors text-left"
                      >
                        {product.image_url ? (
                          <img src={product.image_url} alt="" className="w-12 h-12 rounded-lg object-cover bg-stone-800" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-stone-800 flex items-center justify-center">
                            <Package className="w-5 h-5 text-stone-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{product.name}</p>
                          <p className="text-sm text-stone-500 truncate">{product.pulperia_name || 'Pulpería'}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-400">L {product.price?.toFixed(0)}</p>
                          {product.available ? (
                            <span className="text-xs text-green-400">Disponible</span>
                          ) : (
                            <span className="text-xs text-stone-500">Agotado</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Results Dropdown - Pulperias */}
              {showProductResults && searchMode === 'pulperias' && productResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-stone-900 rounded-2xl shadow-2xl border border-stone-700/50 max-h-80 overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-stone-700/50 bg-stone-800/50">
                    <p className="text-stone-400 text-sm">{productResults.length} pulperías encontradas</p>
                  </div>
                  <div className="divide-y divide-stone-800">
                    {productResults.map((pulperia) => (
                      <button
                        key={pulperia.pulperia_id}
                        onClick={() => {
                          navigate(`/pulperia/${pulperia.pulperia_id}`);
                          clearProductSearch();
                        }}
                        className="w-full p-3 flex items-center gap-3 hover:bg-stone-800/50 transition-colors text-left"
                      >
                        {pulperia.logo_url ? (
                          <img src={pulperia.logo_url} alt="" className="w-12 h-12 rounded-lg object-cover bg-stone-800" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-red-600/20 flex items-center justify-center">
                            <Store className="w-5 h-5 text-red-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{pulperia.name}</p>
                          <p className="text-sm text-stone-500 truncate">{pulperia.address || 'Sin dirección'}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {pulperia.rating > 0 && (
                            <>
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-amber-400 text-sm font-medium">{pulperia.rating.toFixed(1)}</span>
                            </>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* No Results */}
              {showProductResults && productResults.length === 0 && !searchingProducts && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-stone-900 rounded-2xl shadow-2xl border border-stone-700/50 p-6 text-center z-50 animate-in slide-in-from-top-2 duration-200">
                  {searchMode === 'products' ? (
                    <Package className="w-10 h-10 mx-auto text-stone-600 mb-2" />
                  ) : (
                    <Store className="w-10 h-10 mx-auto text-stone-600 mb-2" />
                  )}
                  <p className="text-stone-400 text-sm">
                    {searchMode === 'products' ? 'No se encontraron productos' : 'No se encontraron pulperías'}
                  </p>
                  <p className="text-stone-600 text-xs mt-1">Intenta con otro término de búsqueda</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Pulperias List */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-bold mb-3 text-white flex items-center gap-2">
          {activeTab === 'favorites' ? (
            <>
              <Heart className="w-5 h-5 text-red-400" />
              Mis Favoritas
            </>
          ) : (
            <>
              <List className="w-5 h-5 text-red-400" />
              Pulperías Cercanas
            </>
          )}
        </h2>
        
        {displayPulperias.length === 0 ? (
          <div className="text-center py-10 bg-stone-900/50 rounded-2xl border border-stone-800">
            {activeTab === 'favorites' ? (
              <>
                <Heart className="w-12 h-12 text-stone-700 mx-auto mb-3" />
                <p className="text-stone-400">No tienes pulperías favoritas</p>
                <p className="text-stone-500 text-sm mt-1">Explora y guarda tus favoritas</p>
              </>
            ) : (
              <>
                <StoreIcon className="w-12 h-12 text-stone-700 mx-auto mb-3" />
                <p className="text-stone-400">No hay pulperías en este radio</p>
                <p className="text-stone-500 text-sm">Intenta ampliar el radio de búsqueda</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {displayPulperias.map((pulperia) => (
              <div
                key={pulperia.pulperia_id}
                data-testid={`pulperia-card-${pulperia.pulperia_id}`}
                onClick={() => navigate(`/pulperia/${pulperia.pulperia_id}`)}
                className="bg-stone-900/50 rounded-2xl p-4 cursor-pointer border border-stone-800 hover:border-red-500/50 transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {pulperia.logo_url ? (
                      <img
                        src={pulperia.logo_url}
                        alt={pulperia.name}
                        className="w-14 h-14 rounded-xl object-cover border-2 border-stone-700"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-stone-800">
                        <StoreIcon className="w-7 h-7 text-red-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate">{pulperia.name}</h3>
                    
                    {pulperia.rating > 0 && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-white">
                          {pulperia.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-stone-500">({pulperia.review_count})</span>
                      </div>
                    )}
                    
                    <p className="text-stone-500 text-sm flex items-center gap-1 mt-1 truncate">
                      <MapPin className="w-3 h-3 flex-shrink-0 text-red-400" /> 
                      <span className="truncate">{pulperia.address}</span>
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-stone-600 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav user={user} cartCount={cartCount} />
    </div>
  );
};

export default MapView;
