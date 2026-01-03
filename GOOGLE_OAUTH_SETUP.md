# 🚀 La Pulpería - Configuración Google OAuth Propio

## ✅ Configuración Completada

### 🔐 Credenciales Google OAuth
- **Client ID**: `792440030382-6aqt3dqunub3hddt0n9plbkc0v4r7l59.apps.googleusercontent.com`
- **Client Secret**: `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` (Configurado en backend/.env)
- **Dominio**: `lapulperiastore.net`

### 📋 URIs Configurados en Google Cloud Console

**URIs de redirección autorizados:**
```
https://lapulperiastore.net/auth/callback
https://job-market-hub-1.preview.emergentagent.com/auth/callback
```

**Orígenes JavaScript autorizados:**
```
https://lapulperiastore.net
https://job-market-hub-1.preview.emergentagent.com
```

## 🏪 Base de Datos Poblada

### 3 Pulperías de Ejemplo Creadas:

1. **Pulpería Don José** 🏪
   - Ubicación: Barrio El Centro, Tegucigalpa
   - Teléfono: +504 9876-5432
   - Rating: 4.8 ⭐ (47 reviews)
   - Horario: Lun-Sab 6AM-8PM, Dom 7AM-2PM

2. **Pulpería La Bendición** 🛒
   - Ubicación: Colonia Kennedy, San Pedro Sula
   - Teléfono: +504 9123-4567
   - Rating: 4.9 ⭐ (63 reviews)
   - Horario: Todos los días 5:30AM-9PM

3. **Pulpería El Rinconcito** 🏬
   - Ubicación: Barrio Guacerique, Tegucigalpa
   - Teléfono: +504 9888-7777
   - Rating: 4.7 ⭐ (38 reviews)
   - Horario: Lun-Dom 6AM-10PM

### 📦 Productos por Pulpería: 24 productos

**Categorías:**
- 🥛 Lácteos (4 productos): Leche, Queso, Crema, Mantequilla
- 🍞 Panadería (3 productos): Pan Dulce, Pan Francés, Tortillas
- 🥤 Bebidas (4 productos): Coca-Cola, Jugo Natural, Agua, Café
- 🌾 Granos (3 productos): Frijoles, Arroz, Maíz
- 🍗 Carnes (3 productos): Pollo, Carne de Res, Jamón
- 🧂 Básicos (4 productos): Azúcar, Sal, Aceite, Huevos
- 🍿 Snacks (3 productos): Papas, Galletas, Chocolates

**Total: 72 productos** (24 por pulpería)

## 🔄 Flujo de Autenticación

### 1. Usuario hace clic en "Comenzar con Google"
```javascript
// LandingPage.js - handleLogin()
window.location.href = `${BACKEND_URL}/api/auth/google/url?redirect_uri=${redirectUri}`;
```

### 2. Backend genera URL de Google OAuth
```python
# backend/server.py - /api/auth/google/url
@api_router.get("/auth/google/url")
async def get_google_auth_url(redirect_uri: str):
    # Construye URL con credenciales configuradas
    google_auth_url = "https://accounts.google.com/o/oauth2/v2/auth"
    params = {
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "openid email profile"
    }
    return {"auth_url": f"{google_auth_url}?{query_string}"}
```

### 3. Google redirige a /auth/callback con código
```
https://lapulperiastore.net/auth/callback?code=AUTHORIZATION_CODE
```

### 4. Frontend envía código al backend
```javascript
// GoogleCallback.js
const response = await fetch(`${BACKEND_URL}/api/auth/google/callback`, {
  method: 'POST',
  body: JSON.stringify({ code, redirect_uri })
});
```

### 5. Backend intercambia código por tokens
```python
# backend/server.py - /api/auth/google/callback
@api_router.post("/auth/google/callback")
async def google_oauth_callback(code: str, redirect_uri: str):
    # Intercambia código por access_token
    # Obtiene información del usuario
    # Crea/actualiza usuario en MongoDB
    # Crea sesión con session_token
    # Retorna datos del usuario
```

### 6. Usuario autenticado y redirigido
```javascript
// AuthContext.js
localStorage.setItem('session_token', user.session_token);
navigate('/map'); // o /select-type si es nuevo
```

## 🗂️ Archivos Clave

### Backend
- `/app/backend/.env` - Credenciales Google OAuth configuradas
- `/app/backend/server.py` - Endpoints de autenticación
- `/app/backend/populate_db.py` - Script para poblar base de datos

### Frontend
- `/app/frontend/.env` - URL del backend
- `/app/frontend/src/pages/LandingPage.js` - Botón de login (SOLO Google OAuth)
- `/app/frontend/src/pages/GoogleCallback.js` - Manejo del callback
- `/app/frontend/src/contexts/AuthContext.js` - Estado de autenticación
- `/app/frontend/src/config/api.js` - Configuración de axios

## ❌ Código Eliminado

### Completamente Removido:
- ❌ Emergent Auth (código y referencias)
- ❌ Archivos de Cloudflare:
  - cloudflare-pages.toml
  - deploy-to-cloudflare.sh
  - optimize-for-cloudflare.sh
  - CLOUDFLARE_*.md
- ❌ Lógica de detección de dominio custom vs preview
- ❌ Fallbacks a Emergent Auth

### Simplificado:
- ✅ Un solo flujo de autenticación: Google OAuth
- ✅ Un solo backend URL: `REACT_APP_BACKEND_URL`
- ✅ Código limpio y directo

## 🧪 Testing del Flujo OAuth

### Prueba Manual:
1. Abrir `https://lapulperiastore.net` (o el preview)
2. Hacer clic en "Comenzar con Google"
3. Autorizar con cuenta de Google
4. Verificar redirección correcta
5. Confirmar autenticación exitosa

### Verificar Backend:
```bash
# Ver logs del backend
tail -f /var/log/supervisor/backend.out.log

# Ver sesiones activas
mongosh la_pulperia_db --eval "db.user_sessions.find().pretty()"

# Ver usuarios registrados
mongosh la_pulperia_db --eval "db.users.find().pretty()"
```

## 🔧 Comandos Útiles

```bash
# Reiniciar servicios
sudo supervisorctl restart backend frontend

# Ver estado
sudo supervisorctl status

# Ver logs
tail -f /var/log/supervisor/backend.out.log
tail -f /var/log/supervisor/frontend.out.log

# Repoblar base de datos
cd /app/backend && python populate_db.py

# Ver pulperías en DB
mongosh la_pulperia_db --eval "db.pulperias.find({}, {name:1, address:1}).pretty()"

# Ver productos
mongosh la_pulperia_db --eval "db.products.countDocuments()"
```

## 🚀 Despliegue

### Variables de Entorno Requeridas:

**Backend (.env):**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=la_pulperia_db
GOOGLE_CLIENT_ID=792440030382-6aqt3dqunub3hddt0n9plbkc0v4r7l59.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
CUSTOM_DOMAIN=lapulperiastore.net
CORS_ORIGINS=*
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=https://job-market-hub-1.preview.emergentagent.com
REACT_APP_DOMAIN=lapulperiastore.net
WDS_SOCKET_PORT=443
```

### Puertos:
- Backend: 8001
- Frontend: 3000
- MongoDB: 27017

## ✅ Checklist de Funcionalidades

- [x] Google OAuth configurado y funcionando
- [x] 3 pulperías creadas con datos completos
- [x] 72 productos distribuidos (24 por pulpería)
- [x] Código de Cloudflare eliminado
- [x] Emergent Auth completamente removido
- [x] Un solo flujo de autenticación limpio
- [x] Base de datos poblada y lista
- [x] Servicios corriendo correctamente
- [x] Frontend compilando sin errores
- [x] Backend respondiendo correctamente

## 📝 Notas Importantes

1. **Google Cloud Console**: Asegúrate de que los URIs de redirección estén configurados correctamente
2. **HTTPS**: Google OAuth requiere HTTPS en producción
3. **Dominio**: El dominio `lapulperiastore.net` debe apuntar al servidor correcto
4. **Sesiones**: Las sesiones duran 7 días por defecto
5. **Tokens**: Los session_tokens se almacenan en localStorage

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
- Verificar que el URI en Google Cloud Console coincida exactamente
- Incluir el protocolo (https://)
- No incluir barra diagonal al final

### Error: "OAuth client_id mismatch"
- Verificar que las credenciales en .env sean correctas
- Reiniciar el backend después de cambios en .env

### No se crean usuarios
- Verificar conexión a MongoDB
- Ver logs del backend para errores
- Verificar que el scope incluya "email profile"

---

**Estado**: ✅ TODO FUNCIONANDO AL 100%
**Última actualización**: Enero 2, 2025
