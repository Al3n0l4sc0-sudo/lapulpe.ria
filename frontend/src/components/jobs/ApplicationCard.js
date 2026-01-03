// /app/frontend/src/components/jobs/ApplicationCard.js
// Componente de tarjeta de aplicación

import { Store, MapPin, Calendar, ChevronDown, ChevronUp, FileText, User, Eye } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

const STATUS_CONFIG = {
  recibida: { label: 'Recibida', color: 'bg-blue-500', textColor: 'text-blue-400' },
  en_revision: { label: 'En Revisión', color: 'bg-amber-500', textColor: 'text-amber-400' },
  aceptada: { label: 'Aceptada', color: 'bg-green-500', textColor: 'text-green-400' },
  rechazada: { label: 'No Seleccionada', color: 'bg-red-500', textColor: 'text-red-400' }
};

// Para el solicitante - ver sus aplicaciones
export const MyApplicationCard = ({ application }) => {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[application.status] || STATUS_CONFIG.recibida;

  return (
    <div className="bg-stone-900/50 border border-stone-800 rounded-xl overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-stone-800/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-900/30 flex items-center justify-center">
            <Store className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-white truncate">{application.job_title}</h4>
            <p className="text-sm text-amber-400">{application.pulperia_name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${status.color} text-white`}>
              {status.label}
            </span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-stone-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone-500" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-stone-800 pt-3 space-y-3">
          <div className="flex items-center gap-2 text-sm text-stone-400">
            <Calendar className="w-4 h-4" />
            <span>Aplicado: {new Date(application.created_at).toLocaleDateString('es-HN')}</span>
          </div>
          
          {application.message && (
            <div className="bg-stone-800/50 rounded-lg p-3">
              <p className="text-xs text-stone-500 mb-1">Tu mensaje:</p>
              <p className="text-sm text-stone-300">{application.message}</p>
            </div>
          )}

          {application.status === 'rechazada' && application.rejection_reason && (
            <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3">
              <p className="text-xs text-red-400 mb-1">Motivo:</p>
              <p className="text-sm text-stone-300">{application.rejection_reason}</p>
            </div>
          )}

          {application.cv_url && (
            <a
              href={application.cv_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
            >
              <FileText className="w-4 h-4" />
              Ver CV enviado
            </a>
          )}
        </div>
      )}
    </div>
  );
};

// Para el empleador - gestionar aplicaciones
export const EmployerApplicationCard = ({ application, onUpdateStatus, onViewCV }) => {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[application.status] || STATUS_CONFIG.recibida;

  return (
    <div className="bg-stone-900/50 border border-stone-800 rounded-xl overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-stone-800/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center">
            <User className="w-5 h-5 text-stone-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-white">{application.applicant_name}</h4>
            <p className="text-sm text-stone-400">
              {application.applicant_city} • {application.applicant_age} años
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${status.color} text-white`}>
              {status.label}
            </span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-stone-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone-500" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-stone-800 pt-3 space-y-3">
          {/* Contact info */}
          <div className="text-sm text-stone-400">
            <p>Email: <span className="text-stone-300">{application.applicant_email}</span></p>
          </div>

          {/* Message */}
          {application.message && (
            <div className="bg-stone-800/50 rounded-lg p-3">
              <p className="text-xs text-stone-500 mb-1">Mensaje del aplicante:</p>
              <p className="text-sm text-stone-300">{application.message}</p>
            </div>
          )}

          {/* CV */}
          {application.cv_url && (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-blue-600 text-blue-400 hover:bg-blue-900/20"
              onClick={(e) => {
                e.stopPropagation();
                onViewCV(application.cv_url);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver CV / Hoja de Vida
            </Button>
          )}

          {/* Actions */}
          {application.status === 'recibida' && (
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateStatus(application.application_id, 'aceptada');
                }}
              >
                Aceptar
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-red-600 text-red-400 hover:bg-red-900/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateStatus(application.application_id, 'rechazada');
                }}
              >
                Rechazar
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyApplicationCard;
