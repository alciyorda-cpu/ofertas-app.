# Ofertas App

App web en español para encontrar las mejores ofertas en **Amazon, eBay, Temu, Shein y Walmart**.

## Cómo funciona

- Escribe un producto en el buscador y pulsa **Comparar precios**: se genera el enlace de búsqueda a las 5 tiendas.
- Pulsa el botón grande **Ver ofertas de hoy** (también fijo abajo en el móvil) para abrir la página oficial de ofertas de cada tienda.
- Las tiendas no permiten sacar sus precios con una API libre, así que el precio real se compara en la tienda oficial.

## Usarla en el teléfono

1. Publica esta carpeta en GitHub Pages (Settings → Pages → Deploy from a branch → main).
2. Abre la URL en Chrome en Android.
3. Menú ⋮ → «Añadir a pantalla de inicio».

## APK (Android)

La carpeta `android/` es un proyecto WebView que carga la app publicada en GitHub Pages.

1. Crea el repositorio `ofertas-app` en GitHub y sube este código.
2. En `android/app/src/main/java/com/ofertasapp/MainActivity.kt` cambia `APP_URL` por tu URL de GitHub Pages.
3. El workflow `.github/workflows/build-apk.yml` compila la APK en cada push a `main`. Descárgala en Actions → Artifacts.

## Archivos

- `index.html`, `styles.css`, `app.js` — la app web
- `manifest.json`, `sw.js` — instalable como PWA
- `android/` — envoltorio Android (WebView)
- `.github/workflows/` — GitHub Pages y build de APK
