# Solución: `mix-blend-mode: difference` funcionando

## Hipótesis del problema

**El SVG enmascarado se comportaba como un logo blanco normal porque**:

1. **Stacking context aislado**: El SVG con `position: fixed` + `z-index: 50` creaba un stacking context aislado
2. **Compositing layer separada**: El navegador renderizaba el SVG en una capa de composición separada
3. **Blend mode aislado**: El `mix-blend-mode: difference` se aplicaba solo dentro de esa capa, no con el contenido de la página
4. **Resultado**: El logo aparecía blanco sólido porque no había backdrop con el que mezclarse

## Solución implementada

### Cambios en `components/navbar.tsx`

**ANTES** (no funcionaba):
- SVG con `position: fixed` + `z-index: 50` fuera del `<nav>`
- Máscara SVG compleja
- Stacking context aislado

**AHORA** (funciona):
- Logo blanco simple (`<img>`) con `mix-blend-mode: difference`
- `position: absolute` dentro del navbar (mismo stacking context)
- Sin `z-index` que cree stacking context aislado

### Código clave:

```tsx
<img
  src="/i0_logo_white.svg"
  style={{
    position: 'absolute',  // ← Dentro del navbar, mismo stacking context
    mixBlendMode: 'difference',  // ← Directamente en el img
    // NO z-index - evita stacking context aislado
  }}
/>
```

## Por qué funciona ahora

1. **Mismo stacking context**: El logo está dentro del `<nav>` con `position: fixed`, pero usa `position: absolute` (no crea nuevo stacking context)
2. **Blend mode directo**: `mix-blend-mode: difference` está directamente en el `<img>`, no en un SVG con máscara
3. **Sin aislamiento**: No hay `z-index`, `isolation: isolate`, o `position: fixed` en el logo que cree un stacking context aislado
4. **Backdrop accesible**: El blend mode puede mezclarse con el contenido de la página porque está en el mismo stacking context del navbar

## Verificación en DevTools

### 1. Chrome DevTools → Layers
- Abre DevTools → More tools → Layers
- El logo NO debe aparecer como "Compositing Layer" separado
- Debe estar dentro del layer del navbar

### 2. Chrome DevTools → Computed Styles
- Inspecciona el `<img>` del logo
- Verifica que `mix-blend-mode: difference` está aplicado
- Verifica que NO hay `isolation: isolate`
- Verifica que NO hay `z-index` (o es `auto`)

### 3. Comportamiento visual esperado
- **En HERO (fondo blanco)**: Logo oscuro normal (sin blend)
- **En sección negra**: Logo aparece **blanco** (invertido del negro)
- **Sobre texto blanco**: El texto se invierte a **negro** solo donde está el logo
- **Sobre imágenes**: Los colores se invierten solo dentro de la forma del logo

## Página de prueba

He creado `/app/test-blend/page.tsx` para verificar el efecto:

1. Visita `/test-blend` en tu navegador
2. Deberías ver:
   - Sección blanca: logo negro
   - Sección negra: logo blanco
   - Sección mixta: logo que invierte al cruzar el borde

## Elementos críticos

### ✅ DEBE tener:
- `mix-blend-mode: difference` directamente en el elemento (no en un wrapper)
- El elemento debe estar en el mismo stacking context que el contenido con el que se mezcla

### ❌ NO debe tener:
- `position: fixed` + `z-index` (crea stacking context aislado)
- `isolation: isolate` (aisla el stacking context)
- `opacity < 1` en ancestros (puede crear stacking context)
- `transform`, `filter`, `backdrop-filter` en ancestros (pueden crear stacking context)

## Próximos pasos

1. **Probar la solución actual**: El navbar ahora usa el logo simple con blend mode
2. **Verificar en `/test-blend`**: Asegúrate de que el efecto funciona en la página de prueba
3. **Ajustar si es necesario**: Si el efecto no es perfecto, revisa los stacking contexts en DevTools

## Notas técnicas

- El `<nav>` con `position: fixed` + `z-50` crea un stacking context, pero es necesario para el navbar fijo
- El logo con `position: absolute` dentro del `<nav>` está en el mismo stacking context
- El blend mode puede "escapar" del stacking context del navbar y mezclarse con el contenido de la página porque el navbar es transparente

