// /app/frontend/src/components/jobs/ApplyForm.js
// Formulario para aplicar a un empleo

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Send, Upload, Store, MapPin, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const ApplyForm = ({ open, onOpenChange, job, user, onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    city: '',
    age: '',
    message: ''
  });
  const [cvFile, setCvFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const formatCurrency = (amount, currency) => {
    if (currency === 'USD') return `$${amount.toLocaleString()}`;
    return `L ${amount.toLocaleString()}`;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Solo se permiten archivos PDF o imágenes');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('El archivo es muy grande (máx. 10MB)');
      return;
    }

    setCvFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.city || !formData.age) {
      toast.error('Completa todos los campos requeridos');
      return;
    }

    onSubmit({
      ...formData,
      age: parseInt(formData.age),
      cvFile
    });
  };

  const resetForm = () => {
    setFormData({ city: '', age: '', message: '' });
    setCvFile(null);
  };

  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) resetForm(); }}>
      <DialogContent className="bg-stone-950 border-amber-900/50 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-amber-400 flex items-center gap-2">
            <Send className="w-5 h-5" />
            Aplicar al Empleo
          </DialogTitle>
        </DialogHeader>

        {/* Job info summary */}
        <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            {job.pulperia_logo ? (
              <img src={job.pulperia_logo} alt="" className="w-12 h-12 rounded-lg object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-amber-900/50 flex items-center justify-center">
                <Store className="w-6 h-6 text-amber-500" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white">{job.title}</h3>
              {job.pulperia_name && <p className="text-sm text-amber-400">{job.pulperia_name}</p>}
              <div className="flex items-center gap-3 mt-1 text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {job.location}
                </span>
                <span className="flex items-center gap-1 text-green-400">
                  <DollarSign className="w-3 h-3" /> {formatCurrency(job.pay_rate, job.pay_currency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pre-filled info */}
          <div className="bg-stone-900/50 rounded-lg p-3 text-sm">
            <p className="text-stone-400">Aplicando como:</p>
            <p className="text-white font-medium">{user?.name}</p>
            <p className="text-stone-500">{user?.email}</p>
          </div>

          {/* City */}
          <div>
            <Label className="text-stone-400">Ciudad donde vives *</Label>
            <Input
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Ej: Tegucigalpa"
              className="bg-stone-900 border-stone-700 text-white"
              required
            />
          </div>

          {/* Age */}
          <div>
            <Label className="text-stone-400">Tu edad *</Label>
            <Input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Ej: 25"
              className="bg-stone-900 border-stone-700 text-white"
              min="16"
              max="100"
              required
            />
          </div>

          {/* CV Upload */}
          <div>
            <Label className="text-stone-400">CV / Hoja de Vida (opcional)</Label>
            <div className="mt-1">
              <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-stone-700 rounded-xl cursor-pointer hover:border-amber-500/50 transition-colors">
                <Upload className="w-5 h-5 text-stone-500" />
                <span className="text-stone-400 text-sm">
                  {cvFile ? cvFile.name : 'Subir PDF o imagen'}
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                />
              </label>
              {cvFile && (
                <p className="text-xs text-green-400 mt-1">✓ Archivo seleccionado</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <Label className="text-stone-400">Mensaje (opcional)</Label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="¿Por qué eres ideal para este trabajo?"
              className="bg-stone-900 border-stone-700 text-white min-h-[80px]"
            />
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Aplicación'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyForm;
