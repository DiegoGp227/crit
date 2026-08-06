# Cambios acordados para el sistema de puntuación y gestión de carreras

## Filosofía del sistema

* El sistema **no calcula los puntos**.
* El administrador es quien define manualmente la puntuación en el Excel.
* La aplicación únicamente valida, almacena los datos y genera la clasificación general.

---

# RaceDate

* Se elimina `roundNumber`.
* El identificador visible de la carrera será el `id`.
* Una carrera solo tendrá:

  * `id`
  * `raceDate`
  * `status`
* No existe un título para la carrera.

Estados:

* `SCHEDULED`
* `FINISHED`
* `POSTPONED`
* `CANCELLED`

Si una carrera se aplaza (`POSTPONED`):

* No otorga puntos.
* Permanece en el historial.
* No se renumeran las carreras.
* Si los organizadores desean recuperar esa fecha, simplemente crean una nueva carrera.

---

# Result

Agregar:

* `status`

```text
PRESENT
ABSENT
```

Los puntos pueden ser:

* positivos
* cero
* negativos

El sistema nunca interpreta los puntos.

Ejemplos válidos:

```text
20
15
0
-5
-20
```

---

# Flujo de creación de una carrera

Administrador:

1. Crea una carrera.
2. Define únicamente:

   * Fecha.
   * Estado inicial (`SCHEDULED`).
3. Guarda.

Después podrá descargar el Excel correspondiente.

---

# Descarga del Excel

El Excel debe contener una fila por cada corredor inscrito.

Columnas visibles:

* Dorsal
* Nombre
* Equipo
* Asistencia
* Puntos

Además incluirá una columna **oculta**:

* `profileId`

El `profileId` será el identificador interno utilizado para actualizar los resultados.

El administrador solo debe modificar:

* Asistencia.
* Puntos.

No debe modificar ninguna otra columna.

---

# Carga del Excel

Al subir el archivo:

1. Validar completamente el Excel.
2. Si existe cualquier error, no guardar absolutamente nada.
3. Si todo es válido:

   * eliminar todos los resultados existentes de esa carrera;
   * insertar nuevamente todos los resultados del archivo.

El Excel pasa a ser la fuente de verdad para esa carrera.

---

# Validaciones estrictas

Rechazar el archivo si ocurre cualquiera de estas situaciones:

* Corredor inexistente.
* `profileId` inexistente.
* Corredor duplicado.
* Filas eliminadas.
* Filas adicionales.
* Asistencia vacía.
* Puntos vacíos.
* Formato inválido.

El backend debe devolver mensajes claros indicando la fila y el motivo del error.

---

# Clasificación general

No existirá una tabla de clasificación.

La clasificación se calculará dinámicamente consultando la tabla `Result`.

La consulta consistirá en sumar los puntos por corredor y ordenar de mayor a menor.

Dado el volumen esperado (menos de 100 corredores y pocas decenas de carreras), PostgreSQL puede realizar este cálculo sin problemas, incluso ejecutándose sobre una Raspberry Pi 5.

Como optimización sencilla, el backend puede mantener la clasificación en memoria durante un corto período (por ejemplo, 60 segundos). Cada vez que se suba un nuevo Excel, esa caché se invalida para que la siguiente consulta recalcule automáticamente la clasificación.

---

# Reglas del campeonato

* Un corredor puede inscribirse a mitad de temporada.
* Comienza con 0 puntos.
* Si deja de asistir, permanece en la clasificación.
* Puede seguir acumulando penalizaciones (puntos negativos).
* Las categorías no cambian una vez iniciado el campeonato (ya está controlado por otra parte del sistema).
