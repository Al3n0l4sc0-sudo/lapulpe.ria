# 🔧 CONFIGURACIÓN URGENTE - Google Cloud Console

## ⚠️ ACCIÓN REQUERIDA

Para que el login con Google funcione, debes agregar esta URL EXACTA en Google Cloud Console:

### 📍 Redirect URI a Agregar

```
https://galactic-lapulpe.preview.emergentagent.com/auth/callback
```

## 🛠️ Pasos para Configurar en Google Cloud Console

1. **Ir a Google Cloud Console**
   - https://console.cloud.google.com/

2. **Seleccionar tu proyecto**
   - Buscar el proyecto con Client ID: `792440030382...`

3. **Ir a "Credenciales"**
   - APIs y servicios → Credenciales
   - Encontrar tu OAuth 2.0 Client ID

4. **Editar el Cliente OAuth**
   - Click en el client ID `792440030382-6aqt3dqunub3hddt0n9plbkc0v4r7l59.apps.googleusercontent.com`

5. **Agregar URIs de redirección autorizados:**

   **COPIAR Y PEGAR ESTAS URLS EXACTAS:**
   ```
   https://galactic-lapulpe.preview.emergentagent.com/auth/callback
   https://lapulperiastore.net/auth/callback
   ```

6. **Agregar Orígenes JavaScript autorizados:**

   **COPIAR Y PEGAR ESTAS URLS EXACTAS:**
   ```
   https://galactic-lapulpe.preview.emergentagent.com
   https://lapulperiastore.net
   ```

7. **Guardar cambios**
   - Click en "GUARDAR"
   - Esperar 1-2 minutos para que se propague

## ✅ Verificar Configuración

Después de agregar las URLs, verifica que estén así:

### URIs de redirección autorizados:
```
✅ https://galactic-lapulpe.preview.emergentagent.com/auth/callback
✅ https://lapulperiastore.net/auth/callback
```

### Orígenes JavaScript autorizados:
```
✅ https://galactic-lapulpe.preview.emergentagent.com
✅ https://lapulperiastore.net
```

## 🧪 Probar Login

1. Ir a: https://galactic-lapulpe.preview.emergentagent.com
2. Click en "Comenzar con Google"
3. Autorizar la aplicación
4. Deberías ser redirigido correctamente

## 🎯 Si aún no funciona

### Error: "redirect_uri_mismatch"
- **Causa**: La URL en Google Cloud Console no coincide EXACTAMENTE
- **Solución**: Verificar que no haya espacios, barras adicionales, o errores de escritura
- **Importante**: Debe incluir `https://` al inicio

### Error: "invalid_client"
- **Causa**: Client ID o Secret incorrectos
- **Solución**: Verificar que las credenciales en `/app/backend/.env` sean correctas

### Error: "access_denied"
- **Causa**: Usuario canceló la autorización
- **Solución**: Intentar de nuevo y aprobar todos los permisos

## 📝 Credenciales Actuales

**Backend (.env):**
```
GOOGLE_CLIENT_ID=792440030382-6aqt3dqunub3hddt0n9plbkc0v4r7l59.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

**Redirect URI en código:**
```
https://galactic-lapulpe.preview.emergentagent.com/auth/callback
```

## 🌟 Estrellitas Animadas

✅ Las estrellitas están implementadas y funcionando
- Componente: `/app/frontend/src/components/StarryBackground.js`
- 100 estrellas con animación de parpadeo
- Efecto parallax con el mouse
- Visible en TODAS las páginas

Si no las ves, limpia el caché del navegador (Ctrl+Shift+R)

## 📞 Soporte

Si después de seguir estos pasos aún tienes problemas:

1. Verifica los logs del backend:
   ```bash
   tail -f /var/log/supervisor/backend.out.log
   ```

2. Verifica en la consola del navegador (F12)

3. Asegúrate de esperar 1-2 minutos después de guardar en Google Cloud Console

---

**Última actualización**: Enero 2, 2025
**Estado**: ✅ Código actualizado - Requiere configuración en Google Cloud Console
