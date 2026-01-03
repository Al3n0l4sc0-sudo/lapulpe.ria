// /app/frontend/src/components/jobs/JobCard.js
// Componente de tarjeta de empleo

import { MapPin, DollarSign, Building2, Clock, Store } from 'lucide-react';
import { Button } from '../ui/button';

const JobCard = ({ job, onApply, onViewDetails, isOwner = false }) => {
  const formatCurrency = (amount, currency) => {
    if (currency === 'USD') {
      return `$${amount.toLocaleString()}`;
    }
    return `L ${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-stone-900/50 border border-amber-900/30 rounded-xl p-4 hover:border-amber-500/40 transition-all">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {job.pulperia_logo ? (
          <img 
            src={job.pulperia_logo} 
            alt={job.pulperia_name}
            className="w-12 h-12 rounded-lg object-cover border border-amber-500/30"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-amber-900/30 flex items-center justify-center">
            <Store className="w-6 h-6 text-amber-500" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white truncate">{job.title}</h3>
          {job.pulperia_name && (
            <p className="text-sm text-amber-400">{job.pulperia_name}</p>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-stone-400">
          <MapPin className="w-4 h-4 text-amber-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-stone-400">
          <DollarSign className="w-4 h-4 text-green-500" />
          <span className="text-green-400 font-semibold">
            {formatCurrency(job.pay_rate, job.pay_currency)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-stone-400">
          <Clock className="w-4 h-4 text-stone-500" />
          <span>{new Date(job.created_at).toLocaleDateString('es-HN')}</span>
        </div>
      </div>

      {/* Description preview */}
      <p className="text-sm text-stone-400 mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Category badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-400 rounded-full">
          {job.category}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-stone-700 text-stone-300 hover:bg-stone-800"
          onClick={() => onViewDetails(job)}
        >
          Ver Detalles
        </Button>
        {!isOwner && (
          <Button
            size="sm"
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => onApply(job)}
          >
            Aplicar
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
