# Goal Labs — Software de Videoanálisis Táctico para Fútbol

**Goal Labs** es una aplicación de escritorio gratuita para Windows que permite a entrenadores, analistas y scouts analizar video táctico de fútbol. Tagueá eventos en tiempo real con hotkeys configurables, dibujá sobre el video con un telestrator, verificá posiciones de offside con corrección de perspectiva, y exportá clips MP4 o estadísticas CSV en minutos. Funciona 100% offline.

---

## Descargar

**[→ Descargar Goal Labs para Windows (.exe)](../../releases/latest)**

> La primera vez que abrís el instalador, Windows puede mostrar una advertencia de SmartScreen. Hacé click en "Más información" → "Ejecutar de todas formas". Es normal para apps nuevas sin firma de código extendida.

---

## Funcionalidades

- **Tagging táctico con hotkeys** — configurá una tecla por evento y tagueá sin pausar el video
- **Telestrator con 11 herramientas** — flechas, zonas, líneas, spotlight, texto y más, con animación cuadro a cuadro
- **Verificador de offside** — corrección de perspectiva por homografía, el mismo principio que usa el VAR profesional
- **Estadísticas automáticas** — distribución por tipo de evento, duración, heatmap temporal y métricas por jugador
- **Exportación múltiple** — clips MP4 (via FFmpeg nativo), CSV, JSON y XML para Final Cut Pro / DaVinci Resolve / Premiere
- **IA integrada (Gemini)** — generación de tags desde lenguaje natural, análisis de patrones y sugerencia de notas
- **Análisis de LPF Play** — descargá y analizá el stream de LPF Play directamente desde la app
- **Funciona 100% offline** — el tagging, telestrator, offside y exportación no requieren internet

---

## ¿Para quién es Goal Labs?

- **Entrenadores (DTs)** que necesitan clips tácticos para el pizarrón del entrenamiento siguiente
- **Analistas de rendimiento** que trabajan con flujo rápido: video → tags → playlist → exportación a Premiere o DaVinci
- **Scouts** que registran jugadores partido a partido y necesitan organizar las secuencias por categoría
- **Directores de academia** que quieren estandarizar el análisis en todas las categorías del club

---

## Cómo empezar

1. Descargá e instalá Goal Labs desde el link de arriba
2. Abrí la app y hacé click en **Nuevo Proyecto**
3. Seleccioná el video del partido (MP4, MKV, MOV, AVI y más)
4. Configurá tus tags con las teclas que quieras (o usá los 8 predefinidos)
5. Reproducí el video y apretá la tecla correspondiente cada vez que ocurre un evento

Tiempo promedio para tagguear un partido completo de 90 minutos: **45 a 90 minutos**.

---

## Requisitos del sistema

- **Sistema operativo:** Windows 10 / 11 (64 bits)
- **RAM:** 4 GB mínimo, 8 GB recomendado
- **Almacenamiento:** 200 MB para la app + espacio para los videos
- **Internet:** No requerido (solo para IA y sincronización cloud)

---

## Alternativa gratuita a Nacsport, Hudl y LongoMatch

| Criterio | Goal Labs | Nacsport | Hudl |
|----------|-----------|---------|------|
| Precio | Gratuito | EUR 700–2.000/año | USD 2.000+/año |
| Idioma | Español nativo | Traducción | Inglés |
| Offside con perspectiva | Sí | No | No |
| IA integrada | Sí (Gemini) | No | Parcial |
| Funciona offline | Sí | Sí | No |
| Curva de aprendizaje | Baja | Alta | Media |
| Mercado objetivo | Latinoamérica | Europa | Global |

---

## Preguntas frecuentes

**¿Goal Labs es realmente gratis?**
Sí. El análisis básico es gratuito sin límite de proyectos ni de tiempo. Incluye tagging, telestrator, verificador de offside, estadísticas, y exportación MP4 y CSV. Un plan Pro con colaboración cloud está en roadmap, pero el núcleo siempre será gratuito.

**¿Con qué formatos de video funciona?**
Goal Labs abre cualquier formato que soporte el reproductor nativo: MP4, MKV, MOV, AVI y más. Para exportar clips usa FFmpeg nativo, que soporta prácticamente cualquier formato estándar.

**¿Funciona sin internet?**
Sí. El tagging, telestrator, verificador de offside, estadísticas y exportación de clips funcionan completamente offline. La IA (Gemini) requiere conexión solo si la usás activamente.

**¿Está disponible para Mac o Linux?**
Por ahora solo para Windows. Mac y Linux están en el roadmap.

**¿Por qué Windows muestra una advertencia al instalar?**
Es normal para aplicaciones nuevas sin firma de código extendida (EV Code Signing). La app es segura. Para continuar: "Más información" → "Ejecutar de todas formas".

---

## Desarrollado por

**Nacho Liporace** — jugador de fútbol y programador. Goal Labs nació de la necesidad de analizar partidos sin pagar licencias de EUR 1.000/año por herramientas diseñadas para clubes europeos de primera división.

*Versión actual: 1.0.10 — Windows 10/11 — Última actualización: mayo 2026*
