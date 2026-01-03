// /app/frontend/src/components/jobs/JobForm.js
// Formulario para crear/editar empleos

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Briefcase } from 'lucide-react';

const CATEGORIES = ['Ventas', 'Construcción', 'Limpieza', 'Cocina', 'Seguridad', 'Atención al Cliente', 'Delivery', 'Otro'];

const JobForm = ({ open, onOpenChange, onSubmit, pulperias = [], isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    pay_rate: '',
    pay_currency: 'HNL',
    location: '',
    contact: '',
    pulperia_id: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      pay_rate: parseFloat(formData.pay_rate)
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      pay_rate: '',
      pay_currency: 'HNL',
      location: '',
      contact: '',
      pulperia_id: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) resetForm(); }}>
      <DialogContent className="bg-stone-950 border-amber-900/50 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-amber-400 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Publicar Empleo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pulpería selection */}
          {pulperias.length > 0 && (
            <div>
              <Label className="text-stone-400">Tu Pulpería</Label>
              <select
                value={formData.pulperia_id}
                onChange={(e) => setFormData({ ...formData, pulperia_id: e.target.value })}
                className="w-full mt-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              >
                <option value="">Publicar como persona</option>
                {pulperias.map(p => (
                  <option key={p.pulperia_id} value={p.pulperia_id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Title */}
          <div>
            <Label className="text-stone-400">Título del empleo *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej: Vendedor de mostrador"
              className="bg-stone-900 border-stone-700 text-white"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label className="text-stone-400">Categoría *</Label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full mt-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:border-amber-500"
              required
            >
              <option value="">Seleccionar...</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <Label className="text-stone-400">Descripción *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe las responsabilidades, requisitos y beneficios..."
              className="bg-stone-900 border-stone-700 text-white min-h-[100px]"
              required
            />
          </div>

          {/* Pay */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-stone-400">Salario *</Label>
              <Input
                type="number"
                value={formData.pay_rate}
                onChange={(e) => setFormData({ ...formData, pay_rate: e.target.value })}
                placeholder="Monto"
                className="bg-stone-900 border-stone-700 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-stone-400">Moneda</Label>
              <select
                value={formData.pay_currency}
                onChange={(e) => setFormData({ ...formData, pay_currency: e.target.value })}
                className="w-full mt-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="HNL">Lempiras (L)</option>
                <option value="USD">Dólares ($)</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <Label className="text-stone-400">Ubicación *</Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ej: Tegucigalpa, Comayagüela"
              className="bg-stone-900 border-stone-700 text-white"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <Label className="text-stone-400">Contacto *</Label>
            <Input
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="Teléfono o WhatsApp"
              className="bg-stone-900 border-stone-700 text-white"
              required
            />
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publicando...' : 'Publicar Empleo'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobForm;
