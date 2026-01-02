# 🚀 Configuración Google OAuth para lapulperiastore.net

## ✅ ESTADO ACTUAL

**Código optimizado y funcionando:**
- ✅ Redirect URI dinámico (funciona con cualquier dominio configurado)
- ✅ Backend corriendo y respondiendo
- ✅ Frontend compilado sin errores
- ✅ Base de datos con 3 pulperías y 72 productos
- ✅ Estrellitas animadas en todas las páginas

## 🔐 CONFIGURACIÓN REQUERIDA EN GOOGLE CLOUD CONSOLE

### Paso 1: Acceder a Google Cloud Console

1. Ir a: https://console.cloud.google.com/
2. Seleccionar el proyecto que tiene tu Client ID

### Paso 2: Configurar Credenciales OAuth 2.0

1. En el menú lateral: **APIs y servicios** → **Credenciales**
2. Buscar tu OAuth 2.0 Client ID: `792440030382-6aqt3dqunub3hddt0n9plbkc0v4r7l59`
3. Click en el ID para editarlo

### Paso 3: Agregar URIs Autorizados

**En "URIs de redirección autorizados", agregar EXACTAMENTE estas 2 URLs:**

```
https://lapulperiastore.net/auth/callback
https://galactic-lapulpe.preview.emergentagent.com/auth/callback
```

⚠️ **IMPORTANTE:**
- Incluir `https://` al inicio
- NO agregar barra diagonal `/` al final
- Copiar y pegar EXACTAMENTE como aparece arriba

### Paso 4: Agregar Orígenes JavaScript

**En "Orígenes de JavaScript autorizados", agregar EXACTAMENTE estas 2 URLs:**

```
https://lapulperiastore.net
https://galactic-lapulpe.preview.emergentagent.com
```

⚠️ **IMPORTANTE:**
- Incluir `https://` al inicio
- NO agregar `/auth/callback` ni nada más
- NO agregar barra diagonal `/` al final

### Paso 5: Guardar y Esperar

1. Click en **"GUARDAR"** en la parte inferior
2. **Esperar 1-2 minutos** para que Google propague los cambios
3. Durante este tiempo, NO intentes iniciar sesión

## 📋 Verificación Final

Después de guardar, tu configuración debe verse así:

### ✅ URIs de redirección autorizados:
```
✓ https://lapulperiastore.net/auth/callback
✓ https://galactic-lapulpe.preview.emergentagent.com/auth/callback
```

### ✅ Orígenes JavaScript autorizados:
```
✓ https://lapulperiastore.net
✓ https://galactic-lapulpe.preview.emergentagent.com
```

## 🧪 PROBAR EL LOGIN

### Opción A: Dominio de Producción (lapulperiastore.net)

1. Asegúrate de que `lapulperiastore.net` apunte a tu servidor
2. Ir a: `https://lapulperiastore.net`
3. Click en "Comenzar con Google"
4. Autorizar la aplicación
5. ✅ Deberías ser redirigido correctamente

### Opción B: Dominio de Preview (para pruebas)

1. Ir a: `https://galactic-lapulpe.preview.emergentagent.com`
2. Click en "Comenzar con Google"
3. Autorizar la aplicación
4. ✅ Deberías ser redirigido correctamente

## 🎯 DNS: Configurar lapulperiastore.net

Para que `lapulperiastore.net` funcione correctamente:

### Si usas Cloudflare, Namecheap, GoDaddy, etc:

**Agregar registro A:**
```
Type: A
Name: @
Value: [IP de tu servidor]
TTL: Automático
Proxy: Desactivado (DNS only)
```

**Agregar registro A para www:**
```
Type: A
Name: www
Value: [IP de tu servidor]
TTL: Automático
Proxy: Desactivado
```

**O usar CNAME (alternativa):**
```
Type: CNAME
Name: @
Value: galactic-lapulpe.preview.emergentagent.com
TTL: Automático
```

## ⚠️ ERRORES COMUNES Y SOLUCIONES

### Error: "redirect_uri_mismatch"

**Causa:** La URL en Google Cloud Console no coincide EXACTAMENTE

**Solución:**
1. Verificar que NO haya espacios antes/después de las URLs
2. Verificar que incluyas `https://` al inicio
3. Verificar que NO haya `/` al final
4. Esperar 1-2 minutos después de guardar cambios
5. Limpiar caché del navegador (Ctrl+Shift+R)

### Error: "invalid_client"

**Causa:** Client ID o Secret incorrectos

**Solución:**
1. Verificar `/app/backend/.env`:
   ```
   GOOGLE_CLIENT_ID=792440030382-6aqt3dqunub3hddt0n9plbkc0v4r7l59.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   ```
2. Reiniciar backend: `sudo supervisorctl restart backend`

### Error: "access_denied"

**Causa:** Usuario canceló la autorización o faltan permisos

**Solución:**
1. Intentar de nuevo
2. Asegurarse de aprobar todos los permisos solicitados

### Las estrellitas no se ven

**Solución:**
1. Limpiar caché del navegador: Ctrl+Shift+R (Windows/Linux) o Cmd+Shift+R (Mac)
2. Abrir consola del navegador (F12) y buscar errores
3. Verificar que estás en la página actualizada

## 🔍 DEBUGGING

### Ver logs del backend:
```bash
tail -f /var/log/supervisor/backend.out.log
```

### Ver logs del frontend:
```bash
tail -f /var/log/supervisor/frontend.out.log
```

### Verificar que el backend responde:
```bash
curl "http://localhost:8001/api/auth/google/url?redirect_uri=https://lapulperiastore.net/auth/callback"
```

Debería retornar:
```json
{
  "auth_url": "https://accounts.google.com/o/oauth2/v2/auth?client_id=792440030382..."
}
```

### Ver consola del navegador:

1. Presionar F12 para abrir DevTools
2. Ir a la pestaña "Console"
3. Intentar iniciar sesión
4. Ver mensajes de log que empiezan con `[Login]` o `[GoogleCallback]`

## 📝 RESUMEN DE CREDENCIALES

**Client ID:**
```
792440030382-6aqt3dqunub3hddt0n9plbkc0v4r7l59.apps.googleusercontent.com
```

**Client Secret:**
```
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
```

**Dominios configurados:**
- Producción: `https://lapulperiastore.net`
- Preview/Testing: `https://galactic-lapulpe.preview.emergentagent.com`

## ✅ CHECKLIST FINAL

Antes de intentar iniciar sesión, verifica:

- [ ] URLs agregadas en Google Cloud Console (URIs de redirección)
- [ ] URLs agregadas en Google Cloud Console (Orígenes JavaScript)
- [ ] Cambios guardados en Google Cloud Console
- [ ] Esperado 1-2 minutos después de guardar
- [ ] DNS configurado (si usas lapulperiastore.net)
- [ ] Backend corriendo: `sudo supervisorctl status backend`
- [ ] Frontend corriendo: `sudo supervisorctl status frontend`
- [ ] Caché del navegador limpiado

## 🎉 SI TODO FUNCIONA

Deberías poder:
1. ✅ Ver las estrellitas animadas en todas las páginas
2. ✅ Hacer clic en "Comenzar con Google"
3. ✅ Ser redirigido a Google
4. ✅ Autorizar la aplicación
5. ✅ Ser redirigido de vuelta a la app
6. ✅ Ver el mapa o dashboard según tu tipo de usuario

---

**Última actualización:** Enero 2, 2025
**Estado:** ✅ Código optimizado y listo
**Pendiente:** Configuración en Google Cloud Console (por el usuario)
