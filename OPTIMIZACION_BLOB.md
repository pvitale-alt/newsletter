# Optimización de Vercel Blob - Advanced Operations

## 🔧 Cambios Implementados

### 1. **Lazy Loading de @vercel/blob**
- **Antes**: `const { put } = require('@vercel/blob');` se importaba al inicio del archivo
- **Ahora**: Se importa **solo dentro de la función** del endpoint `/api/upload-image`
- **Razón**: Evita que se ejecute código de inicialización al cargar el módulo

### 2. **Logging Mejorado**
- Se agregó logging detallado para monitorear cuándo se ejecuta `put()`
- Cada llamada registra:
  - Timestamp
  - Ruta y método HTTP
  - Nombre del archivo y tamaño
  - URL resultante

### 3. **Protección contra Duplicados**
- Flag `window.uploadingImage` para evitar subidas simultáneas
- Validación antes de ejecutar `put()`

## ⚠️ IMPORTANTE: Cuándo se Ejecutan Advanced Operations

Las **Advanced Operations** SOLO se ejecutan cuando:
- ✅ Se llama explícitamente a `POST /api/upload-image` desde el formulario de edición
- ✅ Se guarda una funcionalidad con una imagen nueva desde `/abm` o `/detalle/:slug` (modo edición)

Las **Advanced Operations** NO se ejecutan cuando:
- ❌ Se carga `/newsletter`
- ❌ Se carga `/catalogo`
- ❌ Se carga `/proximamente`
- ❌ Se carga `/detalle/:slug` (solo visualización)
- ❌ Se inicia el servidor
- ❌ Se renderiza cualquier página

## 🔍 Cómo Verificar

1. **Revisa los logs del servidor**: Busca `[BLOB]` para ver cuándo se ejecuta `put()`
2. **Revisa el panel de Vercel**: Ve a Storage → Blob → Usage para ver el contador
3. **Monitorea las rutas**: El middleware de logging registra cada acceso a rutas de blob

## 📝 Logs Esperados

Cuando se ejecuta una Advanced Operation, verás:
```
[BLOB ROUTE] Ruta accedida: POST /api/upload-image | IP: ::1
[BLOB] Iniciando upload de imagen - Advanced Operation #2024-01-15T10:30:00.000Z
[BLOB] Ruta: /api/upload-image | Método: POST
[BLOB] Subiendo archivo: alcance-1234567890-abc123.png Tamaño: 245678 bytes
[BLOB] ✅ Imagen subida exitosamente: https://...
```

## 🚨 Si Siguen Incrementando

Si las Advanced Operations siguen incrementando al cargar páginas como `/newsletter`:

1. **Revisa los logs**: Busca `[BLOB]` o `[BLOB ROUTE]` en los logs del servidor
2. **Verifica el panel de Vercel**: Puede que estés navegando en el panel de Blob (esto ejecuta `list()`)
3. **Revisa el código**: Busca cualquier otra llamada a `put()`, `copy()`, o `list()` de `@vercel/blob`
4. **Verifica el frontend**: Busca llamadas a `/api/upload-image` en el código JavaScript

## ✅ Verificación Final

Para confirmar que está optimizado:

1. Reinicia el servidor
2. Carga `/newsletter` varias veces
3. Carga `/catalogo` varias veces
4. **NO deberías ver logs de `[BLOB]`** en la consola
5. **NO debería incrementar** el contador de Advanced Operations en Vercel

Solo cuando:
- Entras a `/detalle/:slug` en modo edición
- Y guardas una funcionalidad con una imagen nueva
- **ENTONCES** deberías ver el log `[BLOB]` y el contador debería incrementar

