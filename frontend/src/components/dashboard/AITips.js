// /app/frontend/src/components/dashboard/AITips.js
// Tips y recursos de IA para mejorar negocios

import { 
  Sparkles, Palette, MessageCircle, Camera, Share2, 
  TrendingUp, ExternalLink, Lightbulb, Bot, Wand2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const AI_RESOURCES = [
  {
    id: 'logo',
    title: 'Crea un Logo Profesional',
    description: 'Genera logos únicos para tu pulpería con IA',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-800/30',
    tools: [
      { name: 'DALL-E (ChatGPT)', url: 'https://chat.openai.com', tip: 'Escribe: "Crea un logo para una pulpería llamada [nombre], estilo moderno y amigable"' },
      { name: 'Canva IA', url: 'https://www.canva.com/create/logos/', tip: 'Usa el generador de logos con IA gratis' },
      { name: 'Ideogram', url: 'https://ideogram.ai', tip: 'Excelente para logos con texto' },
    ]
  },
  {
    id: 'advice',
    title: 'Consejos de Negocio',
    description: 'Pregunta a una IA cómo mejorar tus ventas',
    icon: MessageCircle,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-800/30',
    tools: [
      { name: 'Grok (X/Twitter)', url: 'https://x.com/i/grok', tip: 'Pregunta: "Dame 5 consejos para aumentar las ventas de mi pulpería"' },
      { name: 'ChatGPT', url: 'https://chat.openai.com', tip: 'Pregunta: "¿Cómo puedo atraer más clientes a mi tienda de barrio?"' },
      { name: 'Claude', url: 'https://claude.ai', tip: 'Ideal para estrategias de precios y promociones' },
    ]
  },
  {
    id: 'photos',
    title: 'Mejora tus Fotos',
    description: 'Tips para fotografiar productos que vendan',
    icon: Camera,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-900/20',
    borderColor: 'border-amber-800/30',
    tips: [
      '📸 Usa luz natural (cerca de una ventana)',
      '🧹 Fondo limpio y simple (pared blanca o tela)',
      '📐 Toma fotos desde varios ángulos',
      '✨ Limpia el producto antes de fotografiar',
      '📱 Usa el modo retrato de tu celular',
      '🎨 Edita brillo y contraste con Snapseed (gratis)',
    ]
  },
  {
    id: 'social',
    title: 'Promociona en Redes',
    description: 'Cómo usar Facebook e Instagram para tu negocio',
    icon: Share2,
    color: 'from-pink-500 to-red-500',
    bgColor: 'bg-pink-900/20',
    borderColor: 'border-pink-800/30',
    tips: [
      '📅 Publica 3-4 veces por semana',
      '🕐 Mejores horas: 12pm, 6pm, 9pm',
      '📍 Usa ubicación en cada post',
      '#️⃣ Hashtags: #PulperiaHN #TuColonia #Honduras',
      '🎥 Los videos cortos tienen más alcance',
      '💬 Responde todos los comentarios y mensajes',
      '🎁 Haz sorteos para ganar seguidores',
    ]
  },
  {
    id: 'pricing',
    title: 'Precios que Vendan',
    description: 'Estrategias de precios inteligentes',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-800/30',
    tips: [
      '💰 Precios terminados en 9 (L 49 en vez de L 50)',
      '📦 Ofertas por cantidad (3x2, docena más barata)',
      '🏷️ Combos de productos relacionados',
      '⭐ Un producto "gancho" a bajo precio',
      '📊 Compara precios con la competencia',
      '📈 Sube precios gradualmente, no de golpe',
      '🎯 Margen mínimo: 20-30% sobre costo',
    ]
  }
];

const AITips = ({ open, onOpenChange }) => {
  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-stone-950 border-stone-800 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            Tips con IA para tu Negocio
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-stone-400 mb-4">
          Usa estas herramientas gratuitas de Inteligencia Artificial para hacer crecer tu pulpería.
        </p>

        <div className="space-y-4">
          {AI_RESOURCES.map(resource => {
            const Icon = resource.icon;
            
            return (
              <div 
                key={resource.id}
                className={`${resource.bgColor} border ${resource.borderColor} rounded-xl overflow-hidden`}
              >
                {/* Header */}
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{resource.title}</h3>
                      <p className="text-xs text-stone-400">{resource.description}</p>
                    </div>
                  </div>

                  {/* Tools with links */}
                  {resource.tools && (
                    <div className="space-y-2 mt-3">
                      {resource.tools.map((tool, i) => (
                        <button
                          key={i}
                          onClick={() => openLink(tool.url)}
                          className="w-full text-left p-3 bg-stone-900/50 rounded-lg hover:bg-stone-800/50 transition-colors group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-medium text-sm">{tool.name}</span>
                            <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors" />
                          </div>
                          <p className="text-xs text-stone-500">{tool.tip}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Tips list */}
                  {resource.tips && (
                    <div className="mt-3 space-y-1.5">
                      {resource.tips.map((tip, i) => (
                        <p key={i} className="text-sm text-stone-300 flex items-start gap-2">
                          <span className="shrink-0">{tip.split(' ')[0]}</span>
                          <span>{tip.split(' ').slice(1).join(' ')}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="mt-4 p-3 bg-stone-900/50 rounded-lg border border-stone-800">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5" />
            <p className="text-xs text-stone-400">
              <span className="text-yellow-400 font-medium">Pro tip:</span> Todas estas herramientas tienen versiones gratuitas. 
              Empieza con una y ve agregando más conforme crezcas.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AITips;
