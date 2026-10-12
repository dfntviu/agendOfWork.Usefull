# Agenda de Equipos

> Aplicación web para que los equipos organicen su agenda y reserven recursos
> compartidos (salas, equipo, vehículos). Autenticación real, permisos por rol,
> invitación por código y tablero de indicadores.

**🔗 Demo en vivo:** https://agendofwork.vercel.app

<!--
  Capturas (recomendado): sube las imágenes a una carpeta /docs del repo
  y descomenta estas líneas. Una captura sube muchísimo la primera impresión.

  ![Pantalla de acceso](docs/login.png)
  ![Calendario del equipo](docs/calendar.png)
  ![Tablero de estadísticas](docs/dashboard.png)
-->

---

## Credenciales de demo

Para explorar la app sin registrarte:

| Campo       | Valor                        |
| ----------- | ---------------------------- |
| Correo      | `demo@____`  ⟵ _completar_   |
| Contraseña  | `________`   ⟵ _completar_   |

> _Crea una cuenta nueva solo para demostración (no uses una cuenta personal) y
> coloca aquí sus datos antes de compartir el repositorio. Si prefieres que la
> gente se registre por su cuenta, elimina esta sección._

---

## Características

- **Autenticación** con correo y contraseña, con mensajes de error en español.
- **Equipos**: crear, unirse por código de invitación y gestión de miembros.
- **Roles y permisos** (`owner`, `admin`, `member`), aplicados en la interfaz y
  reforzados en la base de datos mediante seguridad a nivel de fila (RLS).
- **Recursos** por equipo (salas, equipo, vehículos y otros).
- **Eventos**: creación y edición con validación, reserva de un recurso y
  asignación a un miembro del equipo.
- **Calendario** mensual con los eventos del equipo y el día actual resaltado.
- **Tablero de indicadores** con una gráfica de eventos por recurso (Chart.js).
- **Experiencia de uso**: confirmación antes de acciones destructivas, estados de
  carga con siluetas (skeletons), dos temas (claro y oscuro) y transiciones suaves.

---

## Stack

**Front-end**
- [Vite](https://vitejs.dev/) · [React](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) — ruteo
- [TanStack Query](https://tanstack.com/query) — estado de servidor y caché
- [Chart.js](https://www.chartjs.org/) — gráficas del tablero

**Back-end (BaaS)**
- [Supabase](https://supabase.com/) — PostgreSQL, Auth y API
  - **RLS** (Row Level Security) en cada tabla
  - **Triggers** y **funciones** (`security definer`) para la lógica de pertenencia
  - **RPC** para operaciones atómicas (unirse a un equipo por código)

**Despliegue**
- [Vercel](https://vercel.com/) — build e integración continua desde GitHub

---

## Arranque local

```bash
# 1. Clonar e instalar
git clone https://github.com/dfntviu/agendofwork.git   # ⟵ ajusta el nombre del repo si difiere
cd agendofwork
npm install

# 2. Configurar variables de entorno (ver siguiente sección)
cp .env.example .env.local
# edita .env.local con los valores de tu proyecto Supabase

# 3. Desarrollo
npm run dev

# 4. Compilar para producción
npm run build
```

Requisitos: Node.js 18+ y un proyecto de Supabase.

---

## Variables de entorno

Crea un archivo `.env.local` en la raíz con:

```env
VITE_SUPABASE_URL=https://TU_PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica
```

> **Seguridad:** solo la clave **pública** (anon / publishable) se usa en el
> front-end; está protegida por RLS. La clave **secreta** (service_role) nunca se
> incluye en el código, el repositorio ni el despliegue. Los archivos `.env*` están
> en `.gitignore`.

---

## Estructura

```
src/
  components/    componentes de UI (formularios, modales, gráficas, skeletons)
  routes/        páginas (equipos, calendario, tablero, recursos, acceso)
  services/      acceso a datos — una función por operación de Supabase
  hooks/         hooks de datos sobre TanStack Query
  helpers/       utilidades (traducción de errores de la base al español)
  context/       contexto de autenticación
  styles/        sistema de temas (tokens CSS para claro y oscuro)
  types/         tipos de TypeScript generados desde el esquema de Supabase
```

El acceso a datos está aislado en la capa de **servicios**: los componentes no
hablan con Supabase directamente, sino a través de funciones con nombre claro.

---

## Decisiones de diseño

- **La base guarda identificadores; la interfaz muestra nombres.** Se usa un patrón
  de diccionario (`{ id: nombre }`) para traducir en pantalla sin exponer IDs.
- **Validación en dos frentes:** la interfaz guía, pero la integridad real la
  garantiza la base (restricciones y RLS). Los errores de la base se traducen a
  mensajes en español legibles mediante un helper central reutilizable.
- **Sistema de temas con tokens:** los colores se definen una sola vez como
  variables CSS; el modo oscuro solo las redefine. Ningún componente usa un color
  directo.
- **Estado de servidor con TanStack Query:** caché, estados de carga y conservación
  de datos previos durante las actualizaciones, para transiciones sin parpadeos.

---

## Autor

**Daniel Gómez** — Ingeniero en Computación (FI-UAEMéx), desarrollador front-end.
Toluca, México · GitHub: [@dfntviu](https://github.com/dfntviu)

---

_Proyecto de portafolio. El código se escribió a mano con fines de aprendizaje._