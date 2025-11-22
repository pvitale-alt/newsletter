-- Tabla para paneles del circuito (hardcodeados, no editables)
CREATE TABLE IF NOT EXISTS circuit_panels (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    left_position DECIMAL(10, 2) NOT NULL,
    top_position DECIMAL(10, 2) NOT NULL,
    width DECIMAL(10, 2) NOT NULL,
    height DECIMAL(10, 2) NOT NULL,
    border_color VARCHAR(50) NOT NULL,
    background_color VARCHAR(50) NOT NULL,
    title_color VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para elementos del circuito (Etapas y Funcionalidades)
CREATE TABLE IF NOT EXISTS circuit_elements (
    id SERIAL PRIMARY KEY,
    element_id VARCHAR(100) UNIQUE NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('functionality', 'system')),
    panel_id VARCHAR(50) NOT NULL,
    left_position DECIMAL(10, 2) NOT NULL,
    top_position DECIMAL(10, 2) NOT NULL,
    width DECIMAL(10, 2),
    height DECIMAL(10, 2),
    label TEXT NOT NULL,
    icon VARCHAR(50),
    background_color VARCHAR(50),
    text_color VARCHAR(50),
    border_color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (panel_id) REFERENCES circuit_panels(id) ON DELETE CASCADE
);

-- Tabla para conexiones/uniones entre elementos
CREATE TABLE IF NOT EXISTS circuit_connections (
    id SERIAL PRIMARY KEY,
    connection_type VARCHAR(20) NOT NULL CHECK (connection_type IN ('stage-to-stage', 'stage-to-functionality')),
    from_element_id INTEGER NOT NULL,
    to_element_id INTEGER NOT NULL,
    points JSONB, -- Array de puntos {x, y} para la línea
    stroke_color VARCHAR(50) DEFAULT '#00897b',
    stroke_width INTEGER DEFAULT 3,
    stroke_dasharray VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_element_id) REFERENCES circuit_elements(id) ON DELETE CASCADE,
    FOREIGN KEY (to_element_id) REFERENCES circuit_elements(id) ON DELETE CASCADE
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_circuit_elements_panel ON circuit_elements(panel_id);
CREATE INDEX IF NOT EXISTS idx_circuit_elements_type ON circuit_elements(type);
CREATE INDEX IF NOT EXISTS idx_circuit_connections_from ON circuit_connections(from_element_id);
CREATE INDEX IF NOT EXISTS idx_circuit_connections_to ON circuit_connections(to_element_id);

