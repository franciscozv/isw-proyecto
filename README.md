La api tiene como objetivo organizar las cuadrillas de brigadistas de una empresa llamada CEF (contra el fuego). Los brigadistas son seleccionados a través de un proceso de postulación.

Habitualmente cada brigada cuenta con un jefe, dos jefes de cuadrilla y dos cuadrillas de alrededor de siete hombres cada una

Luego de ser aprobados en el proceso de postulación, son asignados a una cuadrilla de trabajo. Hay distintos cargos dentro de la cuadrilla.
- Jefe de cuadrilla
- Operador de motobomba
- Operador de motosierra
- Combatiente
- Encargado de primeros auxilios
- Asistente de primeros auxilios
- Encargado de herramientas
- Ayudante de herramientas
- Radioperador

De los brigadistas se guarda:
- Rut
- Nombre
- Edad
- Dirección
- Teléfono
- Teléfono de familiares (en caso de emergencia)
- Correo
- Capacitaciones (1 o más)
- Antecedentes de salud.

De los postulantes además se guarda o se pide:
- Rut
- Nombre
- Edad
- Dirección
- Teléfono
- Correo
- Capacitaciones (1 o más)
- Antecedentes de salud.
- Escolaridad
- Certificado de Antecedentes
- Aprobar una evaluación de la ACHS

Cuando un postulante queda seleccionado como brigadista, se crea una instancia del modelo Brigadista y se copian los datos relevantes del postulante. Luego de ello se elimina la instancia del postulante para evitar la duplicidad de datos y el almacenar datos redundantes

