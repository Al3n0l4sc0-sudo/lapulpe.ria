# 🚀 La Pulpería - Configuración para lapulperiahn.shop

## ✅ SISTEMA ACTUALIZADO

Tu aplicación ahora está configurada para funcionar con el dominio **lapulperiahn.shop** 🎉

### 🎯 Sistema de Autenticación Dual

**1. Dominio de Producción: lapulperiahn.shop**
- Auth: **Google OAuth Propio** 🔐
- Client ID: `792440030382-6aqt3dqunub3hddt0n9plbkc0v4r7l59`
- Estado: ✅ Configurado y listo

**2. Preview/Development: galactic-lapulpe.preview.emergentagent.com**
- Auth: **Emergent OAuth** ⚡
- Estado: ✅ Funciona para testing

## 🔐 CONFIGURACIÓN EN GOOGLE CLOUD CONSOLE

### URLs a Agregar en Google Cloud Console

1. **Ir a:** https://console.cloud.google.com/
2. **APIs y servicios → Credenciales**
3. **Editar OAuth 2.0 Client ID:** `792440030382-6aqt3dqunub3hddt0n9plbkc0v4r7l59`

### URIs de redirección autorizados

Agregar **EXACTAMENTE** estas URLs:

```
https://lapulperiahn.shop/auth/callback
https://www.lapulperiahn.shop/auth/callback
https://job-market-hub-1.preview.emergentagent.com/auth/callback
```

### Orígenes JavaScript autorizados

Agregar **EXACTAMENTE** estas URLs:

```
https://lapulperiahn.shop
https://www.lapulperiahn.shop
https://job-market-hub-1.preview.emergentagent.com
```

⚠️ **IMPORTANTE:**
- Incluir `https://` al inicio
- NO agregar `/` al final en los orígenes JavaScript
- Copiar y pegar EXACTAMENTE como aparece
- Guardar y esperar 2-3 minutos

## 🌐 CONFIGURACIÓN DNS para lapulperiahn.shop

Para que tu dominio funcione correctamente:

### Opción 1: Registro A (Recomendado)

En tu proveedor DNS (GoDaddy, Namecheap, Cloudflare, etc):

```
Type: A
Name: @
Value: [IP del servidor - pregunta a soporte Emergent]
TTL: 3600

Type: A
Name: www
Value: [IP del servidor - pregunta a soporte Emergent]
TTL: 3600
```

### Opción 2: CNAME

```
Type: CNAME
Name: @
Value: galactic-lapulpe.preview.emergentagent.com
TTL: 3600

Type: CNAME
Name: www
Value: galactic-lapulpe.preview.emergentagent.com
TTL: 3600
```

**Nota:** Algunos proveedores no permiten CNAME en el root (@), usa registro A en ese caso.

## 🧪 PRUEBAS

### Probar AHORA (Preview Domain)

1. **Ir a:** https://job-market-hub-1.preview.emergentagent.com
2. **Verificar** que veas: "⚡ Emergent Auth" debajo del botón
3. **Click** en "Comenzar con Google"
4. ✅ **Debería funcionar** con Emergent OAuth

### Probar Después (Cuando configures DNS)

1. **Configurar DNS** apuntando a servidor
2. **Esperar propagación** (5-30 minutos)
3. **Ir a:** https://lapulperiahn.shop
4. **Verificar** que veas: "🔐 OAuth Propio" debajo del botón
5. **Click** en "Comenzar con Google"
6. ✅ **Funcionará** con tu Google OAuth propio

## 📋 Checklist de Configuración

### Para usar AHORA (Preview):
- [x] Código actualizado para lapulperiahn.shop
- [x] Backend configurado
- [x] Frontend compilado
- [ ] Agregar preview URL en Google Cloud Console
- [ ] Esperar 2-3 minutos
- [ ] Probar login

### Para producción (lapulperiahn.shop):
- [x] Código actualizado
- [x] Google OAuth configurado
- [ ] Agregar URLs en Google Cloud Console
- [ ] Configurar DNS
- [ ] Esperar propagación DNS
- [ ] Probar login en producción

## ✨ Características Implementadas

- ✅ **Detección automática de dominio**
- ✅ **Sistema dual de autenticación**
- ✅ **Estrellitas animadas** en todas las páginas
- ✅ **Animaciones tipo Grok**
- ✅ **3 pulperías** con 72 productos
- ✅ **Base de datos poblada**

## 🔍 Debugging

### Ver qué OAuth se está usando

Abre la consola del navegador (F12) y busca:

```
[Login] Domain: lapulperiahn.shop
[Login] Type: PRODUCTION (lapulperiahn.shop)
[Login] Auth: Google OAuth Propio
```

O para preview:

```
[Login] Domain: galactic-lapulpe.preview.emergentagent.com
[Login] Type: PREVIEW/DEV
[Login] Auth: Emergent OAuth
```

### Verificar backend

```bash
# Ver logs
tail -f /var/log/supervisor/backend.out.log

# Probar endpoint
curl "http://localhost:8001/api/auth/google/url?redirect_uri=https://lapulperiahn.shop/auth/callback"
```

## 📝 Configuración Actual

**Dominio de Producción:**
- lapulperiahn.shop
- www.lapulperiahn.shop

**Dominio de Testing:**
- galactic-lapulpe.preview.emergentagent.com

**Credenciales Google OAuth:**
- Client ID: `792440030382-6aqt3dqunub3hddt0n9plbkc0v4r7l59.apps.googleusercontent.com`
- Client Secret: `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`

**Backend configurado en:** `/app/backend/.env`

## ⚠️ Errores Comunes

### Error: "redirect_uri_mismatch"

**Causa:** La URL no está en Google Cloud Console

**Solución:**
1. Verificar que agregaste las URLs EXACTAS
2. Esperar 2-3 minutos después de guardar
3. Limpiar caché del navegador (Ctrl+Shift+R)

### Error: "domain_not_configured"

**Causa:** DNS no apunta al servidor

**Solución:**
1. Verificar configuración DNS
2. Esperar propagación (hasta 24 horas, usualmente 5-30 min)
3. Verificar con: `dig lapulperiahn.shop` o `nslookup lapulperiahn.shop`

### El login no funciona en preview

**Causa:** Preview URL no está en Google Cloud Console

**Solución:**
1. Agregar `https://job-market-hub-1.preview.emergentagent.com` a orígenes
2. Agregar `https://job-market-hub-1.preview.emergentagent.com/auth/callback` a redirects
3. Esperar 2-3 minutos

## 🎉 Próximos Pasos

1. ✅ **Código actualizado** - Ya está listo
2. 🔴 **Agregar URLs en Google Cloud Console** - HAZLO AHORA
3. 🟡 **Configurar DNS** - Cuando estés listo
4. 🟢 **Probar login** - Después de configurar

## 📞 Soporte

Si tienes problemas:

1. Verifica los logs del navegador (F12 → Console)
2. Verifica los logs del backend: `tail -f /var/log/supervisor/backend.out.log`
3. Asegúrate de esperar 2-3 minutos después de cambios en Google Cloud Console
4. Verifica que el DNS esté configurado correctamente

---

**Estado:** ✅ Código actualizado para lapulperiahn.shop
**Pendiente:** Configuración en Google Cloud Console + DNS
**Última actualización:** Enero 2, 2025
