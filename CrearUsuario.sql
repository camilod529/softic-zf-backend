INSERT INTO tab_empresa (
	nit,
	nombre_empresa
) VALUES (
	'11313',
	'Softic'
);

INSERT INTO tab_colaborador (
	documento_colaborador,
	empresa_colaborador,
	nombre_1,
	apellido_1,
	genero,
	correo_personal,
	fecha_nacimiento,
	foto
) VALUES (
	'1231241241',
	'11313',
	'Camilo',
	'Durán',
	'Masculino',
	'camilo@gmail.com',
	'2023-10-18T20:04:54.491Z',
	'https://img.freepik.com/foto-gratis/joven-confiado_1098-20868.jpg'
);

INSERT INTO tab_rol (
	id_rol,
	nombre_rol,
	descripcion_rol
) VALUES (
	1,
	'Administrador',
	'Rol para Zona Franca'
),
(
	2,
	'Empresa',
	'Rol para las empresas registradas'
),
(
	3,
	'Colaborador',
	'Rol para colaboradores'
);

INSERT INTO tab_usuario (
	nick,
	contrasena,
	rol
) VALUES (
	'1',
	'12345',
	1
),
(
	'11313',
	'12345',
	2
),
(
	'1231241241',
	'12345',
	3
);