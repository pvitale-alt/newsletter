# Información sobre Vercel Blob - Advanced Operations

## 📊 Límites del Plan Gratuito (Hobby)

- **Storage**: 1 GB
- **Simple Operations**: 10,000/mes (lecturas de imágenes)
- **Advanced Operations**: 2,000/mes ⚠️
- **Data Transfer**: 10 GB/mes

## ⚠️ ¿Qué son Advanced Operations?

Las **Advanced Operations** se cuentan cuando usas:
- `put()` - Subir una imagen nueva
- `copy()` - Copiar una imagen existente
- `list()` - Listar imágenes (también se ejecuta cuando navegas en el panel de Vercel)

## 🔍 ¿Por qué siguen incrementando?

### Posibles causas:

1. **Guardar funcionalidades con imágenes nuevas**: Cada vez que guardas una funcionalidad con una imagen nueva, se ejecuta `put()` = +1 Advanced Operation

2. **Navegar en el panel de Vercel**: Cada vez que abres el navegador de archivos en el panel de Vercel, se ejecuta `list()` = +1 Advanced Operation

3. **Guardados duplicados**: Si guardas la misma funcionalidad múltiples veces, cada guardado sube la imagen nuevamente

4. **Reinicios del servidor**: NO deberían incrementar las operaciones (ya está optimizado)

## 💰 ¿Qué pasa si excedo el límite?

### Plan Hobby (Gratuito):
- **NO te cobrarán automáticamente**
- Las operaciones se **bloquearán** hasta el siguiente mes
- Tu aplicación seguirá funcionando, pero **no podrás subir nuevas imágenes** hasta que se reinicie el contador mensual

### Plan Pro (De pago):
- Si excedes el límite, se cobrará según el plan de pago
- Precio aproximado: $0.15 por cada 1,000 Advanced Operations adicionales

## ✅ Optimizaciones Implementadas

1. **Subida solo al guardar**: Las imágenes solo se suben cuando haces clic en "Guardar", no al seleccionarlas
2. **Protección contra duplicados**: El código evita subir la misma imagen múltiples veces
3. **Logging**: Cada subida se registra en los logs del servidor para monitoreo

## 📝 Cómo Monitorear

1. Ve a tu proyecto en Vercel
2. Navega a **Storage** → **Blob**
3. Revisa la sección **Usage** para ver:
   - Cuántas Advanced Operations has usado
   - Cuántas quedan disponibles
   - El historial de uso

## 🎯 Recomendaciones

1. **Evita navegar innecesariamente** en el panel de Blob de Vercel
2. **Reutiliza imágenes existentes** cuando sea posible (no subas la misma imagen varias veces)
3. **Monitorea el uso** regularmente para evitar llegar al límite
4. **Si necesitas más operaciones**, considera actualizar al plan Pro

## 🔧 Logging Implementado

Cada vez que se ejecuta `put()`, verás en los logs del servidor:
```
[BLOB] Iniciando upload de imagen - Advanced Operation #2024-01-15T10:30:00.000Z
[BLOB] Subiendo archivo: alcance-1234567890-abc123.png Tamaño: 245678 bytes
[BLOB] ✅ Imagen subida exitosamente: https://...
```

Esto te permite identificar cuándo y por qué se están ejecutando las operaciones.

