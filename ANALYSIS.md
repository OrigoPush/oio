# Análisis: Por qué `mix-blend-mode: difference` no funciona

## Teoría: Cómo debería funcionar `mix-blend-mode: difference`

### Caso simple (funciona en CodePen):
```html
<div style="background: black; height: 200px;">
  <div style="background: white; mix-blend-mode: difference; height: 100px;">
    <!-- Este div invierte el fondo negro → aparece blanco -->
  </div>
</div>
```

**Regla clave**: `mix-blend-mode` mezcla el elemento con su **backdrop** (todo lo que está detrás en el mismo stacking context).

### Fórmula de `difference`:
```
result = |backdrop - source|
```
- Fondo negro (0,0,0) + fuente blanca (1,1,1) = |0-1| = **blanco (1,1,1)** ✓
- Fondo blanco (1,1,1) + fuente blanca (1,1,1) = |1-1| = **negro (0,0,0)** ✓

---

## Problema en tu implementación actual

### Stacking Context Aislado

Tu SVG tiene:
```tsx
<svg style={{
  position: 'fixed',  // ← Crea stacking context
  zIndex: 50,        // ← Crea stacking context aislado
  ...
}}>
  <rect style={{ mixBlendMode: 'difference' }} />
</svg>
```

**El problema**: Un elemento con `position: fixed` + `z-index` crea un **stacking context aislado**. El blend mode solo puede mezclarse con elementos dentro del mismo stacking context o con el backdrop inmediato.

Cuando el SVG está en su propio stacking context aislado (por `position: fixed` + `z-index`), el navegador puede:
1. Renderizar el SVG en una capa separada (compositing layer)
2. Aplicar el blend mode solo dentro de esa capa
3. **NO mezclarlo con el contenido de la página** que está en otro stacking context

### Verificación en DevTools

1. **Chrome DevTools → Layers Panel**:
   - Busca el SVG en la lista de layers
   - Si aparece como "Compositing Layer" separado → el blend está aislado

2. **Chrome DevTools → Rendering → Paint flashing**:
   - Si el SVG se pinta en una capa separada, el blend no puede alcanzar el contenido de la página

3. **Computed styles del SVG**:
   - Verifica si hay `isolation: isolate` implícito
   - Verifica si `will-change` está activo (crea compositing layer)

---

## Causas específicas en tu código

### 1. SVG con `position: fixed` + `z-index: 50`
```tsx
<svg style={{
  position: 'fixed',  // ← Stacking context
  zIndex: 50,        // ← Stacking context aislado
}}>
```
**Solución**: Eliminar `z-index` o usar `z-index: auto` si es posible.

### 2. Máscara SVG puede crear compositing layer
El uso de `<mask>` puede forzar al navegador a renderizar el SVG en una capa separada.

### 3. `opacity` en el SVG
```tsx
style={{ opacity, ... }}
```
`opacity < 1` puede crear un stacking context aislado.

### 4. Body/HTML con background
Si `body` tiene `background-color`, puede interferir con el blend.

---

## Soluciones propuestas

### Solución A: Sin máscara, SVG directo

**Ventaja**: Más simple, menos stacking contexts.

**Implementación**:
- Usar el logo SVG blanco directamente
- Aplicar `mix-blend-mode: difference` al SVG o a un contenedor simple
- Sin `position: fixed`, usar `position: absolute` dentro del navbar (mismo stacking context)

### Solución B: Prueba mínima primero

**Ventaja**: Verificar que el blend funciona antes de integrar.

**Implementación**:
- Crear una página de prueba con fondo blanco/negro
- Logo simple con `mix-blend-mode: difference`
- Verificar que invierte correctamente
- Luego integrar en el navbar

---

## Hipótesis del problema actual

**El SVG enmascarado se comporta como un logo blanco normal porque**:

1. El SVG está en un **stacking context aislado** (por `position: fixed` + `z-index: 50`)
2. El navegador renderiza el SVG en una **compositing layer separada**
3. El `mix-blend-mode: difference` se aplica **dentro de esa capa**, no con el contenido de la página
4. El resultado visual es equivalente a un logo blanco normal porque no hay backdrop con el que mezclarse

**Evidencia**:
- La máscara funciona (solo se ve la forma del logo) ✓
- El blend mode está aplicado (visible en DevTools) ✓
- Pero no invierte el fondo/texto ✗
- Esto indica que el blend está aislado en su propia capa

---

## Verificación en DevTools

### Chrome DevTools → Layers
1. Abre DevTools → More tools → Layers
2. Busca el SVG en la lista
3. Si aparece como "Compositing Layer" → problema confirmado

### Chrome DevTools → Rendering
1. Abre DevTools → More tools → Rendering
2. Activa "Layer borders"
3. Si el SVG tiene un borde de capa separado → problema confirmado

### Computed Styles
1. Inspecciona el SVG
2. Busca `isolation` en computed styles
3. Si es `isolate` → problema confirmado

