-- Insertar paneles del circuito
INSERT INTO circuit_panels (id, type, left_position, top_position, width, height, border_color, background_color, title_color, title) VALUES
('trading-panel', 'primary', 50, 17.37, 442.64, 598.49, 'rgba(26, 115, 232, 0.3)', 'rgba(26, 115, 232, 0.05)', '#1a73e8', 'Trading'),
('middle-panel', 'green', 514.13, 17.37, 385, 411.25, 'rgba(52, 168, 83, 0.3)', 'rgba(52, 168, 83, 0.05)', '#34a853', 'Middle'),
('backoffice-panel', 'orange', 919.13, 19.37, 470, 409.25, 'rgba(255, 152, 0, 0.3)', 'rgba(255, 152, 0, 0.05)', '#ff9800', 'Backoffice'),
('interfaces-panel', 'blue', 514.13, 447.9, 385, 167.96, 'rgba(139, 69, 19, 0.3)', 'rgba(139, 69, 19, 0.05)', '#8b4513', 'Interfaces'),
('contabilidad-panel', 'dark-blue', 919.13, 448.9, 470, 166.96, 'rgba(251, 188, 4, 0.3)', 'rgba(251, 188, 4, 0.05)', '#fbbc04', 'Contabilidad')
ON CONFLICT (id) DO NOTHING;

-- Insertar elementos del circuito (Etapas - functionality)
INSERT INTO circuit_elements (element_id, type, panel_id, left_position, top_position, width, height, label, background_color, text_color) VALUES
-- Trading Panel - Etapas
('oms', 'functionality', 'trading-panel', 91, 227, 63, 27, 'OMS', 'rgba(26, 115, 232, 0.15)', '#0d47a1'),
('trading-room', 'functionality', 'trading-panel', 320, 539, 120, 30, 'TRADING ROOM', 'rgba(26, 115, 232, 0.15)', '#0d47a1'),
('concertacion', 'functionality', 'trading-panel', 329, 69, 120, 30, 'CONCERTACIÓN', 'rgba(26, 115, 232, 0.15)', '#0d47a1'),
-- Middle Panel - Etapas
('autorizacion', 'functionality', 'middle-panel', 551, 66, 112, 30, 'AUTORIZACIÓN', 'rgba(52, 168, 83, 0.15)', '#1b5e20'),
('confirmacion', 'functionality', 'middle-panel', 757, 231, 111, 30, 'CONFIRMACIÓN', 'rgba(52, 168, 83, 0.15)', '#1b5e20'),
-- Backoffice Panel - Etapas
('liquidacion', 'functionality', 'backoffice-panel', 975, 155, 120, 30, 'LIQUIDACIÓN', 'rgba(255, 152, 0, 0.15)', '#e65100'),
('control', 'functionality', 'backoffice-panel', 1257, 278, 120, 30, 'CONTROL', 'rgba(255, 152, 0, 0.15)', '#e65100'),
-- Interfaces Panel - Etapas
('exportacion', 'functionality', 'interfaces-panel', 771, 472, 104, 29, 'EXPORTACIÓN', 'rgba(139, 69, 19, 0.15)', '#5d4037'),
-- Contabilidad Panel - Etapas
('valuacion', 'functionality', 'contabilidad-panel', 1269, 471, 94, 27, 'VALUACIÓN', 'rgba(251, 188, 4, 0.15)', '#f57c00')
ON CONFLICT (element_id) DO NOTHING;

-- Insertar elementos del circuito (Funcionalidades - system)
INSERT INTO circuit_elements (element_id, type, panel_id, left_position, top_position, width, height, label, icon) VALUES
-- Trading Panel - Funcionalidades
('byma', 'system', 'trading-panel', 75, 311, 87, 31, 'BYMA', 'trading'),
('a3', 'system', 'trading-panel', 76, 405, 82, 29, 'A3', 'trading'),
('api-bo', 'system', 'trading-panel', 168, 426, 93, 29, 'API BO', 'link'),
('homebanking', 'system', 'trading-panel', 64, 154, 146, 31, 'HomeBanking', 'user'),
('siopel', 'system', 'trading-panel', 168, 383, 120, 30, 'Siopel', 'link'),
('bcra', 'system', 'trading-panel', 125, 492, 85, 27, 'BCRA', 'link'),
('alta-manual', 'system', 'trading-panel', 107.42, 71.41, 120, 30, 'Alta Manual', 'user'),
-- Middle Panel - Funcionalidades
('productos-financieros', 'system', 'middle-panel', 1106, 208, 145, 43, 'Productos\nFinancieros', 'link'),
('limites', 'system', 'middle-panel', 546, 134, 122, 30, 'Limites', 'lock'),
('revaluos-devengamientos', 'system', 'middle-panel', 1076.33, 556.33, 120, 30, 'Revalúos y Devengamientos', 'list'),
('custodias', 'system', 'middle-panel', 747, 364, 114, 30, 'Custodias', 'settings'),
('comprobantes', 'system', 'middle-panel', 557, 231, 120, 30, 'Comprobantes', 'file'),
('emails', 'system', 'middle-panel', 569, 294, 88, 30, 'Emails', 'mail'),
('cuentas', 'system', 'middle-panel', 750.42, 295.41, 120, 30, 'Cuentas', 'user'),
-- Backoffice Panel - Funcionalidades
('comisiones-impuestos', 'system', 'backoffice-panel', 1107, 337, 106, 29, 'Comisiones\nImpuestos', 'settings'),
('transmision-deb-cred', 'system', 'backoffice-panel', 959, 212, 133, 33, 'Transmisión\nDeb/Cred', 'link'),
('instrucciones-liq', 'system', 'backoffice-panel', 1123, 51, 120, 30, 'Instrucciones\nde Liquidación', 'file'),
('tenencias', 'system', 'backoffice-panel', 975, 95, 120, 30, 'Tenencias', 'list'),
('cuentas-inversores', 'system', 'backoffice-panel', 1268, 52, 120, 30, 'Cuentas\nInversores', 'link'),
('transferencias', 'system', 'backoffice-panel', 935.74, 345, 120, 32, 'Transferencias', 'list'),
('acreditaciones', 'system', 'backoffice-panel', 936, 385, 117, 30, 'Acreditaciones', 'dollar'),
('operaciones', 'system', 'backoffice-panel', 1096, 277, 120, 30, 'Operaciones', 'list'),
-- Interfaces Panel - Funcionalidades
('core-contable', 'system', 'interfaces-panel', 549, 473, 154, 32, 'Core Contable', 'file'),
('normativas', 'system', 'interfaces-panel', 599, 545, 120, 30, 'Normativas', 'file'),
('modelo-datos', 'system', 'interfaces-panel', 741, 548, 152, 29, 'Modelo de Datos', 'database'),
-- Contabilidad Panel - Funcionalidades
('asientos-contables', 'system', 'contabilidad-panel', 949, 496, 120, 30, 'Asientos Contables', 'database'),
('cotizaciones', 'system', 'contabilidad-panel', 1255, 526, 132, 29, 'Cotizaciones', 'link'),
('conciliacion-cv', 'system', 'contabilidad-panel', 960, 45, 120, 30, 'Conciliación CV', 'file'),
('nsc', 'system', 'contabilidad-panel', 1189, 121.33, 120, 30, 'Nuevo Sistema\nCustodia (NSC)', 'globe')
ON CONFLICT (element_id) DO NOTHING;

