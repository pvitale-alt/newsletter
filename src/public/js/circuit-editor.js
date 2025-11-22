// Modo Editor para Circuito Integral
let editMode = false;
let selectedElement = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let editingElement = null;

// Iconos Material Icons disponibles (lista completa reutilizada de detalle.ejs)
const materialIcons = [
    // Finanzas y Dinero
    'account_balance', 'attach_money', 'monetization_on', 'payment', 'account_balance_wallet', 
    'savings', 'trending_up', 'trending_down', 'show_chart', 'multiline_chart', 'bar_chart',
    'pie_chart', 'insert_chart', 'assessment', 'analytics', 'receipt', 'receipt_long',
    'credit_card', 'card_membership', 'account_circle', 'wallet', 'currency_exchange',
    'payments', 'price_check', 'price_change', 'calculate', 'point_of_sale',
    'account_tree', 'local_atm', 'account_box', 'credit_score',
    
    // Tecnología y Sistemas
    'computer', 'laptop', 'devices', 'phone_android', 'tablet', 'memory', 'storage',
    'cloud', 'cloud_upload', 'cloud_download', 'cloud_sync', 'data_usage', 'dns',
    'router', 'wifi', 'signal_cellular_alt', 'network_check', 'settings', 'settings_applications',
    'tune', 'build', 'code', 'terminal', 'bug_report', 'security', 'lock', 'vpn_key',
    'admin_panel_settings', 'verified_user', 'shield', 'key',
    'developer_mode', 'integration_instructions', 'api', 'code_off', 'data_object',
    'web', 'web_asset', 'web_stories',
    
    // Servidores y Infraestructura
    'hub', 'database', 'cloud_queue', 'cloud_done', 'cloud_off', 'backup', 'restore', 'sync',
    'hardware',
    
    // API y Conectividad
    'link', 'link_off', 'share', 'share_location', 'public', 'language', 'swap_horiz', 'swap_vert',
    'sync_alt', 'cached', 'refresh', 'autorenew', 'swap_calls', 'call_merge', 'call_split',
    'call_made', 'call_received', 'connected_tv',
    
    // Mercado de Capitales y Trading
    'trending_flat', 'candlestick_chart', 'line_axis', 'scatter_plot', 'bubble_chart', 'area_chart',
    'timeline', 'insights', 'query_stats', 'schema', 'corporate_fare', 'business', 'domain',
    'apartment', 'store', 'storefront', 'business_center',
    
    // Desarrollo y Programación
    'developer_mode',
    
    // Documentos y Archivos
    'description', 'article', 'text_snippet', 'note', 'note_add', 'note_alt',
    'file_copy', 'file_download', 'file_upload', 'file_present', 'folder',
    'folder_open', 'folder_shared', 'insert_drive_file',
    'picture_as_pdf', 'image', 'image_search', 'collections', 'library_books',
    'menu_book', 'book', 'bookmark', 'bookmark_add', 'bookmark_border',
    
    // General y UI
    'dashboard', 'home', 'star', 'favorite', 'menu', 'more_vert',
    'search', 'filter_list', 'sort', 'view_list', 'view_module', 'grid_view',
    'list', 'table_chart', 'today', 'event', 'calendar_today', 'schedule',
    'notifications', 'notifications_active', 'email', 'mail', 'send', 'inbox',
    'person', 'group', 'people', 'person_add', 'help', 'info', 'question_answer',
    'print', 'download', 'upload', 'get_app', 'save', 'check_circle', 'check',
    'cancel', 'close', 'delete', 'edit', 'add', 'remove', 'update',
    'zoom_in', 'zoom_out', 'fullscreen', 'open_in_new', 'launch',
    'verified', 'badge'
];

// Activar modo editor
function enableEditMode() {
    console.log('Activando modo editor...');
    editMode = true;
    document.body.classList.add('circuit-edit-mode');
    
    // Agregar controles de edición
    addEditControls();
    
    // Función para inicializar elementos
    const initElements = () => {
        const elements = document.querySelectorAll('.circuit-element');
        console.log(`Encontrados ${elements.length} elementos para editar`);
        
        if (elements.length === 0) {
            console.warn('No se encontraron elementos. Reintentando...');
            setTimeout(initElements, 200);
            return;
        }
        
        // Hacer elementos arrastrables y editables
        makeElementsDraggable();
        makeElementsEditable();
        
        // Agregar botones de acción
        addActionButtons();
        
        console.log('Modo editor activado correctamente');
    };
    
    // Esperar a que los elementos estén renderizados
    setTimeout(initElements, 500);
}

// Desactivar modo editor
function disableEditMode() {
    editMode = false;
    document.body.classList.remove('circuit-edit-mode');
    removeEditControls();
    removeElementControls();
    
    // Restaurar posiciones originales de los elementos
    const elements = document.querySelectorAll('.circuit-element');
    elements.forEach(element => {
        const originalLeft = element.getAttribute('data-original-left');
        const originalTop = element.getAttribute('data-original-top');
        if (originalLeft && originalTop) {
            element.style.left = originalLeft;
            element.style.top = originalTop;
        }
    });
}

// Agregar controles de edición
function addEditControls() {
    const container = document.querySelector('.circuit-container');
    if (!container) return;
    
    // Activar cuadrícula
    container.classList.add('circuit-grid-enabled');
    
    // Botón para agregar elemento
    const addBtn = document.createElement('button');
    addBtn.className = 'circuit-edit-btn circuit-add-btn';
    addBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>';
    addBtn.title = 'Agregar elemento';
    addBtn.onclick = () => showAddElementModal();
    container.appendChild(addBtn);
    
    // Botón de conexión eliminado - funcionalidad eliminada
    
    // Botón para guardar cambios
    const saveBtn = document.createElement('button');
    saveBtn.className = 'circuit-edit-btn circuit-save-btn';
    saveBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 6l-9-5-9 5v10l9 5 9-5V6zm-9 12.5l-7-3.89V7.11l7 3.89 7-3.89v7.5l-7 3.89z"/></svg>';
    saveBtn.title = 'Guardar cambios';
    saveBtn.onclick = saveAllChanges;
    container.appendChild(saveBtn);
}

// Funcionalidad de conexiones eliminada

// Hacer elementos arrastrables
function makeElementsDraggable() {
    const elements = document.querySelectorAll('.circuit-element');
    console.log(`Haciendo ${elements.length} elementos arrastrables`);
    
    if (elements.length === 0) {
        console.warn('No se encontraron elementos para hacer arrastrables');
        return;
    }
    
    elements.forEach((element, index) => {
        // Solo agregar si no tiene el listener ya
        if (element.hasAttribute('data-draggable-listener')) {
            console.log(`Elemento ${index} ya tiene listener de arrastre`);
            return;
        }
        
        // Guardar posición original si no está guardada
        if (!element.hasAttribute('data-original-left')) {
            element.setAttribute('data-original-left', element.style.left);
            element.setAttribute('data-original-top', element.style.top);
        }
        
        element.style.cursor = 'move';
        // NO cambiar position, ya está establecida
        element.setAttribute('data-draggable-listener', 'true');
        
        const mousedownHandler = function(e) {
            // No interferir con el botón de eliminar
            if (e.target.classList.contains('circuit-element-delete') || 
                e.target.closest('.circuit-element-delete')) {
                return;
            }
            
            if (!editMode) {
                console.log('No se puede arrastrar: editMode=', editMode);
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Iniciando arrastre del elemento:', element);
            selectedElement = element;
            isDragging = true;
            
            const rect = element.getBoundingClientRect();
            const containerRect = document.querySelector('.circuit-container')?.getBoundingClientRect();
            if (!containerRect) {
                console.error('No se encontró el contenedor');
                return;
            }
            
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;
            
            element.style.opacity = '0.7';
            element.style.zIndex = '1000';
        };
        
        element.addEventListener('mousedown', mousedownHandler);
        console.log(`Listener de arrastre agregado al elemento ${index}`);
    });
    
    // Agregar listeners globales solo una vez
    if (!window.circuitEditorListenersAdded) {
        const mousemoveHandler = (e) => {
            if (!isDragging || !selectedElement) return;
            
            const container = document.querySelector('.circuit-container');
            if (!container) return;
            const containerRect = container.getBoundingClientRect();
            
            // Aplicar snap a cuadrícula
            const gridSize = 10;
            let newLeft = e.clientX - containerRect.left - dragOffset.x;
            let newTop = e.clientY - containerRect.top - dragOffset.y;
            
            // Snap a cuadrícula
            newLeft = Math.round(newLeft / gridSize) * gridSize;
            newTop = Math.round(newTop / gridSize) * gridSize;
            
            selectedElement.style.left = `${newLeft}px`;
            selectedElement.style.top = `${newTop}px`;
            
            // No hay conexiones que actualizar (funcionalidad eliminada)
        };
        
        const mouseupHandler = () => {
            if (selectedElement) {
                selectedElement.style.opacity = '1';
                selectedElement.style.zIndex = '100';
            // No hay conexiones que redibujar
            }
            isDragging = false;
            selectedElement = null;
        };
        
        document.addEventListener('mousemove', mousemoveHandler);
        document.addEventListener('mouseup', mouseupHandler);
        
        // Guardar referencias para poder removerlos después
        window.circuitEditorMousemoveHandler = mousemoveHandler;
        window.circuitEditorMouseupHandler = mouseupHandler;
        window.circuitEditorListenersAdded = true;
    }
}

// Hacer elementos editables (doble clic para editar)
function makeElementsEditable() {
    const elements = document.querySelectorAll('.circuit-element');
    console.log(`Haciendo ${elements.length} elementos editables`);
    
    if (elements.length === 0) {
        console.warn('No se encontraron elementos para hacer editables');
        return;
    }
    
    elements.forEach((element, index) => {
        // Agregar botón de eliminar si no existe
        if (!element.querySelector('.circuit-element-delete')) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'circuit-element-delete';
            deleteBtn.innerHTML = '×';
            deleteBtn.title = 'Eliminar elemento';
            deleteBtn.style.cssText = 'position: absolute; top: -8px; right: -8px; width: 20px; height: 20px; border-radius: 50%; background: #d93025; color: white; border: none; cursor: pointer; font-size: 16px; line-height: 1; z-index: 1001; display: flex; align-items: center; justify-content: center;';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                if (confirm('¿Eliminar este elemento?')) {
                    deleteElement(element);
                }
            };
            element.style.position = 'relative'; // Para que el botón se posicione correctamente
            element.appendChild(deleteBtn);
            console.log(`Botón de eliminar agregado al elemento ${index}`);
        }
        
        // Agregar listener de doble clic si no existe
        if (!element.hasAttribute('data-dblclick-listener')) {
            element.setAttribute('data-dblclick-listener', 'true');
            const dblclickHandler = function(e) {
                // No interferir con el botón de eliminar
                if (e.target.classList.contains('circuit-element-delete') || 
                    e.target.closest('.circuit-element-delete')) {
                    return;
                }
                
                if (!editMode) {
                    console.log('No se puede editar: editMode=', editMode);
                    return;
                }
                
                e.preventDefault();
                e.stopPropagation();
                console.log('Doble click detectado en:', element);
                showEditElementModal(element);
            };
            element.addEventListener('dblclick', dblclickHandler);
            console.log(`Listener de doble clic agregado al elemento ${index}`);
        }
    });
}

// Mostrar modal para agregar elemento
function showAddElementModal() {
    const modal = document.createElement('div');
    modal.className = 'circuit-modal';
    modal.innerHTML = `
        <div class="circuit-modal-content">
            <div class="circuit-modal-header">
                <h3>Agregar Elemento</h3>
                <button class="circuit-modal-close" onclick="this.closest('.circuit-modal').remove()">×</button>
            </div>
            <div class="circuit-modal-body">
                <div class="form-group">
                    <label>Tipo de Elemento *</label>
                    <select id="newElementType" class="form-input">
                        <option value="functionality">Etapa (Functionality)</option>
                        <option value="system">Funcionalidad (System)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Panel *</label>
                    <select id="newElementPanel" class="form-input">
                        <option value="trading-panel">Trading</option>
                        <option value="middle-panel">Middle</option>
                        <option value="backoffice-panel">Backoffice</option>
                        <option value="interfaces-panel">Interfaces</option>
                        <option value="contabilidad-panel">Contabilidad</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>ID del Elemento *</label>
                    <input type="text" id="newElementId" class="form-input" placeholder="ej: nuevo-elemento">
                </div>
                <div class="form-group">
                    <label>Etiqueta/Texto *</label>
                    <input type="text" id="newElementLabel" class="form-input" placeholder="Nombre del elemento">
                </div>
                <div class="form-group" id="newElementIconGroup" style="display: none;">
                    <label>Ícono</label>
                    <div class="icon-selector-container">
                        <div class="icon-preview-container">
                            <div id="newElementIconPreview" class="icon-preview">
                                <span class="material-icons" style="font-size: 48px; color: #9aa0a6;">image</span>
                            </div>
                            <button type="button" class="btn-icon-selector" onclick="toggleNewElementIconSelector()">Seleccionar ícono</button>
                        </div>
                        <input type="hidden" id="newElementIcon" value="">
                        <div id="newElementIconSelector" class="icon-selector" style="display: none;">
                            <div class="icon-selector-tabs">
                                <button type="button" class="icon-tab active" onclick="switchNewElementIconTab('material')">Material Icons</button>
                            </div>
                            <div id="newElementIconTabMaterial" class="icon-tab-content active">
                                <div class="icon-search-container">
                                    <input type="text" id="newElementIconSearch" class="icon-search-input" placeholder="Buscar icono..." oninput="filtrarNewElementIconos(this.value)">
                                </div>
                                <div class="icon-grid" id="newElementMaterialIconsGrid">
                                    <!-- Los iconos se cargarán dinámicamente -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Posición X</label>
                    <input type="number" id="newElementLeft" class="form-input" value="100">
                </div>
                <div class="form-group">
                    <label>Posición Y</label>
                    <input type="number" id="newElementTop" class="form-input" value="100">
                </div>
            </div>
            <div class="circuit-modal-footer">
                <button class="btn btn-primary" onclick="createNewElement()">Crear</button>
                <button class="btn" onclick="this.closest('.circuit-modal').remove()">Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Mostrar/ocultar campo de icono según tipo
    document.getElementById('newElementType').addEventListener('change', (e) => {
        document.getElementById('newElementIconGroup').style.display = 
            e.target.value === 'system' ? 'block' : 'none';
    });
    
    // Inicializar preview de icono
    const iconPreview = document.getElementById('newElementIconPreview');
    if (iconPreview) {
        iconPreview.innerHTML = '<span class="material-icons" style="font-size: 48px; color: #9aa0a6;">image</span>';
    }
}

// Crear nuevo elemento
async function createNewElement() {
    const type = document.getElementById('newElementType').value;
    const panelId = document.getElementById('newElementPanel').value;
    const elementId = document.getElementById('newElementId').value;
    const label = document.getElementById('newElementLabel').value;
    const icon = document.getElementById('newElementIcon').value;
    const left = parseFloat(document.getElementById('newElementLeft').value);
    const top = parseFloat(document.getElementById('newElementTop').value);
    
    if (!elementId || !label) {
        alert('ID y Etiqueta son requeridos');
        return;
    }
    
    // Determinar colores según panel
    const panelColors = {
        'trading-panel': { bg: 'rgba(26, 115, 232, 0.15)', text: '#0d47a1' },
        'middle-panel': { bg: 'rgba(52, 168, 83, 0.15)', text: '#1b5e20' },
        'backoffice-panel': { bg: 'rgba(255, 152, 0, 0.15)', text: '#e65100' },
        'interfaces-panel': { bg: 'rgba(139, 69, 19, 0.15)', text: '#5d4037' },
        'contabilidad-panel': { bg: 'rgba(251, 188, 4, 0.15)', text: '#f57c00' }
    };
    
    const colors = panelColors[panelId] || panelColors['trading-panel'];
    
    const elementData = {
        element_id: elementId,
        type: type,
        panel_id: panelId,
        left_position: left,
        top_position: top,
        width: type === 'functionality' ? 120 : null,
        height: type === 'functionality' ? 30 : null,
        label: label,
        icon: type === 'system' ? icon : null,
        background_color: type === 'functionality' ? colors.bg : null,
        text_color: type === 'functionality' ? colors.text : null
    };
    
    try {
        const response = await fetch('/api/circuit/elements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(elementData)
        });
        
        const result = await response.json();
        if (result.success) {
            // Recargar para mostrar el nuevo elemento (la creación sí se guarda inmediatamente)
            location.reload();
        } else {
            alert('Error: ' + (result.error || 'No se pudo crear el elemento'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al crear elemento');
    }
}

// Mostrar modal para editar elemento
function showEditElementModal(element) {
    editingElement = element;
    const elementId = element.getAttribute('data-element-id');
    const elementType = element.getAttribute('data-element-type');
    const panelId = element.getAttribute('data-panel-id');
    const label = elementType === 'system' 
        ? element.querySelector('.circuit-system-label')?.textContent || ''
        : element.textContent.replace('×', '').trim();
    
    // Obtener icono actual
    let currentIcon = '';
    if (elementType === 'system') {
        const iconSpan = element.querySelector('.material-icons');
        if (iconSpan) {
            currentIcon = iconSpan.textContent;
        } else {
            // Intentar obtener del SVG o atributo data
            const iconEl = element.querySelector('.circuit-system-icon');
            if (iconEl) {
                const materialIcon = iconEl.querySelector('.material-icons');
                if (materialIcon) {
                    currentIcon = materialIcon.textContent;
                }
            }
        }
    }
    
    const modal = document.createElement('div');
    modal.className = 'circuit-modal';
    modal.innerHTML = `
        <div class="circuit-modal-content">
            <div class="circuit-modal-header">
                <h3>Editar Elemento</h3>
                <button class="circuit-modal-close" onclick="this.closest('.circuit-modal').remove()">×</button>
            </div>
            <div class="circuit-modal-body">
                <div class="form-group">
                    <label>Etiqueta/Texto *</label>
                    <input type="text" id="editElementLabel" class="form-input" value="${label}">
                </div>
                ${elementType === 'system' ? `
                <div class="form-group">
                    <label>Ícono</label>
                    <div class="icon-selector-container">
                        <div class="icon-preview-container">
                            <div id="editElementIconPreview" class="icon-preview">
                                <span class="material-icons" style="font-size: 48px; color: #9aa0a6;">image</span>
                            </div>
                            <button type="button" class="btn-icon-selector" onclick="toggleEditElementIconSelector()">Seleccionar ícono</button>
                        </div>
                        <input type="hidden" id="editElementIcon" value="${icon || ''}">
                        <div id="editElementIconSelector" class="icon-selector" style="display: none;">
                            <div class="icon-selector-tabs">
                                <button type="button" class="icon-tab active" onclick="switchEditElementIconTab('material')">Material Icons</button>
                            </div>
                            <div id="editElementIconTabMaterial" class="icon-tab-content active">
                                <div class="icon-search-container">
                                    <input type="text" id="editElementIconSearch" class="icon-search-input" placeholder="Buscar icono..." oninput="filtrarEditElementIconos(this.value)">
                                </div>
                                <div class="icon-grid" id="editElementMaterialIconsGrid">
                                    <!-- Los iconos se cargarán dinámicamente -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ` : ''}
                <div class="form-group">
                    <label>Posición X</label>
                    <input type="number" id="editElementLeft" class="form-input" value="${parseFloat(element.style.left)}">
                </div>
                <div class="form-group">
                    <label>Posición Y</label>
                    <input type="number" id="editElementTop" class="form-input" value="${parseFloat(element.style.top)}">
                </div>
                ${elementType === 'functionality' ? `
                <div class="form-group">
                    <label>Alto</label>
                    <input type="number" id="editElementHeight" class="form-input" value="${parseFloat(element.style.height) || 30}">
                    <small style="color: var(--text-secondary); font-size: 12px;">El ancho se ajusta automáticamente al texto</small>
                </div>
                ` : ''}
            </div>
            <div class="circuit-modal-footer">
                <button class="btn btn-primary" onclick="saveElementEdit()">Guardar</button>
                <button class="btn" onclick="this.closest('.circuit-modal').remove()">Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Inicializar preview de icono si existe
    if (elementType === 'system') {
        const iconPreview = document.getElementById('editElementIconPreview');
        if (iconPreview) {
            if (currentIcon) {
                iconPreview.innerHTML = `<span class="material-icons" style="font-size: 48px; color: var(--primary-color);">${currentIcon}</span>`;
            } else {
                iconPreview.innerHTML = '<span class="material-icons" style="font-size: 48px; color: #9aa0a6;">image</span>';
            }
        }
    }
}

// Guardar edición de elemento (NO guarda en BD, solo actualiza visualmente)
function saveElementEdit() {
    if (!editingElement) return;
    
    const elementId = editingElement.getAttribute('data-element-id');
    const elementType = editingElement.getAttribute('data-element-type');
    const label = document.getElementById('editElementLabel').value;
    const left = parseFloat(document.getElementById('editElementLeft').value);
    const top = parseFloat(document.getElementById('editElementTop').value);
    
    // NO guardar en BD todavía, solo actualizar visualmente
    // Los cambios se guardarán cuando se presione "Guardar"
    editingElement.style.left = `${left}px`;
    editingElement.style.top = `${top}px`;
    editingElement.setAttribute('data-pending-update', 'true');
    editingElement.setAttribute('data-pending-label', label);
    
    if (elementType === 'system') {
        const icon = document.getElementById('editElementIcon')?.value || '';
        editingElement.setAttribute('data-pending-icon', icon);
        if (icon) {
            const iconEl = editingElement.querySelector('.circuit-system-icon');
            if (iconEl) {
                iconEl.innerHTML = `<span class="material-icons" style="font-size: 14px; color: #1a365d;">${icon}</span>`;
            }
        }
        const labelEl = editingElement.querySelector('.circuit-system-label');
        if (labelEl) {
            labelEl.textContent = label;
        }
    } else {
        // Remover botón delete temporalmente para actualizar texto
        const deleteBtn = editingElement.querySelector('.circuit-element-delete');
        editingElement.textContent = label;
        if (deleteBtn) editingElement.appendChild(deleteBtn);
        
        const height = parseFloat(document.getElementById('editElementHeight')?.value || 30);
        editingElement.style.height = `${height}px`;
        editingElement.setAttribute('data-pending-height', height);
        // Ajustar ancho al texto
        editingElement.style.width = 'auto';
        setTimeout(() => {
            editingElement.style.minWidth = `${editingElement.offsetWidth}px`;
        }, 0);
    }
    
    // No hay conexiones que actualizar
    
    // Cerrar modal
    const modal = document.querySelector('.circuit-modal');
    if (modal) modal.remove();
    editingElement = null;
}

// Eliminar elemento
async function deleteElement(element) {
    const elementId = element.getAttribute('data-element-id');
    
    try {
        const response = await fetch(`/api/circuit/elements/${elementId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        if (result.success) {
            // No eliminar inmediatamente, solo marcar para eliminar
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
            element.setAttribute('data-to-delete', 'true');
            // No mostrar alert, solo marcar visualmente
        } else {
            alert('Error: ' + (result.error || 'No se pudo eliminar el elemento'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar elemento');
    }
}

// Funcionalidad de conexiones eliminada completamente

// Guardar todos los cambios (solo cuando se presiona el botón)
async function saveAllChanges() {
    const elements = Array.from(document.querySelectorAll('.circuit-element'));
    const updates = [];
    const toDelete = [];
    
    // Guardar posiciones y dimensiones de elementos
    for (const el of elements) {
        const elementId = el.getAttribute('data-element-id');
        const elementType = el.getAttribute('data-element-type');
        
        // Si está marcado para eliminar, agregarlo a la lista
        if (el.getAttribute('data-to-delete') === 'true') {
            toDelete.push(elementId);
            continue;
        }
        
        const update = {
            left_position: parseFloat(el.style.left),
            top_position: parseFloat(el.style.top)
        };
        
        // Si tiene actualizaciones pendientes, incluirlas
        if (el.getAttribute('data-pending-update') === 'true') {
            update.label = el.getAttribute('data-pending-label') || el.textContent.replace('×', '').trim();
            const pendingIcon = el.getAttribute('data-pending-icon');
            if (pendingIcon && elementType === 'system') {
                update.icon = pendingIcon;
            }
        } else {
            // Si no hay actualizaciones pendientes, solo actualizar posición
            // El label e icono ya están en BD
        }
        
        // Para functionality, el ancho se ajusta automáticamente al texto
        if (elementType === 'functionality') {
            // El ancho ya está ajustado al texto, guardarlo
            update.width = el.offsetWidth;
            update.height = el.offsetHeight;
        } else {
            update.width = el.style.width ? parseFloat(el.style.width) : null;
            update.height = el.style.height ? parseFloat(el.style.height) : null;
        }
        
        updates.push({
            element_id: elementId,
            ...update
        });
    }
    
    try {
        // Eliminar elementos marcados
        for (const elementId of toDelete) {
            const response = await fetch(`/api/circuit/elements/${elementId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`Error al eliminar ${elementId}`);
            }
        }
        
        // Guardar todos los elementos
        for (const update of updates) {
            const response = await fetch(`/api/circuit/elements/${update.element_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(update)
            });
            
            if (!response.ok) {
                throw new Error(`Error al actualizar ${update.element_id}`);
            }
        }
        
        alert('Cambios guardados correctamente');
        // Recargar para reflejar cambios
        location.reload();
    } catch (error) {
        console.error('Error al guardar:', error);
        alert('Error al guardar cambios: ' + error.message);
    }
}

// Funcionalidad de conexiones eliminada

// Remover controles de edición
function removeEditControls() {
    document.querySelectorAll('.circuit-edit-btn').forEach(btn => btn.remove());
}

// Remover controles de elementos
function removeElementControls() {
    document.querySelectorAll('.circuit-element-delete').forEach(btn => btn.remove());
}

// Agregar botones de acción
function addActionButtons() {
    // Los botones se agregan en addEditControls
}
