# Deshabilitar Vercel Blob para Evitar Advanced Operations

Para evitar completamente que se ejecuten operaciones de Vercel Blob (`put()`, `copy()`, `list()`) y así no incrementar las **Advanced Operations**, puedes deshabilitar Blob de dos formas:

## Opción 1: Variable de Entorno (Recomendado)

Agrega esta variable de entorno en tu archivo `.env` o en las variables de entorno de Vercel:

```env
BLOB_DISABLED=true
```

## Opción 2: Eliminar el Token

Elimina o comenta la variable `BLOB_READ_WRITE_TOKEN` en tu archivo `.env` o en las variables de entorno de Vercel:

```env
# BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
```

## ¿Qué sucede cuando Blob está deshabilitado?

1. **No se cargarán las rutas de Blob** en `app.js` - evita cualquier inicialización
2. **No se ejecutará `put()`** - la ruta `/api/upload-image` retornará un error 503
3. **No se ejecutará `list()` ni `copy()`** - estas funciones nunca se llaman en el código actual
4. **Las Advanced Operations no se incrementarán** - porque ninguna operación se ejecuta

## Nota Importante

Si deshabilitas Blob:
- Las imágenes no se podrán subir desde el editor
- Las imágenes existentes seguirán funcionando (solo lectura)
- El campo de imagen en el editor mostrará un error al intentar subir

## Para Re-habilitar Blob

1. Elimina `BLOB_DISABLED=true` o establécelo a `false`
2. Asegúrate de que `BLOB_READ_WRITE_TOKEN` esté configurado correctamente
3. Reinicia el servidor

