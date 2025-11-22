// Funcionalidad del modal de suscripción
function toggleSubscribeModal() {
    const modal = document.getElementById('subscribeModal');
    const messageDiv = document.getElementById('subscribeMessage');
    
    if (modal) {
        const isOpening = modal.style.display === 'none';
        modal.style.display = isOpening ? 'block' : 'none';
        
        // Si se está cerrando, ocultar y limpiar el mensaje
        if (!isOpening && messageDiv) {
            messageDiv.style.display = 'none';
            messageDiv.textContent = '';
            messageDiv.className = 'subscribe-message';
        }
    }
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('subscribeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Admin
function abrirAdmin() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function cerrarAdmin() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('adminPassword').value = '';
    }
}

async function verificarAdmin(event) {
    event.preventDefault();
    const password = document.getElementById('adminPassword').value;
    
    try {
        const response = await fetch('/api/admin/verificar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Establecer cookie de sesión admin
            document.cookie = 'adminSession=true; path=/; max-age=86400'; // 24 horas
            cerrarAdmin();
            // Recargar la página actual para activar los botones
            window.location.reload();
        } else {
            alert('Contraseña incorrecta');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al verificar contraseña');
    }
}

// Función para deslogearse del modo admin
function deslogearAdmin() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión de administrador?')) {
        // Eliminar cookie de sesión admin
        document.cookie = 'adminSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        // Recargar la página para actualizar la UI
        window.location.reload();
    }
}

// Verificar sesión admin al cargar cualquier página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar cookie de admin
    const adminSession = document.cookie.includes('adminSession=true');
    if (adminSession) {
        // Los botones de admin se mostrarán automáticamente si adminSession está en true
        // Esto se maneja en el servidor mediante EJS
    }
});

// Suscribirse al newsletter
async function suscribirse(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('#uni_subscribe_email').value;
    const name = form.querySelector('#subscribe_name').value;
    const bank_entity = form.querySelector('#subscribe_entity').value;
    const messageDiv = document.getElementById('subscribeMessage');
    
    // Ocultar mensaje anterior
    if (messageDiv) {
        messageDiv.style.display = 'none';
        messageDiv.className = 'subscribe-message';
    }
    
    const data = {
        name: name,
        email: email,
        bank_entity: bank_entity || null
    };
    
    try {
        const response = await fetch('/api/suscripciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Mostrar mensaje de éxito
            if (messageDiv) {
                messageDiv.textContent = '¡Te has suscrito correctamente al newsletter!';
                messageDiv.className = 'subscribe-message subscribe-message-success';
                messageDiv.style.display = 'block';
            }
            form.reset();
            // Cerrar modal después de 2 segundos
            setTimeout(() => {
                toggleSubscribeModal();
                if (messageDiv) {
                    messageDiv.style.display = 'none';
                }
            }, 2000);
        } else {
            // Mostrar mensaje de error
            if (messageDiv) {
                messageDiv.textContent = 'Error: ' + result.error;
                messageDiv.className = 'subscribe-message subscribe-message-error';
                messageDiv.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error al suscribirse:', error);
        // Mostrar mensaje de error
        if (messageDiv) {
            messageDiv.textContent = 'Error al procesar la suscripción. Por favor, intenta nuevamente.';
            messageDiv.className = 'subscribe-message subscribe-message-error';
            messageDiv.style.display = 'block';
        }
    }
}

// Funciones de búsqueda y filtrado (ya están en las páginas EJS, pero por si acaso)
function buscarFuncionalidades(event) {
    event.preventDefault();
    const search = document.getElementById('uni-search-bar__input').value;
    const currentPath = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    params.set('search', search);
    window.location.href = currentPath + '?' + params.toString();
}

function filtrarPorSeccion(seccion) {
    const currentPath = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    if (seccion) {
        params.set('section', seccion);
    } else {
        params.delete('section');
    }
    window.location.href = currentPath + '?' + params.toString();
}

function cambiarVista(vista) {
    const currentPath = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    params.set('view', vista);
    window.location.href = currentPath + '?' + params.toString();
}

// Auto-resize textarea en el buscador (si se usa textarea en lugar de input)
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('uni-search-bar__input');
    if (searchInput && searchInput.tagName === 'TEXTAREA') {
        searchInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 44) + 'px';
        });
    }
});

