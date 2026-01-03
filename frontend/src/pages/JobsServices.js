import { useState, useEffect } from 'react';
import { api, BACKEND_URL } from '../config/api';
import { toast } from 'sonner';
import { 
  Briefcase, Search, Plus, MapPin, DollarSign, Trash2, Users, Wrench, Send, 
  FileText, Phone, Eye, X, Check, Sparkles, Building2, Clock, ChevronRight, Store
} from 'lucide-react';
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';


const CATEGORIES = {
  jobs: ['Ventas', 'Construcción', 'Limpieza', 'Cocina', 'Seguridad', 'Atención al Cliente', 'Delivery', 'Otro'],
  services: ['Jardinería', 'Limpieza', 'Plomería', 'Electricidad', 'Paseo de mascotas', 'Reparaciones', 'Otro']
};

const JobsServices = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [showApplicationsDialog, setShowApplicationsDialog] = useState(false);
  const [showJobDetailDialog, setShowJobDetailDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('jobs');
  
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    category: '',
    pay_rate: '',
    pay_currency: 'HNL',
    location: '',
    contact: ''
  });
  
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    category: '',
    hourly_rate: '',
    rate_currency: 'HNL',
    location: '',
    contact: '',
    images: []
  });

  const [applyForm, setApplyForm] = useState({
    contact: '',
    cv_url: '',
    message: ''
  });
  
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, jobsRes, servicesRes] = await Promise.all([
        api.get(`/api/auth/me`),
        api.get(`/api/jobs`),
        api.get(`/api/services`)
      ]);
      
      setUser(userRes.data);
      setJobs(jobsRes.data);
      setServices(servicesRes.data);
      
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    
    try {
      await api.post(`/api/jobs`,
        {
          ...jobForm,
          pay_rate: parseFloat(jobForm.pay_rate)
        },
        { withCredentials: true }
      );
      
      toast.success('¡Oferta de empleo publicada!');
      setShowJobDialog(false);
      setJobForm({
        title: '',
        description: '',
        category: '',
        pay_rate: '',
        pay_currency: 'HNL',
        location: '',
        contact: ''
      });
      await fetchData();
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Error al publicar empleo');
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    
    try {
      await api.post(`/api/services`,
        {
          ...serviceForm,
          hourly_rate: parseFloat(serviceForm.hourly_rate)
        },
        { withCredentials: true }
      );
      
      toast.success('¡Servicio publicado!');
      setShowServiceDialog(false);
      setServiceForm({
        title: '',
        description: '',
        category: '',
        hourly_rate: '',
        rate_currency: 'HNL',
        location: '',
        contact: '',
        images: []
      });
      await fetchData();
    } catch (error) {
      console.error('Error creating service:', error);
      toast.error('Error al publicar servicio');
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    if (files.length === 0) return;

    setUploadingImages(true);
    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} supera 5MB`);
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    try {
      const images = await Promise.all(imagePromises);
      const validImages = images.filter(img => img !== null);
      setServiceForm({ ...serviceForm, images: validImages });
      toast.success(`${validImages.length} imagen(es) cargada(s)`);
    } catch (error) {
      toast.error('Error al cargar imágenes');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleCVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('El archivo no debe superar 10MB');
      return;
    }

    setUploadingCV(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setApplyForm({ ...applyForm, cv_url: reader.result });
        setUploadingCV(false);
        toast.success('CV cargado exitosamente');
      };
      reader.onerror = () => {
        toast.error('Error al cargar CV');
        setUploadingCV(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Error al procesar archivo');
      setUploadingCV(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await api.delete(`/api/jobs/${jobId}`);
      toast.success('Oferta eliminada');
      await fetchData();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Error al eliminar');
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await api.delete(`/api/services/${serviceId}`);
      toast.success('Servicio eliminado');
      await fetchData();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Error al eliminar');
    }
  };

  const handleApplyToJob = async (e) => {
    e.preventDefault();
    
    if (!selectedJob) return;
    
    try {
      await api.post(`/api/jobs/${selectedJob.job_id}/apply`,
        applyForm,
        { withCredentials: true }
      );
      
      toast.success('¡Aplicación enviada exitosamente!');
      setShowApplyDialog(false);
      setSelectedJob(null);
      setApplyForm({ contact: '', cv_url: '', message: '' });
    } catch (error) {
      console.error('Error applying to job:', error);
      const msg = error.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Error al aplicar');
    }
  };

  const handleViewApplications = async (job) => {
    setSelectedJob(job);
    try {
      const response = await api.get(`/api/jobs/${job.job_id}/applications`,
        { withCredentials: true }
      );
      setApplications(response.data);
      setShowApplicationsDialog(true);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Error al cargar aplicaciones');
    }
  };

  const handleViewJobDetail = (job) => {
    setSelectedJob(job);
    setShowJobDetailDialog(true);
  };

  const filterJobs = () => {
    let filtered = jobs;
    if (selectedCategory) {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const filterServices = () => {
    let filtered = services;
    if (selectedCategory) {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950">
        <AnimatedBackground color="yellow" />
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-amber-400/30 rounded-full animate-spin border-t-amber-500 mx-auto"></div>
          <p className="mt-4 text-stone-500 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 pb-24">
      <AnimatedBackground color="yellow" />
      
      {/* Header with yellow theme */}
      <Header 
        user={user} 
        title="Chamba" 
        subtitle="Empleos y Servicios"
      />
      
      {/* Search Section */}
      <div className="relative z-10 px-4 py-4">
        {/* Disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-4">
          <p className="text-amber-400/70 text-xs">
            <span className="text-amber-400 font-medium">Aviso:</span> Las ofertas son publicadas por pulperías locales y particulares. Verifica antes de aplicar.
          </p>
        </div>

        {/* Tabs - Yellow Theme */}
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => {
              setActiveTab('jobs');
              setSelectedCategory('');
            }}
            className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'jobs' 
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-900/30' 
                : 'bg-stone-800/50 text-stone-400 hover:text-amber-400 border border-stone-700'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Empleos</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'jobs' ? 'bg-white/20' : 'bg-amber-500/20 text-amber-400'}`}>
              {jobs.length}
            </span>
          </button>
          <button 
            onClick={() => {
              setActiveTab('services');
              setSelectedCategory('');
            }}
            className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'services' 
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-900/30' 
                : 'bg-stone-800/50 text-stone-400 hover:text-amber-400 border border-stone-700'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Servicios</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'services' ? 'bg-white/20' : 'bg-amber-500/20 text-amber-400'}`}>
              {services.length}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
          <input
            type="text"
            placeholder={activeTab === 'jobs' ? "Buscar empleos, ubicación..." : "Buscar servicios..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-800/50 border border-stone-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
          />
        </div>

        {/* Categories - Yellow Theme */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
              selectedCategory === '' 
                ? 'bg-amber-500 text-white' 
                : 'bg-stone-800 text-stone-400 border border-stone-700 hover:border-amber-500/50'
            }`}
          >
            Todos
          </button>
          {(activeTab === 'jobs' ? CATEGORIES.jobs : CATEGORIES.services).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                selectedCategory === cat 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-stone-800 text-stone-400 border border-stone-700 hover:border-amber-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Button - Yellow Theme */}
        <button
          onClick={() => activeTab === 'jobs' ? setShowJobDialog(true) : setShowServiceDialog(true)}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 mb-6"
        >
          <Plus className="w-5 h-5" />
          {activeTab === 'jobs' ? 'Publicar Empleo' : 'Ofrecer Servicio'}
        </button>

        {/* Jobs List - Redesigned */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {filterJobs().length === 0 ? (
              <div className="text-center py-12 bg-stone-900/50 rounded-2xl border border-stone-800">
                <Briefcase className="w-12 h-12 mx-auto text-stone-700 mb-3" />
                <p className="text-stone-500">No hay empleos disponibles</p>
                <p className="text-stone-600 text-sm mt-1">¡Sé el primero en publicar!</p>
              </div>
            ) : (
              filterJobs().map(job => (
                <div 
                  key={job.job_id} 
                  className="bg-stone-900/50 backdrop-blur-sm rounded-2xl border border-stone-800 overflow-hidden hover:border-amber-500/50 transition-all group"
                >
                  {/* Job Header with Pulperia Info */}
                  <div className="p-4 border-b border-stone-800/50">
                    <div className="flex items-start gap-3">
                      {/* Pulperia Logo */}
                      {job.pulperia_logo ? (
                        <img 
                          src={job.pulperia_logo} 
                          alt={job.pulperia_name}
                          className="w-12 h-12 rounded-xl object-cover border border-stone-700"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center">
                          <Store className="w-6 h-6 text-white" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-lg truncate">{job.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-amber-400 text-sm font-medium">{job.pulperia_name || job.employer_name}</span>
                          <span className="text-stone-600">•</span>
                          <span className="text-stone-500 text-sm">{job.category}</span>
                        </div>
                      </div>
                      
                      {/* Delete Button (if owner) */}
                      {user && job.employer_user_id === user.user_id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteJob(job.job_id);
                          }}
                          className="p-2 text-stone-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Job Details */}
                  <div className="p-4">
                    <p className="text-stone-400 text-sm line-clamp-2 mb-4">{job.description}</p>
                    
                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Pay Rate */}
                      <div className="bg-stone-800/50 rounded-xl p-3 border border-stone-700/50">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-bold">
                            {job.pay_currency === 'HNL' ? 'L' : '$'}{job.pay_rate}
                          </span>
                        </div>
                        <p className="text-stone-500 text-xs mt-1">por hora</p>
                      </div>
                      
                      {/* Location - Address where job is offered */}
                      <div className="bg-stone-800/50 rounded-xl p-3 border border-stone-700/50">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-400" />
                          <span className="text-white text-sm truncate">{job.location || 'No especificada'}</span>
                        </div>
                        <p className="text-stone-500 text-xs mt-1">ubicación</p>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewJobDetail(job)}
                        className="flex-1 bg-stone-800 hover:bg-stone-700 text-white py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-stone-700"
                      >
                        <Eye className="w-4 h-4" />
                        Ver más
                      </button>
                      
                      {user && job.employer_user_id === user.user_id ? (
                        <button
                          onClick={() => handleViewApplications(job)}
                          className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                        >
                          <Users className="w-4 h-4" />
                          Ver Aplicantes
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setShowApplyDialog(true);
                          }}
                          className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Aplicar
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Time Posted */}
                  <div className="px-4 pb-3">
                    <p className="text-stone-600 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Publicado: {new Date(job.created_at).toLocaleDateString('es-HN')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Services List - Redesigned */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            {filterServices().length === 0 ? (
              <div className="text-center py-12 bg-stone-900/50 rounded-2xl border border-stone-800">
                <Wrench className="w-12 h-12 mx-auto text-stone-700 mb-3" />
                <p className="text-stone-500">No hay servicios disponibles</p>
                <p className="text-stone-600 text-sm mt-1">¡Ofrece tu servicio!</p>
              </div>
            ) : (
              filterServices().map(service => (
                <div key={service.service_id} className="bg-stone-900/50 backdrop-blur-sm rounded-2xl border border-stone-800 overflow-hidden hover:border-amber-500/50 transition-all">
                  {/* Service Images */}
                  {service.images && service.images.length > 0 && (
                    <div className="flex overflow-x-auto gap-2 p-2 bg-stone-800/30">
                      {service.images.map((img, idx) => (
                        <img 
                          key={idx} 
                          src={img} 
                          alt="" 
                          className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg">{service.title}</h3>
                        <p className="text-amber-400 text-sm font-medium mt-1">{service.provider_name}</p>
                      </div>
                      
                      {user && service.provider_user_id === user.user_id && (
                        <button
                          onClick={() => handleDeleteService(service.service_id)}
                          className="p-2 text-stone-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    
                    <p className="text-stone-400 text-sm mt-3 line-clamp-2">{service.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs bg-amber-900/50 text-amber-400 px-3 py-1.5 rounded-full font-bold border border-amber-700/50">
                        {service.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs bg-green-900/50 text-green-400 px-3 py-1.5 rounded-full font-bold border border-green-700/50">
                        <DollarSign className="w-3 h-3" />
                        {service.hourly_rate} {service.rate_currency}/hr
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs bg-stone-800 text-stone-400 px-3 py-1.5 rounded-full border border-stone-700">
                        <MapPin className="w-3 h-3" />
                        {service.location}
                      </span>
                    </div>
                    
                    <a
                      href={`tel:${service.contact}`}
                      className="mt-4 w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-amber-500 hover:to-amber-400 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Contactar: {service.contact}
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Create Job Dialog - Yellow Theme */}
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="max-w-md bg-stone-900 border-stone-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-500 rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              Publicar Empleo
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateJob} className="space-y-4">
            <div>
              <Label className="text-white">Título del puesto *</Label>
              <Input
                required
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                placeholder="Ej: Cajero/a, Vendedor/a..."
                className="bg-stone-800 border-stone-700 text-white placeholder:text-stone-500"
              />
            </div>
            
            <div>
              <Label className="text-white">Categoría *</Label>
              <select
                required
                value={jobForm.category}
                onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="">Seleccionar...</option>
                {CATEGORIES.jobs.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label className="text-white">Descripción *</Label>
              <Textarea
                required
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                placeholder="Describe el trabajo, requisitos, horarios..."
                className="bg-stone-800 border-stone-700 text-white placeholder:text-stone-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white">Pago por hora *</Label>
                <Input
                  required
                  type="number"
                  value={jobForm.pay_rate}
                  onChange={(e) => setJobForm({ ...jobForm, pay_rate: e.target.value })}
                  className="bg-stone-800 border-stone-700 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Moneda</Label>
                <select
                  value={jobForm.pay_currency}
                  onChange={(e) => setJobForm({ ...jobForm, pay_currency: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                >
                  <option value="HNL">Lempiras (L)</option>
                  <option value="USD">Dólares ($)</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label className="text-white">Dirección del trabajo *</Label>
              <Input
                required
                value={jobForm.location}
                onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                placeholder="Dirección exacta donde se ofrecerá el empleo"
                className="bg-stone-800 border-stone-700 text-white placeholder:text-stone-500"
              />
              <p className="text-stone-500 text-xs mt-1">Esta dirección aparecerá públicamente en la oferta</p>
            </div>
            
            <div>
              <Label className="text-white">Contacto *</Label>
              <Input
                required
                value={jobForm.contact}
                onChange={(e) => setJobForm({ ...jobForm, contact: e.target.value })}
                placeholder="Teléfono o email de contacto"
                className="bg-stone-800 border-stone-700 text-white placeholder:text-stone-500"
              />
            </div>
            
            <Button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-lg shadow-amber-900/30">
              <Check className="w-4 h-4 mr-2" />
              Publicar Empleo
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Job Detail Dialog */}
      <Dialog open={showJobDetailDialog} onOpenChange={setShowJobDetailDialog}>
        <DialogContent className="max-w-md bg-stone-900 border-stone-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-500 rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              Detalles del Empleo
            </DialogTitle>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-4">
              {/* Pulperia Info */}
              <div className="flex items-center gap-3 p-3 bg-stone-800/50 rounded-xl border border-stone-700">
                {selectedJob.pulperia_logo ? (
                  <img 
                    src={selectedJob.pulperia_logo} 
                    alt={selectedJob.pulperia_name}
                    className="w-12 h-12 rounded-xl object-cover border border-stone-700"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center">
                    <Store className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <p className="text-white font-bold">{selectedJob.pulperia_name || selectedJob.employer_name}</p>
                  <p className="text-stone-500 text-sm">{selectedJob.category}</p>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-white">{selectedJob.title}</h3>
              
              {/* Description */}
              <div>
                <p className="text-stone-500 text-xs mb-1">Descripción:</p>
                <p className="text-stone-300">{selectedJob.description}</p>
              </div>
              
              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-900/30 rounded-xl p-3 border border-green-700/50">
                  <p className="text-stone-500 text-xs mb-1">Pago por hora</p>
                  <p className="text-green-400 font-bold text-lg">
                    {selectedJob.pay_currency === 'HNL' ? 'L' : '$'}{selectedJob.pay_rate}
                  </p>
                </div>
                <div className="bg-amber-900/30 rounded-xl p-3 border border-amber-700/50">
                  <p className="text-stone-500 text-xs mb-1">Ubicación</p>
                  <p className="text-amber-400 font-medium text-sm">{selectedJob.location || 'No especificada'}</p>
                </div>
              </div>
              
              {/* Contact */}
              <div className="bg-stone-800/50 rounded-xl p-3 border border-stone-700">
                <p className="text-stone-500 text-xs mb-1">Contacto</p>
                <p className="text-white font-medium">{selectedJob.contact}</p>
              </div>
              
              {/* Apply Button */}
              {user && selectedJob.employer_user_id !== user.user_id && (
                <Button 
                  onClick={() => {
                    setShowJobDetailDialog(false);
                    setShowApplyDialog(true);
                  }}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Aplicar a este empleo
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Service Dialog - Yellow Theme */}
      <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
        <DialogContent className="max-w-md bg-stone-900 border-stone-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-500 rounded-xl flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              Ofrecer Servicio
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateService} className="space-y-4">
            <div>
              <Label className="text-white">Título del servicio *</Label>
              <Input
                required
                value={serviceForm.title}
                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                placeholder="Ej: Corte de césped profesional"
                className="bg-stone-800 border-stone-700 text-white placeholder:text-stone-500"
              />
            </div>
            
            <div>
              <Label className="text-white">Categoría *</Label>
              <select
                required
                value={serviceForm.category}
                onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="">Seleccionar...</option>
                {CATEGORIES.services.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label className="text-white">Descripción *</Label>
              <Textarea
                required
                value={serviceForm.description}
                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                placeholder="Describe tu servicio..."
                className="bg-stone-800 border-stone-700 text-white placeholder:text-stone-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white">Precio por hora *</Label>
                <Input
                  required
                  type="number"
                  value={serviceForm.hourly_rate}
                  onChange={(e) => setServiceForm({ ...serviceForm, hourly_rate: e.target.value })}
                  className="bg-stone-800 border-stone-700 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Moneda</Label>
                <select
                  value={serviceForm.rate_currency}
                  onChange={(e) => setServiceForm({ ...serviceForm, rate_currency: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                >
                  <option value="HNL">Lempiras (L)</option>
                  <option value="USD">Dólares ($)</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label className="text-white">Ubicación *</Label>
              <Input
                required
                value={serviceForm.location}
                onChange={(e) => setServiceForm({ ...serviceForm, location: e.target.value })}
                placeholder="Ciudad o zona donde ofreces el servicio"
                className="bg-stone-800 border-stone-700 text-white placeholder:text-stone-500"
              />
            </div>
            
            <div>
              <Label className="text-white">Contacto *</Label>
              <Input
                required
                value={serviceForm.contact}
                onChange={(e) => setServiceForm({ ...serviceForm, contact: e.target.value })}
                placeholder="Teléfono o email"
                className="bg-stone-800 border-stone-700 text-white placeholder:text-stone-500"
              />
            </div>
            
            <div>
              <Label className="text-white">Fotos de tu trabajo (máx. 5)</Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={uploadingImages}
                className="cursor-pointer bg-stone-800 border-stone-700 text-white"
              />
              {serviceForm.images.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {serviceForm.images.map((img, idx) => (
                    <img key={idx} src={img} alt="" className="w-16 h-16 object-cover rounded-lg border border-stone-700" />
                  ))}
                </div>
              )}
            </div>
            
            <Button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-lg shadow-amber-900/30" disabled={uploadingImages}>
              <Check className="w-4 h-4 mr-2" />
              Publicar Servicio
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Apply to Job Dialog - Yellow Theme */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-md bg-stone-900 border-stone-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              Aplicar a: {selectedJob?.title}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleApplyToJob} className="space-y-4">
            <div>
              <Label className="text-white">Tu contacto (teléfono o email) *</Label>
              <Input
                required
                value={applyForm.contact}
                onChange={(e) => setApplyForm({ ...applyForm, contact: e.target.value })}
                placeholder="+504 9999-9999 o email@ejemplo.com"
                className="bg-stone-800 border-stone-700 text-white placeholder:text-stone-500"
              />
            </div>
            
            <div>
              <Label className="text-white">Subir CV/Hoja de Vida (opcional)</Label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                onChange={handleCVUpload}
                disabled={uploadingCV}
                className="cursor-pointer bg-stone-800 border-stone-700 text-white"
              />
              {applyForm.cv_url && (
                <p className="text-sm text-emerald-400 mt-1 flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  CV cargado ✓
                </p>
              )}
              {uploadingCV && <p className="text-sm text-stone-500 mt-1">Cargando...</p>}
            </div>
            
            <div>
              <Label className="text-white">Mensaje para el empleador</Label>
              <Textarea
                value={applyForm.message}
                onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                placeholder="Preséntate brevemente..."
                rows={4}
                className="bg-stone-800 border-stone-700 text-white placeholder:text-stone-500"
              />
            </div>
            
            <Button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-lg shadow-amber-900/30" disabled={uploadingCV}>
              <Send className="w-4 h-4 mr-2" />
              Enviar Aplicación
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Applications Dialog */}
      <Dialog open={showApplicationsDialog} onOpenChange={setShowApplicationsDialog}>
        <DialogContent className="max-w-lg bg-stone-900 border-stone-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5 text-amber-400" />
              Aplicaciones: {selectedJob?.title}
            </DialogTitle>
          </DialogHeader>
          
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto text-stone-600 mb-3" />
              <p className="text-stone-500">Aún no hay aplicaciones</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {applications.map(app => (
                <div key={app.application_id} className="bg-stone-800/50 rounded-xl p-4 border border-stone-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-white">{app.applicant_name}</p>
                      <p className="text-sm text-stone-400 flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3" />
                        {app.contact}
                      </p>
                    </div>
                    <span className="text-xs text-stone-500">
                      {new Date(app.created_at).toLocaleDateString('es-HN')}
                    </span>
                  </div>
                  
                  {app.message && (
                    <p className="text-sm text-stone-400 mt-3 bg-stone-900/50 rounded-lg p-3 border border-stone-700">
                      &quot;{app.message}&quot;
                    </p>
                  )}
                  
                  {app.cv_url && (
                    <a 
                      href={app.cv_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-sm text-amber-400 hover:text-amber-300"
                    >
                      <FileText className="w-4 h-4" />
                      Ver CV
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav user={user} cartCount={cartCount} />
    </div>
  );
};

export default JobsServices;
