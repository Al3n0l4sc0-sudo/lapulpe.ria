// /app/frontend/src/components/dashboard/SalesReports.js
// Componente de reportes de ventas para pulperías

import { useState, useEffect } from 'react';
import { api } from '../../config/api';
import { toast } from 'sonner';
import { 
  TrendingUp, DollarSign, Package, Clock, Users, 
  ChevronRight, BarChart3, Calendar, ShoppingCart
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import GalacticLoader from '../GalacticLoader';

const SalesReports = ({ pulperiaId, open, onOpenChange }) => {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('week');
  const [reports, setReports] = useState(null);

  useEffect(() => {
    if (open && pulperiaId) {
      fetchReports();
    }
  }, [open, pulperiaId, period]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/pulperias/${pulperiaId}/reports?period=${period}`);
      setReports(res.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Error al cargar reportes');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => `L ${amount.toLocaleString()}`;

  const formatHour = (hour) => {
    if (hour === 0) return '12:00 AM';
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return '12:00 PM';
    return `${hour - 12}:00 PM`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-stone-950 border-stone-800 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-400" />
            Reportes de Ventas
          </DialogTitle>
        </DialogHeader>

        {/* Period selector */}
        <div className="flex gap-2 mb-4">
          {[
            { value: 'day', label: 'Hoy' },
            { value: 'week', label: '7 días' },
            { value: 'month', label: '30 días' }
          ].map(p => (
            <Button
              key={p.value}
              variant={period === p.value ? 'default' : 'outline'}
              size="sm"
              className={period === p.value 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'border-stone-700 text-stone-400 hover:bg-stone-800'
              }
              onClick={() => setPeriod(p.value)}
            >
              {p.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="py-8 flex justify-center">
            <GalacticLoader size="small" text="Cargando reportes..." />
          </div>
        ) : reports ? (
          <div className="space-y-4">
            {/* Main metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-900/20 border border-green-800/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingCart className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-stone-400">Ventas</span>
                </div>
                <p className="text-2xl font-bold text-green-400">{reports.total_sales}</p>
              </div>
              
              <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-stone-400">Ingresos</span>
                </div>
                <p className="text-2xl font-bold text-amber-400">{formatCurrency(reports.total_revenue)}</p>
              </div>
            </div>

            {/* Average order */}
            <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-stone-400">Promedio por orden</span>
                </div>
                <span className="text-xl font-bold text-white">{formatCurrency(reports.average_order)}</span>
              </div>
            </div>

            {/* Top products */}
            {reports.top_products?.length > 0 && (
              <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-medium">Productos Más Vendidos</span>
                </div>
                <div className="space-y-2">
                  {reports.top_products.map((product, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-stone-800 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-stone-300 text-sm">{product.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-medium">{product.quantity}</span>
                        <span className="text-stone-500 text-xs ml-1">vendidos</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Peak hours */}
            {reports.peak_hours?.length > 0 && (
              <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-white font-medium">Horas Pico</span>
                </div>
                <div className="flex gap-2">
                  {reports.peak_hours.map((item, i) => (
                    <div key={i} className="flex-1 bg-orange-900/20 border border-orange-800/30 rounded-lg p-2 text-center">
                      <p className="text-orange-400 font-bold">{formatHour(item.hour)}</p>
                      <p className="text-xs text-stone-500">{item.orders} pedidos</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Frequent customers */}
            {reports.frequent_customers?.length > 0 && (
              <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-medium">Clientes Frecuentes</span>
                </div>
                <div className="space-y-2">
                  {reports.frequent_customers.map((customer, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-stone-800 last:border-0">
                      <span className="text-stone-300 text-sm">{customer.name}</span>
                      <span className="text-cyan-400 text-sm">{customer.orders} pedidos</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No data message */}
            {reports.total_sales === 0 && (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-stone-700 mx-auto mb-3" />
                <p className="text-stone-500">No hay ventas en este período</p>
                <p className="text-stone-600 text-sm">Los datos aparecerán cuando completes pedidos</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-stone-500">
            Error al cargar los reportes
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SalesReports;
