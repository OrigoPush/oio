# 🔍 FASE 2 - DIFFS PROPUESTOS (ANTES DE EJECUTAR)

Este documento muestra todos los cambios que se aplicarán en la Fase 2 de limpieza.

---

## 1. ✅ ELIMINAR `components/project-detail.tsx`

### Análisis:
- **Estado:** NO se importa en ningún archivo activo
- **Razón:** Era el router interno de overlays. Ahora cada proyecto tiene su propia página que importa directamente el layout.
- **Riesgo:** 🟢 BAJO - Confirmado que no se usa

### Diff:
```
❌ ELIMINAR ARCHIVO COMPLETO:
   components/project-detail.tsx (289 líneas)
```

### Impacto:
- Ninguno. El archivo no se importa en ningún lugar.

---

## 2. ✅ ELIMINAR `components/tools-section.tsx` COMPLETO

### Análisis:
- **heroTools:** NO se usa (solo se usaba en `project-detail-panel.tsx` que ya eliminamos)
- **ToolsSection:** NO se usa
- **ToolsRow:** NO se usa
- **tools:** NO se usa
- **Riesgo:** 🟢 BAJO - Confirmado que nada se usa

### Diff:
```
❌ ELIMINAR ARCHIVO COMPLETO:
   components/tools-section.tsx (150 líneas)
```

### Impacto:
- Ninguno. Ninguna exportación se usa en el código activo.

---

## 3. ✅ CONSOLIDAR `use-mobile` - Eliminar duplicado

### Análisis:
- **`hooks/use-mobile.ts`:** ✅ SE USA en:
  - `components/layout/Navbar.tsx` (línea 7)
  - `components/ui/sidebar.tsx` (línea 8)
- **`components/ui/use-mobile.tsx`:** ❌ NO SE USA en ningún lugar
- **Riesgo:** 🟢 BAJO - Solo eliminamos el duplicado no usado

### Diff:
```
❌ ELIMINAR ARCHIVO:
   components/ui/use-mobile.tsx (20 líneas)

✅ MANTENER:
   hooks/use-mobile.ts (se usa en Navbar y sidebar)
```

### Impacto:
- Ninguno. El archivo eliminado no se importa en ningún lugar.

---

## 4. ⚠️ ANALIZAR `contexts/project-context.tsx`

### Análisis:
- **ProjectProvider:** ✅ SE USA en `app/layout.tsx` (línea 7, 58)
- **useProject:** ❌ NO SE USA en ningún componente
- **Riesgo:** 🟡 MEDIO - El Provider se usa pero el hook no

### Opciones:

#### Opción A: Mantener todo (recomendado)
- Mantener `ProjectProvider` y `useProject` por si se necesita en el futuro
- No hacer cambios

#### Opción B: Simplificar (eliminar useProject)
Si decidimos eliminar `useProject`:

**Diff propuesto:**
```diff
--- a/contexts/project-context.tsx
+++ b/contexts/project-context.tsx
@@ -48,10 +48,3 @@ export function ProjectProvider({ children }: { children: ReactNode }) {
     </ProjectContext.Provider>
   )
 }
-
-export function useProject() {
-  const context = useContext(ProjectContext)
-  if (context === undefined) {
-    throw new Error('useProject must be used within a ProjectProvider')
-  }
-  return context
-}
```

**Impacto:**
- Ninguno inmediato (useProject no se usa)
- Si en el futuro se necesita, habría que recrearlo

### Recomendación:
**MANTENER TODO** - El contexto está montado y puede ser útil en el futuro. El código no molesta.

---

## 5. 🔍 IMÁGENES NO REFERENCIADAS

### Análisis completo realizado ✅

### Imágenes que NO se encontraron en el código:

1. **`i0_logo_black.svg`** - NO ENCONTRADA
2. **`i0_logo_dark.svg`** - NO ENCONTRADA
3. **`i0_logo_light.svg`** - NO ENCONTRADA
4. **`i0_logo_white.svg`** - NO ENCONTRADA
5. **`logo_i0_full.svg`** - NO ENCONTRADA
6. **`catalonia_banner.png`** - NO ENCONTRADA (solo se usan las versiones numeradas: _01, _02, _03, _04)

### Diff propuesto:
```
❌ ELIMINAR IMÁGENES:
   public/i0_logo_black.svg
   public/i0_logo_dark.svg
   public/i0_logo_light.svg
   public/i0_logo_white.svg
   public/logo_i0_full.svg
   public/catalonia_banner.png
```

### Impacto:
- Ninguno. Estas imágenes no se referencian en ningún archivo del código.

### Nota:
- `logo_i0_mask.svg` SÍ se usa (en Navbar)
- Todas las demás imágenes están referenciadas y se usan activamente

---

## 6. 🧹 LIMPIEZA DE IMPORTS HUÉRFANOS

### Después de eliminar archivos, verificar:
- Imports de `project-detail.tsx` (no debería haber)
- Imports de `tools-section.tsx` (no debería haber)
- Imports de `components/ui/use-mobile.tsx` (no debería haber)

### Diff:
```
(Se mostrará después de verificar imports huérfanos)
```

---

## 📊 RESUMEN DE CAMBIOS PROPUESTOS

### Archivos TSX/TS a ELIMINAR (confirmados):
1. ✅ `components/project-detail.tsx` - 289 líneas
2. ✅ `components/tools-section.tsx` - 150 líneas
3. ✅ `components/ui/use-mobile.tsx` - 20 líneas

### Imágenes a ELIMINAR (confirmadas):
4. ✅ `public/i0_logo_black.svg`
5. ✅ `public/i0_logo_dark.svg`
6. ✅ `public/i0_logo_light.svg`
7. ✅ `public/i0_logo_white.svg`
8. ✅ `public/logo_i0_full.svg`
9. ✅ `public/catalonia_banner.png`

### Archivos a MANTENER (pero analizar):
10. ⚠️ `contexts/project-context.tsx` - **RECOMENDACIÓN: MANTENER TODO** (ProjectProvider se usa, useProject puede ser útil en el futuro)

### Total:
- **Líneas de código a eliminar:** ~459 líneas
- **Archivos a eliminar:** 3 archivos TSX/TS + 6 imágenes = **9 elementos**

---

## ⚠️ IMPORTANTE

**NO SE HA EJECUTADO NADA AÚN**

Todos estos cambios están pendientes de tu confirmación.

¿Procedo con la eliminación de los 3 archivos confirmados?

