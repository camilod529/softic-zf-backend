INSERT INTO tab_rol (id_rol, nombre_rol, descripcion_rol) VALUES
(1, 'Administrador', 'Rol de administrador'),
(3, 'Colaborador', 'Rol de colaborador'),
(2, 'Empresa', 'Rol de empresa');

INSERT INTO tab_usuario (nick, contrasena, rol, estado) VALUES
('usuario_admin', 'contraseña_admin', 1, TRUE), -- Rol de Administrador
('usuario_colaborador', 'contraseña_colaborador', 2, TRUE), -- Rol de Colaborador
('usuario_empresa', 'contraseña_empresa', 3, TRUE); -- Rol de Empresa

INSERT INTO tab_empresa (
	nit,
	nombre_empresa,
	estado_empresa,
	puntos
) VALUES (
	1,
	'Empresa 1',
	TRUE,
	0
);

INSERT INTO tab_colaborador (
  documento_colaborador,
  empresa_colaborador,
  nombre_1,
  nombre_2,
  apellido_1,
  apellido_2,
  genero,
  correo_empresarial,
  correo_personal,
  fecha_nacimiento,
  foto,
  estado_colaborador,
  puntos_acumulados
) VALUES (
  1234567890, -- Valor para documento_colaborador (cambia a tu valor deseado)
  1,           -- Valor para empresa_colaborador (cambia a tu valor deseado)
  'Nombre1',   -- Valor para nombre_1 (cambia a tu valor deseado)
  'Nombre2',   -- Valor para nombre_2 (cambia a tu valor deseado)
  'Apellido1', -- Valor para apellido_1 (cambia a tu valor deseado)
  'Apellido2', -- Valor para apellido_2 (cambia a tu valor deseado)
  'Masculino', -- Valor para genero (cambia a tu valor deseado)
  'correo_empresarial@example.com', -- Valor para correo_empresarial (cambia a tu valor deseado)
  'correo_personal@example.com',    -- Valor para correo_personal (cambia a tu valor deseado)
  '2000-01-01', -- Valor para fecha_nacimiento (cambia a tu valor deseado)
  'https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg', -- Valor para foto (cambia a tu valor deseado)
  TRUE,        -- Valor para estado_colaborador (cambia a tu valor deseado)
  0            -- Valor para puntos_acumulados (cambia a tu valor deseado)
);