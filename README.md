# Agenda de Equipos

> Aplicación web para que los equipos organicen su agenda y reserven recursos
> compartidos (salas, equipo, vehículos). Autenticación real, permisos por rol,
> invitación por código, tablero de indicadores, accesibilidad y pruebas
> automatizadas.

<!--
  Demo en vivo: el despliegue actual corresponde a una versión anterior.
  Descomenta esta línea cuando vuelvas a desplegar con los cambios recientes.

  **🔗 Demo en vivo:** https://agendofwork.vercel.app
-->

![Pantalla de acceso](docs/00__Login.view.webp)

---

## Credenciales de demo

Para explorar la app sin registrarte:

| Campo      | Valor                       |
| ---------- | --------------------------- |
| Correo     | `demo_usuario_26@demo.seed` |
| Contraseña | `Demo1234!`                 |

> Cuenta creada únicamente para demostración. Si prefieres que cada persona se
> registre por su cuenta, elimina esta sección.

---

## Características

- **Autenticación** con correo y contraseña, con mensajes de error traducidos al
  español y ambiguos a propósito por seguridad (no revelan si falló el correo o la
  contraseña).
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
- **Accesibilidad**: modales operables con teclado (Escape para cerrar) y
  anunciados correctamente por lectores de pantalla (`role="dialog"`, `aria-modal`,
  `aria-labelledby`).
- **Diseño adaptable (responsive)**: la barra lateral de escritorio se convierte en
  una barra inferior de navegación en móvil.
- **Pruebas automatizadas**: 23 pruebas con Vitest y Testing Library que cubren
  funciones puras, componentes y servicios (con Supabase simulado).

---

## Capturas

### Autenticación
| Acceso | Validación de credenciales |
|  :---: | :---: |
| ![Login](docs/00__Login.view.webp) | ![Validación de acceso](docs/10_Validation.01-Login.webp) |

### Equipos
| Mis equipos | Gestión y expulsión de miembros | Validación |
| :---: | :---: | :---: |
| ![Mis equipos](docs/03_Teams.join_view.webp) | ![Miembros](04-equipos-miembros.png) | ![Expulsar miembro](04-1-expulsar.png) |

### Calendario y eventos
| Calendario | Lista de eventos | Edición | Confirmación de borrado |
| :---: | :---: | :---: | :---: |
| ![Calendario](03-calendario.png) | ![Lista de eventos](03-1-lista-eventos.png) | ![Editar evento](03-2-editar.png) | ![Borrar evento](docs/03-3-borrar.png) |

### Estadísticas y recursos
| Tablero de estadísticas | Recursos del equipo |
| :---: | :---: |
| ![Estadísticas](docs/05-estadisticas.png) | ![Recursos](docs/06-recursos.png) |

### Diseño adaptable y temas
| Modo claro | Modo oscuro | Móvil (iPhone 16 Plus) | Tablet (iPad Pro) |
| :---: | :---: | :---: | :---: |
| ![Modo claro](docs/07-1-modo-claro.png) | ![Modo oscuro](docs/07-2-modo-oscuro.png) | ![Móvil](docs/07-3-movil.png) | ![Tablet](docs/07-4-tablet.png) |

> Las imágenes viven en la carpeta `docs/` del repositorio. Ajusta los nombres de
> archivo si guardaste las capturas con otros nombres.

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

**Pruebas**
- [Vitest](https://vitest.dev/) — motor de pruebas
- [Testing Library](https://testing-library.com/) — renderizado y consultas del DOM
- [jest-dom](https://github.com/testing-library/jest-dom) — matchers de accesibilidad

**Despliegue**
- [Vercel](https://vercel.com/) — build e integración continua desde GitHub

---

## Pruebas

El proyecto incluye 23 pruebas automatizadas que cubren todas las capas:

| Archivo                 | Qué prueba                                    |
| ----------------------- | --------------------------------------------- |
| `traslateErrors.test`   | Función pura: traducción de errores al español |
| `ConfirmDialog.test`    | Componente presentacional + interacción        |
| `Layout.test`           | Componente con contexto (React Router)         |
| `ThemeToggle.test`      | Componente con estado y efecto secundario      |
| `Skeleton.test`         | Componente de lista (conteo de elementos)      |
| `auth.service.test`     | Servicio con Supabase simulado (mock)          |
| `StatsPage.test`        | Contenedor con hijos aislados por mock         |

```bash
npm run test        # ejecuta la suite en modo observador
```

![Suite de pruebas](docs/tests-passing.png)

---

## Arranque local

```bash
# 1. Clonar e instalar
git clone https://github.com/dfntviu/Agend-OF-Work.git
cd Agend-OF-Work
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
  test/          configuración de Vitest + Testing Library
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
- **Accesibilidad por el elemento correcto:** se usan `<button>` y `<a>` reales (no
  `<div>` con `onClick`), que son operables por teclado por naturaleza. Los modales
  se cierran con Escape y se anuncian como diálogos a los lectores de pantalla.
- **Pruebas que aíslan la unidad:** cada prueba verifica una sola responsabilidad;
  las dependencias externas (Supabase, componentes hijos complejos) se simulan con
  mocks para que el resultado sea rápido, aislado y determinista.

---

## Autor

**Daniel Gómez Pérez** — Ingeniero en Computación (FI-UAEMéx), desarrollador Full-Stack.
Toluca, México · GitHub: [@dfntviu](https://github.com/dfntviu)

---

_Proyecto de portafolio. El código fue escrito a mano con fines de demostración técnica y arquitectónica._