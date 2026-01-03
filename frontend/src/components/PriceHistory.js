// /app/frontend/src/components/PriceHistory.js
// Componente para mostrar historial de precios de un producto

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, History, Calendar } from 'lucide-react';
import { api } from '../config/api';

const PriceHistory = ({ productId, currentPrice }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/api/products/${productId}/price-history`);
        setHistory(res.data);
      } catch (error) {
        console.error('Error fetching price history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchHistory();
    }
  }, [productId]);

  if (loading || history.length === 0) return null;

  const lastChange = history[0];
  const priceWentUp = lastChange.new_price > lastChange.old_price;
  const priceWentDown = lastChange.new_price < lastChange.old_price;
  const percentChange = Math.abs(((lastChange.new_price - lastChange.old_price) / lastChange.old_price) * 100).toFixed(0);

  return (
    <div className="mt-2">
      {/* Price change badge */}
      <button 
        onClick={() => setExpanded(!expanded)}
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
          priceWentDown 
            ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' 
            : priceWentUp 
              ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
              : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
        }`}
      >
        {priceWentDown ? (
          <>
            <TrendingDown className="w-3 h-3" />
            <span>Bajó {percentChange}%</span>
          </>
        ) : priceWentUp ? (
          <>
            <TrendingUp className="w-3 h-3" />
            <span>Subió {percentChange}%</span>
          </>
        ) : (
          <>
            <Minus className="w-3 h-3" />
            <span>Sin cambios</span>
          </>
        )}
      </button>

      {/* Previous price */}
      {(priceWentDown || priceWentUp) && (
        <span className="ml-2 text-xs text-stone-500 line-through">
          L {lastChange.old_price.toLocaleString()}
        </span>
      )}

      {/* Expanded history */}
      {expanded && history.length > 0 && (
        <div className="mt-2 p-3 bg-stone-900/50 rounded-lg border border-stone-800">
          <div className="flex items-center gap-2 mb-2 text-stone-400">
            <History className="w-4 h-4" />
            <span className="text-xs font-medium">Historial de Precios</span>
          </div>
          <div className="space-y-2">
            {history.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-stone-600" />
                  <span className="text-stone-500">
                    {new Date(item.changed_at).toLocaleDateString('es-HN')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-stone-500">L {item.old_price}</span>
                  <span className="text-stone-600">→</span>
                  <span className={item.new_price < item.old_price ? 'text-green-400' : 'text-red-400'}>
                    L {item.new_price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Badge simple para mostrar en tarjetas de producto
export const PriceBadge = ({ productId }) => {
  const [lastChange, setLastChange] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/api/products/${productId}/price-history`);
        if (res.data.length > 0) {
          const change = res.data[0];
          // Solo mostrar si el cambio fue en los últimos 7 días
          const changeDate = new Date(change.changed_at);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          if (changeDate > weekAgo) {
            setLastChange(change);
          }
        }
      } catch (error) {
        // Silenciar error
      }
    };

    if (productId) {
      fetchHistory();
    }
  }, [productId]);

  if (!lastChange) return null;

  const priceWentDown = lastChange.new_price < lastChange.old_price;

  if (!priceWentDown) return null;

  return (
    <span className="absolute top-2 left-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
      ↓ BAJÓ
    </span>
  );
};

export default PriceHistory;
