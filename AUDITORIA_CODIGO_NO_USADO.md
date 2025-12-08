# 📋 AUDITORÍA DE CÓDIGO NO UTILIZADO

**Fecha:** $(date)  
**Objetivo:** Identificar componentes, hooks, utilidades, imágenes y código heredado de v0 que no se están utilizando en el proyecto.

---

## 🗺️ MAPA DE DEPENDENCIAS

### Páginas activas (`app/**/page.tsx`)
1. `app/page.tsx` (Landing)
   - Usa: `Hero`, `WorkTitle`, `FeaturedProjects`, `Footer`
2. `app/push/page.tsx`
   - Usa: `PushLayout`
3. `app/catalonia/page.tsx`
   - Usa: `CataloniaLayout`
4. `app/burger-king/page.tsx`
   - Usa: `BurgerKingLayout`
5. `app/rank-me-higher/page.tsx`
   - Usa: `RankLayout`
6. `app/rbi/page.tsx`
   - Usa: `RbiLayout`
7. `app/santalucia/page.tsx`
   - Usa: `DefaultCarouselLayout`
8. `app/talengo/page.tsx`
   - Usa: `TalengoLayout`

### Layout global (`app/layout.tsx`)
- Usa: `TopTicker`, `Navbar`, `ProjectProvider` (de `project-context`)

---

## ❌ COMPONENTES NO UTILIZADOS

### 1. `components/project-detail.tsx`
- **Ruta:** `components/project-detail.tsx`
- **Tipo:** Componente React
- **Razón:** Este componente era el router interno de layouts cuando los proyectos se abrían como overlays. Ahora cada proyecto tiene su propia página (`app/*/page.tsx`) que importa directamente el layout correspondiente. Este componente ya no se importa en ninguna parte.
- **Riesgo:** 🟡 **MEDIO** - Podría estar siendo usado dinámicamente o en rutas especiales, pero no encontré referencias. Verificar antes de borrar.
- **Dependencias:** Importa todos los layouts, pero estos ya se usan directamente desde las páginas.

### 2. `components/project-detail-panel.tsx`
- **Ruta:** `components/project-detail-panel.tsx`
- **Tipo:** Componente React (Panel deslizable)
- **Razón:** No se importa en ninguna página ni componente. Era parte del sistema antiguo de overlays.
- **Riesgo:** 🟢 **BAJO** - No hay referencias en el código.
- **Dependencias:** Usa `useApp` de `app-context` y `heroTools` de `tools-section`.

### 3. `components/secondary-projects.tsx`
- **Ruta:** `components/secondary-projects.tsx`
- **Tipo:** Componente React
- **Razón:** No se importa en ninguna página. Parece ser código de ejemplo o placeholder.
- **Riesgo:** 🟢 **BAJO** - No hay referencias.
- **Nota:** Contiene proyectos de ejemplo (Mobile Banking App, Brand Identity System, AI Chat Interface) que no existen en el proyecto real.

### 4. `components/about-section.tsx`
- **Ruta:** `components/about-section.tsx`
- **Tipo:** Componente React
- **Razón:** No se importa en ninguna página. Tiene un comentario que sugiere que podría estar en `components/ui/about-section.tsx`.
- **Riesgo:** 🟢 **BAJO** - No hay referencias.

### 5. `components/tools-section.tsx` (parcialmente no usado)
- **Ruta:** `components/tools-section.tsx`
- **Tipo:** Componente React + exportaciones
- **Razón:** 
  - ✅ `heroTools` (export) SÍ se usa en `project-detail-panel.tsx`
  - ❌ `ToolsSection` (componente) NO se usa en ninguna página
  - ❌ `ToolsRow` (componente) NO se usa en ninguna página
  - ❌ `tools` (export) NO se usa (solo se usa `heroTools`)
- **Riesgo:** 🟡 **MEDIO** - El archivo exporta `heroTools` que SÍ se usa, pero los componentes internos no. Podría limpiarse manteniendo solo `heroTools`.

### 6. `components/project-detail/layouts/BrandOverviewPush.tsx` (import no usado)
- **Ruta:** `components/project-detail/layouts/BrandOverviewPush.tsx`
- **Tipo:** Componente React
- **Razón:** Se importa en `BurgerKingLayout.tsx` (línea 7) pero **nunca se renderiza** en el JSX. Es un import huérfano.
- **Riesgo:** 🟢 **BAJO** - Solo es un import sin uso. El componente en sí SÍ se usa en `PushLayout.tsx`.

---

## 🪝 HOOKS Y CONTEXTOS NO UTILIZADOS

### 1. `hooks/useCarouselNavigation.ts`
- **Ruta:** `hooks/useCarouselNavigation.ts`
- **Tipo:** Hook personalizado
- **Razón:** ✅ **SÍ SE USA** en `DefaultCarouselLayout.tsx` (línea 7 y 49).
- **Estado:** ✅ **EN USO**

### 2. `hooks/use-mobile.ts` (DUPLICADO)
- **Ruta:** `hooks/use-mobile.ts`
- **Tipo:** Hook personalizado
- **Razón:** ✅ **SÍ SE USA** en `Navbar.tsx` y `sidebar.tsx`. Sin embargo, hay un **DUPLICADO** en `components/ui/use-mobile.tsx` con el mismo código. Debería consolidarse en uno solo.
- **Riesgo:** 🟡 **MEDIO** - No borrar, pero consolidar con el duplicado en `components/ui/use-mobile.tsx`.

### 3. `contexts/project-context.tsx` - `useProject`
- **Ruta:** `contexts/project-context.tsx`
- **Tipo:** Hook de contexto
- **Razón:** `ProjectProvider` SÍ se usa en `app/layout.tsx`, pero `useProject` **nunca se llama** en ningún componente.
- **Riesgo:** 🟡 **MEDIO** - El contexto está montado pero el hook no se usa. Podría ser código preparado para futuro uso.

### 4. `contexts/app-context.tsx` - `AppProvider`
- **Ruta:** `contexts/app-context.tsx`
- **Tipo:** Provider de contexto
- **Razón:** `AppProvider` se exporta pero **nunca se usa**. Solo `useApp` se usa en `project-detail-panel.tsx` (que tampoco se usa).
- **Riesgo:** 🟢 **BAJO** - Si `project-detail-panel.tsx` se borra, este contexto completo puede borrarse.

---

## 🖼️ IMÁGENES NO UTILIZADAS

### Imágenes de Push no referenciadas:
1. **`/app_push_escenario.png`** - No encontrada en código
2. **`/app_push_mapa_02.png`** - No encontrada (solo se usa `app_push_mapa_01.png`)

### Logos no utilizados:
3. **`/logo_catalonia_white.png`** - No encontrada en código

### SVG de números (posiblemente de v0):
4. **`/n_01.svg`** hasta **`/n_07.svg`** (7 archivos) - No encontrados en código

### Otras imágenes:
5. **`/arrow.svg`** - No encontrada en código (podría ser de v0)
6. **`/mockup_push.png`** en raíz - Hay un `mockup_push.png` en `/public` que SÍ se usa, pero verificar si el de la raíz es diferente

### Imágenes referenciadas pero posiblemente no existentes:
- Las imágenes en `secondary-projects.tsx` no existen en `/public`:
  - `/mobile-banking-app-design.jpg`
  - `/brand-identity-design-system.png`
  - `/ai-chat-interface-dark-mode.jpg`
- **`/caribe_catalonia.jpg`** - Referenciada en `lib/projects.ts` (línea 54) pero no existe en `/public`

---

## 📁 ARCHIVOS CON NOMBRES RELACIONADOS CON v0 O CARRUSEL

### Archivos que SÍ se usan:
- ✅ `components/project-detail/layouts/DefaultCarouselLayout.tsx` - Se usa en `app/santalucia/page.tsx`
- ✅ `components/project-detail/ui/CarouselArrows.tsx` - Se usa en `DefaultCarouselLayout.tsx`
- ✅ `hooks/useCarouselNavigation.ts` - Se usa en `DefaultCarouselLayout.tsx`

### Archivos que NO se usan:
- ❌ No encontré archivos con nombres explícitos de "v0" o "carousel" que no se usen.

---

## 🔍 ANÁLISIS DE RIESGO POR CATEGORÍA

### 🟢 RIESGO BAJO (Puede borrarse con seguridad)
- `components/project-detail-panel.tsx`
- `components/secondary-projects.tsx`
- `components/about-section.tsx`
- `contexts/app-context.tsx` (si se borra `project-detail-panel.tsx`)
- Import huérfano de `BrandOverviewPush` en `BurgerKingLayout.tsx`
- Imágenes: `/app_push_escenario.png`, `/app_push_mapa_02.png`, `/logo_catalonia_white.png`, `/n_01.svg` a `/n_07.svg`, `/arrow.svg`

### 🟡 RIESGO MEDIO (Verificar antes de borrar)
- `components/project-detail.tsx` - Podría estar siendo usado dinámicamente
- `components/tools-section.tsx` - Limpiar componentes internos pero mantener `heroTools`
- `hooks/use-mobile.ts` - Verificar si se usa (hay duplicado en `components/ui/`)
- `contexts/project-context.tsx` - `useProject` no se usa, pero `ProjectProvider` sí

### 🔴 RIESGO ALTO (NO BORRAR sin verificación exhaustiva)
- Ninguno identificado en esta auditoría.

---

## 📊 RESUMEN CUANTITATIVO

### Componentes React no utilizados: **5**
1. `project-detail.tsx`
2. `project-detail-panel.tsx`
3. `secondary-projects.tsx`
4. `about-section.tsx`
5. `ToolsSection` y `ToolsRow` (dentro de `tools-section.tsx`)

### Hooks no utilizados: **2**
1. `useProject` (exportado pero nunca llamado)
2. `AppProvider` (exportado pero nunca usado)

### Duplicados a consolidar: **1**
1. `hooks/use-mobile.ts` y `components/ui/use-mobile.tsx` (mismo código, ambos se usan)

### Imágenes no utilizadas: **~10-12**
- 2 imágenes de Push
- 1 logo
- 7 SVG (n_01 a n_07)
- 1-2 imágenes adicionales

### Imports huérfanos: **1**
- `BrandOverviewPush` en `BurgerKingLayout.tsx`

---

## ✅ RECOMENDACIONES

### Fase 1: Limpieza segura (Riesgo Bajo)
1. Eliminar `components/project-detail-panel.tsx`
2. Eliminar `components/secondary-projects.tsx`
3. Eliminar `components/about-section.tsx`
4. Eliminar import de `BrandOverviewPush` en `BurgerKingLayout.tsx`
5. Eliminar imágenes no referenciadas
6. Eliminar `contexts/app-context.tsx` (si se borra `project-detail-panel.tsx`)

### Fase 2: Verificación y limpieza (Riesgo Medio)
1. Verificar uso dinámico de `project-detail.tsx` (buscar en runtime o rutas especiales)
2. Limpiar `tools-section.tsx` manteniendo solo `heroTools`
3. **Consolidar duplicado:** Elegir entre `hooks/use-mobile.ts` o `components/ui/use-mobile.tsx` y eliminar el otro (ambos se usan actualmente)
4. Decidir si mantener `useProject` para futuro uso o eliminarlo
5. Verificar si `/caribe_catalonia.jpg` debe crearse o si la referencia en `lib/projects.ts` debe eliminarse

### Fase 3: Optimización
1. Revisar si `ProjectProvider` realmente necesita todo el contexto actual
2. Considerar eliminar `project-detail.tsx` si se confirma que no se usa

---

## 🔗 DEPENDENCIAS CRÍTICAS

### Componentes que SÍ se usan (NO BORRAR):
- ✅ Todos los layouts en `components/project-detail/layouts/`
- ✅ `components/home/*` (Hero, FeaturedProjects, ProjectCard)
- ✅ `components/layout/*` (Navbar, Footer)
- ✅ `components/project-detail/frames/*` (HeroFrame, InfoFrame)
- ✅ `components/project-detail/ui/*` (CarouselArrows, Sticker, BulletConfidencial)
- ✅ `components/ui/project-cta.tsx`
- ✅ `components/ui/layout-container.tsx`
- ✅ `components/TopTicker.tsx`
- ✅ `components/work-title.tsx`
- ✅ `components/theme-provider.tsx`

### Utilidades que SÍ se usan:
- ✅ `lib/projects.ts` - Usado extensivamente
- ✅ `lib/utils.ts` - Usado en múltiples componentes
- ✅ `lib/design-tokens.ts` - Se usa en `HeroFrame.tsx` (logoHeights)

---

**Fin del informe de auditoría**

