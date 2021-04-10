# Simple CRUD

**Simple CRUD** es una aplicación web SPA que tiene como objetivo permitir a un usuario llevar un control de sus recibos. Los usuarios pueden ingresar el monto del recibo, comentarios, y elegir la moneda y el proveedor relacionado a cada uno.

Se cuentan con dos roles en la aplicación:

- **Usuario**: Tiene acceso a la página de Recibos y Perfil. Puede solamente dar de alta, editar y eliminar recibos.
- **Administrador**: Tiene acceso a la página de Recibos, Usuarios, Catálogos y Perfil. Además de poder manejar recibos, los administradores pueden agregar, editar y eliminar usuarios, proveedores, y monedas.

## URL de la aplicación

*Pending*

**NOTA**: La primera vez, el login puede tardar un poco en cargar (10 segundos aprox.). Esto es debido a que la aplicación en Azure se encuentra inhabilitada cuando no se está usando. Es una limitación del plan gratuito.

## Tecnologías y dependencias utilizadas

- **React JS**: Librería utilizada para el desarrollo del front-end.
- **Azure Storage**: La aplicación se encuentra hosteada en los servidores de Azure. Se decidió utilizar Azure Storage en vez de App Services debido a que es un sitio web estático.
- **Bootstrap 4.4**: Se utilizó este framework de CSS para la UI y el diseño responsive de la aplicación.
- **JQuery**: JQuery fue utilizado principalmente para manejar componentes de Bootstrap manualmente.
- **MDB Datatable**: MDB es un kit de componentes de UI. En esta aplicación, utilizamos el componente Datatable para mostrar los datos y brindar la funcionalidad de búsqueda y paginación de manera rápida.
- **Validation.js**: Se utilizó para validar fácilmente los inputs del usuario, con reglas como: es email, es valor numérico, etc.
- **Axios**: Axios fue utilizado para realizar las llamadas al WebAPI y manejar los promises fácilmente.
- **Font Awesome**: Todos los íconos variados que podemos encontrar en la aplicación son parte de esta librería de CSS.
- **Moment.js**: Se utilizó para dar formato de fecha en algunas tablas.

## Reglas y validaciones

- Todos los campos son requeridos.
- Nombres y teléfonos de catálogos pueden ser números o letras.
- Los teléfonos son de máx. 10 caracteres.
- Los administradores no pueden editar ni eliminar su propio usuario.
- No se pueden registrar ni editar proveedores, monedas ni usuarios con un nombre ya existente.
- Únicamente los administradores tienen acceso a las páginas de Usuarios y Catálogos.
- Para resetear la contraseña, el correo del usuario debe ser real debido a que se envía un correo de parte de Firebase.
- Al eliminar un proveedor o moneda, los recibos ligados a esos objetos permanecen ligados hasta el momento de editarlos.
- Ningún eliminado es físico. El registro permanecerá en la base de datos como "inactivo". Si después se vuelve a insertar un registro de proveedores o monedas con la misma información, se reactivará el existente y retornará el mismo ID.
