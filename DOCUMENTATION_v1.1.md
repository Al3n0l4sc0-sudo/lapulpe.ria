# 🏪 La Pulpería v1.1
## Documentación Completa de Funcionalidades

---

## 📱 DESCRIPCIÓN GENERAL

**La Pulpería** es una plataforma digital que conecta pulperías hondureñas con sus clientes locales. Permite a las tiendas de barrio tener presencia online, gestionar sus productos, recibir pedidos y contratar personal.

**Stack Tecnológico:**
- Frontend: React + Tailwind CSS + Shadcn UI + PWA
- Backend: FastAPI (Python)
- Base de Datos: MongoDB
- Autenticación: Google OAuth (Emergent Auth)
- Emails: Resend API

---

## 🆕 NOVEDADES v1.1

### Nuevas Funcionalidades:
1. **📊 Reportes de Ventas** - Dashboard con métricas de ventas, productos más vendidos, horas pico
2. **🤖 Tips con IA** - Guía para mejorar negocios con herramientas de IA (logos, consejos, fotos)
3. **🔗 Compartir Pulpería** - Botón para compartir en WhatsApp, Facebook, Twitter
4. **🖼️ Cambiar Foto de Perfil** - Los usuarios pueden subir su propia foto
5. **📴 Modo Offline (PWA)** - La app se puede instalar y funciona sin conexión
6. **📧 Notificaciones por Email** - Emails automáticos para pedidos y aplicaciones
7. **🗺️ Marcadores con Foto** - El mapa muestra las fotos de las pulperías como marcadores
8. **📈 Historial de Precios** - Ver si un producto subió o bajó de precio

---

## 🔐 SISTEMA DE AUTENTICACIÓN

### Login con Google
- Inicio de sesión único con cuenta de Google
- Sesiones persistentes (365 días)
- Sin necesidad de crear contraseña
- Soporte para dominio personalizado (lapulperiahn.shop)

### Tipos de Usuario
| Tipo | Descripción |
|------|-------------|
| **Cliente** | Puede buscar pulperías, ver productos, hacer pedidos y aplicar a empleos |
| **Pulpería** | Puede gestionar su tienda, productos, empleos y recibir aplicaciones |

### Cambio de Tipo de Cuenta
- Los usuarios pueden cambiar entre Cliente ↔ Pulpería en cualquier momento

---

## 🗺️ FUNCIONALIDADES PARA CLIENTES

### 1. Mapa de Pulperías
- Vista de mapa interactivo con pulperías cercanas
- Filtro por radio de distancia (1km - 20km)
- Marcadores diferenciados para pulperías destacadas
- Geolocalización automática

### 2. Búsqueda
- Búsqueda por nombre de pulpería
- Búsqueda por productos
- Búsqueda por dirección
- Búsqueda fuzzy (tolera errores de escritura)

### 3. Perfil de Pulpería
- Información completa de la tienda
- Catálogo de productos con precios
- Horarios de atención
- Teléfono y ubicación
- Reseñas y calificaciones
- Sistema de logros/badges

### 4. Carrito de Compras
- Agregar/quitar productos
- Modificar cantidades
- Ver total
- Persistencia en localStorage

### 5. Pedidos
- Crear pedidos para pickup o delivery
- Ver estado del pedido en tiempo real
- Historial de pedidos
- Notificaciones cuando el pedido está listo

### 6. Favoritos
- Guardar pulperías favoritas
- Acceso rápido desde el mapa

### 7. Reseñas
- Calificar pulperías (1-5 estrellas)
- Escribir comentarios
- Subir fotos con la reseña

---

## 🏬 FUNCIONALIDADES PARA PULPERÍAS

### 1. Dashboard Principal
- Vista general del negocio
- Pedidos pendientes
- Estadísticas básicas
- Acceso rápido a todas las funciones

### 2. Gestión de Tienda
- Crear/editar información de la pulpería
- Subir logo y banner
- Configurar horarios
- Agregar teléfono y dirección
- Tiendas "Solo Online" (sin dirección física)
- Personalizar colores y fuentes

### 3. Gestión de Productos
- Agregar productos con foto
- Editar precios y descripciones
- Marcar disponibilidad
- Gestionar stock
- Categorías de productos

### 4. Gestión de Pedidos
- Ver pedidos entrantes en tiempo real
- Aceptar/rechazar pedidos
- Marcar como "listo para recoger"
- Completar pedidos
- Historial de ventas

### 5. Sistema de Notificaciones
- Notificaciones push en navegador
- Sonido para nuevos pedidos
- Badge de pedidos pendientes

### 6. Cerrar Tienda
- Opción para cerrar la pulpería permanentemente
- Confirmación de seguridad (escribir nombre)
- Elimina todos los datos relacionados

---

## 💼 SISTEMA DE EMPLEOS (CHAMBA)

### Para Empleadores (Pulperías)

#### Publicar Empleo
- Título y descripción
- Categoría (Ventas, Construcción, Limpieza, etc.)
- Salario (Lempiras o Dólares)
- Ubicación
- Información de contacto
- Vincular a pulpería (opcional)

#### Gestionar Aplicaciones
- Ver todas las aplicaciones recibidas
- Ver CV/hoja de vida del aplicante
- Información del aplicante (ciudad, edad, email)
- Aceptar o rechazar aplicaciones
- Agregar motivo de rechazo

### Para Buscadores de Empleo

#### Buscar Empleos
- Lista de todos los empleos disponibles
- Filtrar por categoría
- Buscar por texto
- Ver detalles completos

#### Aplicar a Empleos
- Formulario de aplicación
- Subir CV (PDF o imagen, máx. 10MB)
- Agregar mensaje personalizado
- Indicar ciudad y edad

#### Mis Aplicaciones
- Ver estado de todas las aplicaciones
- Estados: Recibida, En Revisión, Aceptada, Rechazada
- Ver motivo de rechazo (si aplica)

---

## 🏆 SISTEMA DE LOGROS (MERITOCRACIA)

### Niveles de Logros

| Nivel | Logro | Requisito | Puntos |
|-------|-------|-----------|--------|
| 🟢 Principiante | Primera Venta | 1 venta | 10 |
| 🟢 Principiante | Catálogo Inicial | 5 productos | 10 |
| 🟡 Progreso | 10 Ventas | 10 ventas | 25 |
| 🟡 Progreso | Catálogo Completo | 15 productos | 25 |
| 🟡 Progreso | Ganando Visibilidad | 50 visitas | 20 |
| 🟠 Establecido | Clientes Felices | 10 reseñas 4+ ⭐ | 40 |
| 🟠 Establecido | Vendedor Activo | 50 ventas | 50 |
| 🟠 Establecido | Pulpería Popular | 200 visitas | 40 |
| 🔴 Experto | Vendedor Estrella | 100 ventas | 75 |
| 🔴 Experto | Super Catálogo | 30 productos | 50 |
| 🔴 Experto | Muy Popular | 500 visitas | 60 |
| ⭐ Legendario | Verificado | Admin verifica | 100 |
| ⭐ Legendario | Top Vendedor | 250 ventas | 150 |
| ⭐ Legendario | Leyenda Local | 1000 visitas + 50 reseñas | 200 |

---

## 📢 SISTEMA DE PUBLICIDAD

### Anuncios Destacados
- Las pulperías pueden pagar por aparecer destacadas
- Los anuncios aparecen en una página especial (/anuncios)
- Soporte para imágenes y videos
- Link personalizable

### Planes Disponibles
| Plan | Precio | Duración |
|------|--------|----------|
| Básico | L 100 | 7 días |
| Destacado | L 250 | 7 días |
| Premium | L 500 | 14 días |
| Recomendado | L 1,000 | 30 días |

### Panel de Administrador
- Activar/desactivar slots de publicidad
- Aprobar pagos
- Ver historial de asignaciones

---

## 🔔 NOTIFICACIONES

### Tipos de Notificaciones
- Nuevo pedido recibido
- Pedido aceptado
- Pedido listo para recoger
- Pedido completado
- Nueva aplicación de empleo
- Aplicación aceptada/rechazada

### Canales
- Notificaciones push del navegador
- Indicador visual en la app
- Sonido para eventos importantes

---

## 🎨 DISEÑO Y UI

### Tema Visual
- Tema oscuro con acentos rojos y amarillos
- Fondo animado con nebulosa y estrellas
- Mini nebulosa en barras de navegación
- Animaciones sutiles y fluidas

### Componentes Principales
- Header con notificaciones
- BottomNav con navegación principal
- GalacticLoader para estados de carga
- Modales con efecto glass
- Tarjetas con bordes sutiles

### Responsive
- Optimizado para móviles
- Funciona en tablets y desktop
- Interfaz adaptativa

---

## ⚙️ PANEL DE ADMINISTRADOR

### Funciones del Admin
- Ver todas las pulperías
- Eliminar pulperías
- Gestionar anuncios
- Activar slots de publicidad
- Ver logs de asignaciones
- Verificar negocios

### Acceso
- Solo el email configurado como ADMIN_EMAIL tiene acceso
- Badge "Admin" visible en el perfil

---

## 📁 ESTRUCTURA DEL CÓDIGO (v1.0)

### Backend (/app/backend/)
```
├── server.py          # API principal (refactorizada)
├── config/
│   ├── database.py    # Configuración de MongoDB
│   └── achievements.py # Definiciones de logros
├── models/
│   ├── __init__.py
│   └── schemas.py     # Modelos Pydantic
└── requirements.txt
```

### Frontend (/app/frontend/src/)
```
├── components/
│   ├── jobs/          # Componentes de empleos (refactorizados)
│   │   ├── JobCard.js
│   │   ├── JobForm.js
│   │   ├── ApplyForm.js
│   │   └── ApplicationCard.js
│   ├── ui/            # Componentes Shadcn
│   ├── Header.js
│   ├── BottomNav.js
│   ├── MiniNebula.js
│   ├── GalacticLoader.js
│   ├── AnimatedBackground.js
│   └── ProtectedRoute.js
├── pages/
│   ├── LandingPage.js
│   ├── MapView.js
│   ├── JobsServices.js
│   ├── PulperiaDashboard.js
│   ├── PulperiaProfile.js
│   ├── UserProfile.js
│   └── ...más páginas
├── contexts/
│   ├── AuthContext.js
│   └── NotificationContext.js
└── config/
    └── api.js
```

---

## 🔒 SEGURIDAD

- Autenticación mediante tokens JWT
- Sesiones almacenadas en MongoDB
- Cookies HttpOnly y Secure
- Validación de permisos en cada endpoint
- Solo dueños pueden editar sus pulperías
- Solo admin puede acceder al panel administrativo

---

## 📊 BASE DE DATOS

### Colecciones MongoDB
| Colección | Descripción |
|-----------|-------------|
| `users` | Usuarios registrados |
| `user_sessions` | Sesiones activas |
| `pulperias` | Tiendas registradas |
| `products` | Productos de las tiendas |
| `orders` | Pedidos realizados |
| `reviews` | Reseñas de clientes |
| `jobs` | Ofertas de empleo |
| `job_applications` | Aplicaciones a empleos |
| `featured_ads` | Anuncios destacados |
| `featured_ad_slots` | Slots de publicidad |
| `pulperia_achievements` | Logros desbloqueados |
| `pulperia_stats` | Estadísticas de tiendas |
| `announcements` | Anuncios del sistema |

---

## 🚀 LÍMITES Y CAPACIDADES

- **Subida de imágenes:** Máximo 15MB por archivo
- **Subida de CV:** Máximo 10MB (PDF o imagen)
- **Sesiones:** Válidas por 365 días
- **Usuarios concurrentes:** Escalable según recursos del servidor

---

## 📱 URLs PRINCIPALES

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page |
| `/map` | Mapa de pulperías |
| `/search` | Búsqueda |
| `/jobs` | Sección de empleos (Chamba) |
| `/cart` | Carrito de compras |
| `/profile` | Perfil del usuario |
| `/dashboard` | Dashboard de pulpería |
| `/anuncios` | Anuncios destacados |
| `/admin` | Panel de administrador |
| `/pulperia/:id` | Perfil de una pulpería |

---

## ✨ VERSIÓN 1.0 - CHANGELOG

### Incluye:
- ✅ Sistema completo de autenticación
- ✅ Mapa interactivo con geolocalización
- ✅ Gestión de pulperías y productos
- ✅ Sistema de pedidos en tiempo real
- ✅ Sistema de empleos (Chamba) completo
- ✅ Sistema de logros (Meritocracia)
- ✅ Sistema de publicidad
- ✅ Panel de administrador
- ✅ Notificaciones push
- ✅ Tema visual galáctico
- ✅ Código refactorizado y modular

---

**Desarrollado con ❤️ para las pulperías de Honduras**

© 2024 La Pulpería - Conectando comunidades hondureñas
