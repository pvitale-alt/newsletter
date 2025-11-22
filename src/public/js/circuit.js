// Circuito Integral de Unitrade - Basado en el ejemplo con estilo Google
document.addEventListener('DOMContentLoaded', function() {
    const circuitContainer = document.querySelector('.circuit-container');
    const circuitSvg = document.getElementById('circuitSvg');
    
    if (!circuitContainer || !circuitSvg) return;
    
    // Datos del circuito basados en default-circuit-data.ts
    const panels = [
        {
            id: 'trading-panel',
            type: 'primary',
            left: 50, // Movido un poco más a la izquierda para centrar con elementos
            top: 17.37,
            width: 442.64,
            height: 598.49,
            borderColor: 'rgba(26, 115, 232, 0.3)', // Azul pastel
            backgroundColor: 'rgba(26, 115, 232, 0.05)', // Azul pastel (más transparencia)
            titleColor: '#1a73e8', // Azul sólido para el label
            title: 'Trading'
        },
        {
            id: 'middle-panel',
            type: 'green',
            left: 514.13, // Movido un poco más a la izquierda para centrar con elementos
            top: 17.37,
            width: 385,
            height: 411.25,
            borderColor: 'rgba(52, 168, 83, 0.3)', // Verde pastel
            backgroundColor: 'rgba(52, 168, 83, 0.05)', // Verde pastel (más transparencia)
            titleColor: '#34a853', // Verde sólido para el label
            title: 'Middle'
        },
        {
            id: 'backoffice-panel',
            type: 'orange',
            left: 919.13, // Movido un poco más a la izquierda para centrar con elementos
            top: 19.37,
            width: 470,
            height: 409.25,
            borderColor: 'rgba(139, 69, 19, 0.3)', // Marrón pastel
            backgroundColor: 'rgba(139, 69, 19, 0.05)', // Marrón pastel (más transparencia)
            titleColor: '#8b4513', // Marrón sólido para el label
            title: 'Backoffice'
        },
        {
            id: 'interfaces-panel',
            type: 'blue',
            left: 514.13, // Movido un poco más a la izquierda para centrar con elementos
            top: 447.9,
            width: 385,
            height: 167.96,
            borderColor: 'rgba(251, 188, 4, 0.3)', // Amarillo pastel
            backgroundColor: 'rgba(251, 188, 4, 0.05)', // Amarillo pastel (más transparencia)
            titleColor: '#fbbc04', // Amarillo sólido para el label
            title: 'Interfaces'
        },
        {
            id: 'contabilidad-panel',
            type: 'dark-blue',
            left: 919.13, // Movido un poco más a la izquierda para centrar con elementos
            top: 448.9,
            width: 470,
            height: 166.96,
            borderColor: 'rgba(255, 152, 0, 0.3)', // Naranja pastel
            backgroundColor: 'rgba(255, 152, 0, 0.05)', // Naranja pastel (más transparencia)
            titleColor: '#ff9800', // Naranja sólido para el label
            title: 'Contabilidad'
        }
    ];
    
    // Elementos del circuito (simplificados, basados en el ejemplo)
    const elements = [
        // Trading Panel - Systems
        { id: 'byma', type: 'system', left: 75, top: 311, width: 87, height: 31, label: 'BYMA', panelId: 'trading-panel', icon: 'trading' },
        { id: 'a3', type: 'system', left: 76, top: 405, width: 82, height: 29, label: 'A3', panelId: 'trading-panel', icon: 'trading' },
        { id: 'api-bo', type: 'system', left: 168, top: 426, width: 93, height: 29, label: 'API BO', panelId: 'trading-panel', icon: 'link' },
        { id: 'homebanking', type: 'system', left: 64, top: 154, width: 146, height: 31, label: 'HomeBanking', panelId: 'trading-panel', icon: 'user' },
        { id: 'siopel', type: 'system', left: 168, top: 383, width: 120, height: 30, label: 'Siopel', panelId: 'trading-panel', icon: 'link' },
        { id: 'bcra', type: 'system', left: 125, top: 492, width: 85, height: 27, label: 'BCRA', panelId: 'trading-panel', icon: 'link' },
        { id: 'alta-manual', type: 'system', left: 107.42, top: 71.41, width: 120, height: 30, label: 'Alta Manual', panelId: 'trading-panel', icon: 'user' },
        
        // Trading Panel - Functionalities
        { id: 'oms', type: 'functionality', left: 91, top: 227, width: 63, height: 27, label: 'OMS', panelId: 'trading-panel', backgroundColor: 'rgba(26, 115, 232, 0.15)', textColor: '#0d47a1' },
        { id: 'trading-room', type: 'functionality', left: 320, top: 539, width: 120, height: 30, label: 'TRADING ROOM', panelId: 'trading-panel', backgroundColor: 'rgba(26, 115, 232, 0.15)', textColor: '#0d47a1' },
        { id: 'concertacion', type: 'functionality', left: 329, top: 69, width: 120, height: 30, label: 'CONCERTACIÓN', panelId: 'trading-panel', backgroundColor: 'rgba(26, 115, 232, 0.15)', textColor: '#0d47a1' },
        
        // Middle Panel - Systems
        { id: 'productos-financieros', type: 'system', left: 1106, top: 208, width: 145, height: 43, label: 'Productos\nFinancieros', panelId: 'middle-panel', icon: 'link' },
        { id: 'limites', type: 'system', left: 546, top: 134, width: 122, height: 30, label: 'Limites', panelId: 'middle-panel', icon: 'lock' },
        { id: 'revaluos-devengamientos', type: 'system', left: 1076.33, top: 556.33, width: 120, height: 30, label: 'Revalúos y Devengamientos', panelId: 'middle-panel', icon: 'list' },
        { id: 'custodias', type: 'system', left: 747, top: 364, width: 114, height: 30, label: 'Custodias', panelId: 'middle-panel', icon: 'settings' },
        { id: 'comprobantes', type: 'system', left: 557, top: 231, width: 120, height: 30, label: 'Comprobantes', panelId: 'middle-panel', icon: 'file' },
        { id: 'emails', type: 'system', left: 569, top: 294, width: 88, height: 30, label: 'Emails', panelId: 'middle-panel', icon: 'mail' },
        { id: 'cuentas', type: 'system', left: 750.42, top: 295.41, width: 120, height: 30, label: 'Cuentas', panelId: 'middle-panel', icon: 'user' },
        
        // Middle Panel - Functionalities
        { id: 'autorizacion', type: 'functionality', left: 551, top: 66, width: 112, height: 30, label: 'AUTORIZACIÓN', panelId: 'middle-panel', backgroundColor: 'rgba(52, 168, 83, 0.15)', textColor: '#1b5e20' },
        { id: 'confirmacion', type: 'functionality', left: 757, top: 231, width: 111, height: 30, label: 'CONFIRMACIÓN', panelId: 'middle-panel', backgroundColor: 'rgba(52, 168, 83, 0.15)', textColor: '#1b5e20' },
        
        // Backoffice Panel - Systems
        { id: 'comisiones-impuestos', type: 'system', left: 1107, top: 337, width: 106, height: 29, label: 'Comisiones\nImpuestos', panelId: 'backoffice-panel', icon: 'settings' },
        { id: 'transmision-deb-cred', type: 'system', left: 959, top: 212, width: 133, height: 33, label: 'Transmisión\nDeb/Cred', panelId: 'backoffice-panel', icon: 'link' },
        { id: 'instrucciones-liq', type: 'system', left: 1123, top: 51, width: 120, height: 30, label: 'Instrucciones\nde Liquidación', panelId: 'backoffice-panel', icon: 'file' },
        { id: 'tenencias', type: 'system', left: 975, top: 95, width: 120, height: 30, label: 'Tenencias', panelId: 'backoffice-panel', icon: 'list' },
        { id: 'cuentas-inversores', type: 'system', left: 1268, top: 52, width: 120, height: 30, label: 'Cuentas\nInversores', panelId: 'backoffice-panel', icon: 'link' },
        { id: 'transferencias', type: 'system', left: 935.74, top: 345, width: 120, height: 32, label: 'Transferencias', panelId: 'backoffice-panel', icon: 'list' },
        { id: 'acreditaciones', type: 'system', left: 936, top: 385, width: 117, height: 30, label: 'Acreditaciones', panelId: 'backoffice-panel', icon: 'dollar' },
        { id: 'operaciones', type: 'system', left: 1096, top: 277, width: 120, height: 30, label: 'Operaciones', panelId: 'backoffice-panel', icon: 'list' },
        
        // Backoffice Panel - Functionalities
        { id: 'liquidacion', type: 'functionality', left: 975, top: 155, width: 120, height: 30, label: 'LIQUIDACIÓN', panelId: 'backoffice-panel', backgroundColor: '#f4e4d7', textColor: '#8b4513' },
        { id: 'control', type: 'functionality', left: 1257, top: 278, width: 120, height: 30, label: 'CONTROL', panelId: 'backoffice-panel', backgroundColor: '#f4e4d7', textColor: '#8b4513' },
        
        // Interfaces Panel - Systems
        { id: 'core-contable', type: 'system', left: 549, top: 473, width: 154, height: 32, label: 'Core Contable', panelId: 'interfaces-panel', icon: 'file' },
        { id: 'normativas', type: 'system', left: 599, top: 545, width: 120, height: 30, label: 'Normativas', panelId: 'interfaces-panel', icon: 'file' },
        { id: 'modelo-datos', type: 'system', left: 741, top: 548, width: 152, height: 29, label: 'Modelo de Datos', panelId: 'interfaces-panel', icon: 'database' },
        
        // Interfaces Panel - Functionalities
        { id: 'exportacion', type: 'functionality', left: 771, top: 472, width: 104, height: 29, label: 'EXPORTACIÓN', panelId: 'interfaces-panel', backgroundColor: 'rgba(251, 188, 4, 0.15)', textColor: '#f57c00' },
        
        // Contabilidad Panel - Systems
        { id: 'asientos-contables', type: 'system', left: 949, top: 496, width: 120, height: 30, label: 'Asientos Contables', panelId: 'contabilidad-panel', icon: 'database' },
        { id: 'cotizaciones', type: 'system', left: 1255, top: 526, width: 132, height: 29, label: 'Cotizaciones', panelId: 'contabilidad-panel', icon: 'link' },
        { id: 'conciliacion-cv', type: 'system', left: 960, top: 45, width: 120, height: 30, label: 'Conciliación CV', panelId: 'contabilidad-panel', icon: 'file' },
        { id: 'nsc', type: 'system', left: 1189, top: 121.33, width: 120, height: 30, label: 'Nuevo Sistema\nCustodia (NSC)', panelId: 'contabilidad-panel', icon: 'globe' },
        
        // Contabilidad Panel - Functionalities
        { id: 'valuacion', type: 'functionality', left: 1269, top: 471, width: 94, height: 27, label: 'VALUACIÓN', panelId: 'contabilidad-panel', backgroundColor: 'rgba(255, 152, 0, 0.15)', textColor: '#e65100' }
    ];
    
    // Conexiones (arrows y lines) - eliminadas por ahora
    const connections = [];
    
    // Función para obtener icono SVG
    function getIconSvg(iconType) {
        const icons = {
            'user': '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
            'link': '<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>',
            'trading': '<path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>',
            'lock': '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>',
            'file': '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
            'mail': '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
            'settings': '<path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l1.68-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.87-.6-1.36-.83L14.8 2.81c-.04-.2-.2-.35-.4-.35h-3.2c-.2 0-.36.15-.4.34l-.3 2.12c-.49.23-.94.51-1.36.83l-1.99-.8c-.18-.07-.39 0-.49.18L2.6 8.05c-.1.18-.06.39.1.51l1.68 1.32c-.04.3-.06.61-.06.94 0 .32.02.64.06.94l-1.68 1.32c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.87.6 1.36.83l.3 2.12c.05.2.2.35.4.35h3.2c.2 0 .36-.15.4-.34l.3-2.12c.49-.23.94-.51 1.36-.83l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.68-1.32zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>',
            'list': '<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-8h14V7H7v2z"/>',
            'dollar': '<path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>',
            'globe': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>',
            'database': '<path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9c0 2.21 3.58 4 8 4s8-1.79 8-4v2c0 2.21-3.58 4-8 4s-8-1.79-8-4V9zm0 4c0 2.21 3.58 4 8 4s8-1.79 8-4v2c0 2.21-3.58 4-8 4s-8-1.79-8-4v-2z"/>'
        };
        return icons[iconType] || icons['globe'];
    }
    
    // Crear paneles
    function createPanels() {
        panels.forEach(panel => {
            const panelEl = document.createElement('div');
            panelEl.className = `circuit-panel circuit-panel-${panel.type}`;
            panelEl.id = panel.id;
            panelEl.style.position = 'absolute';
            panelEl.style.left = `${panel.left}px`;
            panelEl.style.top = `${panel.top}px`;
            panelEl.style.width = `${panel.width}px`;
            panelEl.style.height = `${panel.height}px`;
            panelEl.style.borderColor = panel.borderColor;
            panelEl.style.backgroundColor = panel.backgroundColor || 'transparent';
            panelEl.setAttribute('data-panel-id', panel.id);
            
            if (panel.title) {
                const titleEl = document.createElement('div');
                titleEl.className = 'circuit-panel-title';
                titleEl.textContent = panel.title;
                titleEl.style.backgroundColor = panel.titleColor || '#1a73e8';
                panelEl.appendChild(titleEl);
            }
            
            circuitContainer.appendChild(panelEl);
        });
    }
    
    // Crear elementos
    function createElements() {
        elements.forEach(element => {
            const el = document.createElement('div');
            el.className = `circuit-element circuit-element-${element.type}`;
            el.id = `element-${element.id}`;
            el.style.position = 'absolute';
            el.style.left = `${element.left}px`;
            el.style.top = `${element.top}px`;
            el.setAttribute('data-element-id', element.id);
            el.setAttribute('data-element-type', element.type);
            el.setAttribute('data-panel-id', element.panelId);
            
            if (element.type === 'system') {
                el.style.width = element.width ? `${element.width}px` : 'auto';
                el.style.height = element.height ? `${element.height}px` : 'auto';
                el.innerHTML = `
                    <div class="circuit-system-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            ${getIconSvg(element.icon || 'globe')}
                        </svg>
                    </div>
                    <span class="circuit-system-label">${element.label.replace(/\n/g, '<br>')}</span>
                `;
            } else if (element.type === 'functionality') {
                // Ancho variable según el texto
                el.style.width = 'auto';
                el.style.minWidth = element.width ? `${element.width}px` : '120px';
                el.style.height = element.height ? `${element.height}px` : '30px';
                el.style.backgroundColor = element.backgroundColor || 'rgba(26, 115, 232, 0.15)';
                el.style.color = element.textColor || '#0d47a1';
                el.style.padding = '0 12px';
                el.style.display = 'inline-flex';
                el.style.alignItems = 'center';
                el.style.justifyContent = 'center';
                el.style.whiteSpace = 'nowrap';
                el.textContent = element.label;
                
                // Ajustar ancho después de renderizar
                setTimeout(() => {
                    const computedWidth = el.offsetWidth;
                    if (computedWidth > 0) {
                        el.style.width = `${computedWidth}px`;
                    }
                }, 0);
            }
            
            circuitContainer.appendChild(el);
        });
    }
    
    // Función para hacer la línea editable (con puntos de control)
    function makeLineEditable(path, points, svg) {
        // Crear grupo para los puntos de control
        const controlGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        controlGroup.setAttribute('id', 'line-control-points');
        controlGroup.style.display = 'none'; // Oculto por defecto, se mostrará en modo editor
        
        const controlPoints = [];
        
        // Crear un punto de control para cada punto de la línea
        points.forEach((point, index) => {
            const [x, y] = point.split(',').map(Number);
            
            // Círculo de control
            const controlCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            controlCircle.setAttribute('cx', x);
            controlCircle.setAttribute('cy', y);
            controlCircle.setAttribute('r', '8');
            controlCircle.setAttribute('fill', '#34a853');
            controlCircle.setAttribute('stroke', '#ffffff');
            controlCircle.setAttribute('stroke-width', '2');
            controlCircle.style.cursor = 'move';
            controlCircle.setAttribute('data-point-index', index);
            
            // Hacer el punto arrastrable
            let isDragging = false;
            let dragStart = { x: 0, y: 0 };
            
            const mousemoveHandler = (e) => {
                if (!isDragging) return;
                
                const svgRect = svg.getBoundingClientRect();
                const viewBox = svg.viewBox.baseVal;
                const scaleX = viewBox.width / svgRect.width;
                const scaleY = viewBox.height / svgRect.height;
                
                const newX = dragStart.pointX + (e.clientX - svgRect.left - dragStart.x) * scaleX;
                const newY = dragStart.pointY + (e.clientY - svgRect.top - dragStart.y) * scaleY;
                
                // Actualizar posición del punto de control
                controlCircle.setAttribute('cx', newX);
                controlCircle.setAttribute('cy', newY);
                
                // Actualizar el punto en el array
                points[index] = `${newX},${newY}`;
                
                // Actualizar la línea
                const pathStr = `M ${points[0]} L ${points.slice(1).join(' L ')}`;
                path.setAttribute('d', pathStr);
                
                // Actualizar animación de la pelota
                const animateMotion = document.getElementById('trading-exportacion-animation');
                if (animateMotion) {
                    animateMotion.setAttribute('path', pathStr);
                }
                
                // Guardar en variable global
                if (window.updateTradingExportacionLine) {
                    window.updateTradingExportacionLine(points);
                }
            };
            
            const mouseupHandler = () => {
                isDragging = false;
                document.removeEventListener('mousemove', mousemoveHandler);
                document.removeEventListener('mouseup', mouseupHandler);
            };
            
            controlCircle.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                isDragging = true;
                const svgRect = svg.getBoundingClientRect();
                dragStart = {
                    x: e.clientX - svgRect.left,
                    y: e.clientY - svgRect.top,
                    pointX: x,
                    pointY: y
                };
                document.addEventListener('mousemove', mousemoveHandler);
                document.addEventListener('mouseup', mouseupHandler);
            });
            
            controlGroup.appendChild(controlCircle);
            controlPoints.push(controlCircle);
        });
        
        svg.appendChild(controlGroup);
        
        // Mostrar/ocultar puntos de control según el modo editor
        const observer = new MutationObserver(() => {
            const isEditMode = document.body.classList.contains('circuit-edit-mode');
            controlGroup.style.display = isEditMode ? 'block' : 'none';
        });
        
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Mostrar inicialmente si está en modo editor
        if (document.body.classList.contains('circuit-edit-mode')) {
            controlGroup.style.display = 'block';
        }
    }
    
    // Dibujar conexiones
    function drawConnections() {
        // Limpiar conexiones anteriores (líneas y pelotas)
        const existingLines = circuitSvg.querySelectorAll('.connection-line');
        existingLines.forEach(line => line.remove());
        const existingCircles = circuitSvg.querySelectorAll('circle');
        existingCircles.forEach(circle => {
            // Solo eliminar círculos que son parte de las animaciones de conexión
            if (circle.querySelector('animateMotion')) {
                circle.remove();
            }
        });
        
        // Obtener datos de Trading panel y Exportación element usando las coordenadas absolutas
        const tradingPanelData = panels.find(p => p.id === 'trading-panel');
        const exportacionElementData = elements.find(e => e.id === 'exportacion');
        
        if (!tradingPanelData || !exportacionElementData) return;
        
        // Calcular posiciones usando las coordenadas absolutas de los datos
        const tradingRightX = tradingPanelData.left + tradingPanelData.width;
        const tradingCenterY = tradingPanelData.top + tradingPanelData.height / 2;
        
        const exportacionLeftX = exportacionElementData.left;
        const exportacionCenterY = exportacionElementData.top + exportacionElementData.height / 2;
        
        // Obtener datos de paneles intermedios
        const middlePanelData = panels.find(p => p.id === 'middle-panel');
        const backofficePanelData = panels.find(p => p.id === 'backoffice-panel');
        
        let points = [];
        
        if (middlePanelData && backofficePanelData) {
            const middleLeftX = middlePanelData.left;
            const middleRightX = middlePanelData.left + middlePanelData.width;
            const backofficeLeftX = backofficePanelData.left;
            const backofficeRightX = backofficePanelData.left + backofficePanelData.width;
            
            // Punto inicial: borde derecho de Trading (centro vertical)
            points.push(`${tradingRightX},${tradingCenterY}`);
            
            // Punto intermedio 1: entrada a Middle (borde izquierdo, misma altura)
            points.push(`${middleLeftX},${tradingCenterY}`);
            
            // Punto intermedio 2: salida de Middle (borde derecho, misma altura)
            points.push(`${middleRightX},${tradingCenterY}`);
            
            // Punto intermedio 3: entrada a Backoffice (borde izquierdo, misma altura)
            points.push(`${backofficeLeftX},${tradingCenterY}`);
            
            // Punto intermedio 4: salida de Backoffice (borde derecho, misma altura)
            points.push(`${backofficeRightX},${tradingCenterY}`);
            
            // Punto intermedio 5: bajar verticalmente hacia la altura de Exportación
            points.push(`${backofficeRightX},${exportacionCenterY}`);
            
            // Punto final: Exportación (borde izquierdo)
            points.push(`${exportacionLeftX},${exportacionCenterY}`);
        } else {
            // Si no hay paneles intermedios, línea directa
            points.push(`${tradingRightX},${tradingCenterY}`);
            points.push(`${exportacionLeftX},${exportacionCenterY}`);
        }
        
        // Guardar puntos en variable global para poder editarlos
        window.tradingExportacionPoints = points;
        
        // Crear path SVG con la línea verde (sin flecha, más gruesa)
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('id', 'trading-exportacion-path');
        path.setAttribute('class', 'connection-line');
        path.setAttribute('d', `M ${points[0]} L ${points.slice(1).join(' L ')}`);
        path.setAttribute('stroke', '#34a853'); // Verde
        path.setAttribute('stroke-width', '8'); // Línea más gruesa (aumentada de 5 a 8)
        path.setAttribute('fill', 'none');
        path.style.zIndex = '1';
        path.style.cursor = 'pointer';
        
        circuitSvg.appendChild(path);
        
        // Crear pelota animada que se desplaza sobre la línea
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('id', 'trading-exportacion-ball');
        circle.setAttribute('r', '10'); // Radio de la pelota (aumentado para que se vea mejor con línea más gruesa)
        circle.setAttribute('fill', '#34a853'); // Color verde igual que la línea
        circle.setAttribute('stroke', '#ffffff'); // Borde blanco para contraste
        circle.setAttribute('stroke-width', '2');
        
        // Animación que hace que la pelota siga el path (más lenta)
        const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        animateMotion.setAttribute('id', 'trading-exportacion-animation');
        animateMotion.setAttribute('dur', '8s'); // Duración de 8 segundos (más lento, era 4s)
        animateMotion.setAttribute('repeatCount', 'indefinite'); // Repetir indefinidamente
        animateMotion.setAttribute('path', `M ${points[0]} L ${points.slice(1).join(' L ')}`);
        
        circle.appendChild(animateMotion);
        circuitSvg.appendChild(circle);
        
        // Función para actualizar la línea cuando se editen los puntos
        window.updateTradingExportacionLine = function(newPoints) {
            window.tradingExportacionPoints = newPoints;
            const pathStr = `M ${newPoints[0]} L ${newPoints.slice(1).join(' L ')}`;
            path.setAttribute('d', pathStr);
            animateMotion.setAttribute('path', pathStr);
        };
        
        // Agregar puntos de control editables si el modo editor está activo
        if (document.body.classList.contains('circuit-edit-mode')) {
            makeLineEditable(path, points, circuitSvg);
        }
    }
    
    // Inicializar
    createPanels();
    createElements();
    
    // Ajustar SVG
    function resizeSvg() {
        const rect = circuitContainer.getBoundingClientRect();
        // Usar viewBox fijo que cubra todo el circuito (basado en las coordenadas de los elementos)
        const viewBoxWidth = 1600;
        const viewBoxHeight = 800;
        circuitSvg.setAttribute('width', rect.width);
        circuitSvg.setAttribute('height', rect.height);
        circuitSvg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
        drawConnections();
    }
    
    setTimeout(() => {
        resizeSvg();
    }, 100);
    
    window.addEventListener('resize', resizeSvg);
    
    // Observar cambios en el modo editor para activar/desactivar edición de línea
    const editModeObserver = new MutationObserver(() => {
        const isEditMode = document.body.classList.contains('circuit-edit-mode');
        const path = document.getElementById('trading-exportacion-path');
        const controlGroup = document.getElementById('line-control-points');
        
        if (isEditMode && path && !controlGroup && window.tradingExportacionPoints) {
            // Crear puntos de control si no existen
            makeLineEditable(path, window.tradingExportacionPoints, circuitSvg);
        } else if (controlGroup) {
            // Mostrar/ocultar puntos de control
            controlGroup.style.display = isEditMode ? 'block' : 'none';
        }
    });
    
    editModeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
});
