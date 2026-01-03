// /app/frontend/src/components/profile/ProfilePictureEditor.js
// Componente para cambiar la imagen de perfil

import { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { api, BACKEND_URL } from '../../config/api';
import { toast } from 'sonner';

const ProfilePictureEditor = ({ user, onUpdate, open, onOpenChange }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      toast.error('Solo se permiten imágenes');
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen es muy grande (máx. 5MB)');
      return;
    }

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview) return;

    setUploading(true);
    try {
      // Primero subir la imagen
      const formData = new FormData();
      formData.append('file', fileInputRef.current.files[0]);

      const uploadRes = await api.post('/api/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const imageUrl = uploadRes.data.url;

      // Luego actualizar el perfil
      const profileRes = await api.put('/api/auth/profile-picture', {
        picture_url: imageUrl
      });

      toast.success('¡Foto de perfil actualizada!');
      onUpdate(profileRes.data);
      onOpenChange(false);
      setPreview(null);
    } catch (error) {
      console.error('Error uploading:', error);
      toast.error('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-stone-950 border-stone-800 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-red-400" />
            Cambiar Foto de Perfil
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-stone-700 bg-stone-900">
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : user?.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-600">
                    <Camera className="w-12 h-12" />
                  </div>
                )}
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-yellow-500/20 blur-xl -z-10" />
            </div>
          </div>

          {/* Upload button */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full border-stone-700 text-stone-300 hover:bg-stone-800"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Seleccionar Imagen
            </Button>
          </div>

          {/* Actions */}
          {preview && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-stone-700 text-stone-400"
                onClick={handleCancel}
                disabled={uploading}
              >
                <X className="w-4 h-4 mr-1" />
                Cancelar
              </Button>
              <Button
                type="button"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Guardar
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Tips */}
          <p className="text-xs text-stone-500 text-center">
            Formatos: JPG, PNG, WebP • Máximo 5MB
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureEditor;
