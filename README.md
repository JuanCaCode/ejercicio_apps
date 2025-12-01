# Prototipo Brontobyte (Vanilla)

Pequeño prototipo con HTML, CSS y JS vanilla que recrea las vistas: Login, Menú vertical, Consulta por placa, detalle de Manifiesto y vista de Éxito.

## Paleta

- Primary: `#64D199`
- Secondary: `#00A1BC`
- Background oscuro: `#051B2B`

## Estructura

- `index.html`: shell principal con navbar y contenedor `#app`
- `assets/css/styles.css`: tema, componentes y estilos
- `assets/js/app.js`: router hash y lógica simple de cada vista

## Ejecutar

Abrir `index.html` en el navegador (doble clic) o usar un servidor simple:

```bash
# en Windows con bash.exe
python -m http.server 8080
# luego visitar http://localhost:8080
```

## Navegación

- Login → Menú al presionar "Continuar" con datos.
- Menú → "Programación y Eventos en la Ruta" envía a Consulta.
- Consulta → ingresar placa y "Consultar" abre Manifiesto.
- Manifiesto → completar tiempos y "Reportar tiempos" abre Éxito.
- Éxito → "Volver" regresa al Menú.
