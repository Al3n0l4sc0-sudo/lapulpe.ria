// /app/frontend/src/components/SharePulperia.js
// Componente para compartir pulpería en redes sociales

import { Share2, MessageCircle, Facebook, Twitter, Link2, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

const SharePulperia = ({ pulperia, open, onOpenChange }) => {
  const [copied, setCopied] = useState(false);

  if (!pulperia) return null;

  const shareUrl = `${window.location.origin}/pulperia/${pulperia.pulperia_id}`;
  const shareText = `🏪 ¡Visita ${pulperia.name} en La Pulpería!\n\n${pulperia.description || 'Tu pulpería de confianza'}\n\n`;
  const shareTextEncoded = encodeURIComponent(shareText);
  const urlEncoded = encodeURIComponent(shareUrl);

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      url: `https://wa.me/?text=${shareTextEncoded}${urlEncoded}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}&quote=${shareTextEncoded}`
    },
    {
      name: 'Twitter / X',
      icon: Twitter,
      color: 'bg-stone-700 hover:bg-stone-600',
      url: `https://twitter.com/intent/tweet?text=${shareTextEncoded}&url=${urlEncoded}`
    }
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('¡Enlace copiado!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Error al copiar');
    }
  };

  const handleShare = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  // Native share if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pulperia.name,
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-stone-950 border-stone-800 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-red-400" />
            Compartir Pulpería
          </DialogTitle>
        </DialogHeader>

        {/* Preview card */}
        <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            {pulperia.logo_url ? (
              <img 
                src={pulperia.logo_url} 
                alt={pulperia.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: pulperia.background_color || '#DC2626' }}
              >
                <span className="text-white text-xl">🏪</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate">{pulperia.name}</h3>
              <p className="text-xs text-stone-500 truncate">{pulperia.address || 'Tienda Online'}</p>
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="space-y-2">
          {/* Native share button (mobile) */}
          {navigator.share && (
            <Button
              onClick={handleNativeShare}
              className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          )}

          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-2">
            {shareOptions.map(option => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.name}
                  onClick={() => handleShare(option.url)}
                  className={`${option.color} text-white`}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              );
            })}
          </div>

          {/* Copy link */}
          <Button
            onClick={copyLink}
            variant="outline"
            className="w-full border-stone-700 text-stone-300 hover:bg-stone-800"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-400" />
                ¡Copiado!
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4 mr-2" />
                Copiar Enlace
              </>
            )}
          </Button>
        </div>

        {/* URL preview */}
        <div className="mt-3 p-2 bg-stone-900 rounded-lg">
          <p className="text-xs text-stone-500 truncate font-mono">{shareUrl}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePulperia;
