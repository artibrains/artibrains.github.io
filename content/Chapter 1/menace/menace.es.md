---
title: "1.5 MENACE: La Máquina de Aprendizaje con Cajas de Cerillas"
description: "Explora MENACE, la computadora mecánica de los años 60 hecha con cajas de cerillas que aprendió a jugar al tres en raya mediante aprendizaje por refuerzo."
date: 2023-10-28
weight: 52
slug: "menace-maquina-aprendizaje-cerillas"
---

## Introducción

MENACE (Machine Educable Noughts And Crosses Engine, o Máquina Educable para el Juego del Tres en Raya) fue una computadora mecánica construida en 1961 por Donald Michie, un investigador pionero en inteligencia artificial. Esta notable máquina, construida con 304 cajas de cerillas y cuentas de colores, podía aprender a jugar al tres en raya mediante aprendizaje por refuerzo, años antes de que las computadoras modernas hicieran tales experimentos comunes.

## Historia y Contexto

### El Creador: Donald Michie

Donald Michie (1923-2007) fue un investigador británico que había trabajado en el descifrado de códigos durante la Segunda Guerra Mundial junto a Alan Turing en Bletchley Park. Quince años después de la guerra, Michie quería demostrar los principios del aprendizaje automático y la inteligencia artificial, pero enfrentaba un desafío significativo: las computadoras no estaban fácilmente disponibles para tales propósitos experimentales en 1960.

### Origen de MENACE

Según se informa, MENACE fue creado como resultado de una apuesta con un colega de ciencias de la computación que afirmaba que tal máquina de aprendizaje era imposible. Michie aceptó el desafío, construyendo una computadora mecánica funcional a partir de cajas de cerillas y cuentas como un "proyecto divertido" que más tarde se convirtió en una importante herramienta de demostración.

Michie completó su ensayo seminal "Experiments on the mechanization of game-learning" (Experimentos sobre la mecanización del aprendizaje de juegos) en 1963, describiendo el funcionamiento de MENACE e introduciendo el algoritmo "BOXES", uno de los primeros sistemas de aprendizaje por refuerzo documentados.

## Cómo Funciona MENACE

### Construcción Física

MENACE consiste en:
- **304 cajas de cerillas**: Cada una pegada en una disposición similar a una cajonera
- **Cuentas de colores**: Cada color representa un movimiento diferente en la cuadrícula del tres en raya
- **Tarjetas en forma de V**: Colocadas en la parte frontal de cada bandeja de caja de cerillas para seleccionar aleatoriamente una cuenta

Cada caja de cerillas está etiquetada con un número de código correspondiente a un estado específico del juego. Después de eliminar disposiciones duplicadas (rotaciones e imágenes espejo), se necesitan exactamente 304 configuraciones únicas para representar todos los estados posibles del juego donde MENACE necesita hacer un movimiento.

### Operación del Juego

{{% notice style="info" title="Cómo Jugar Contra MENACE" %}}
1. **MENACE siempre juega primero como O** (todas las cajas representan estados desde la perspectiva de O)
2. **Encuentra el estado actual del juego**: Localiza la caja que coincida con la configuración actual del tablero
3. **Agita y selecciona**: Retira la bandeja y agítala suavemente para que las cuentas rueden hacia la tarjeta en forma de V
4. **La cuenta en el punto de la V es el movimiento elegido**: Su color indica en qué casilla jugar
5. **Mantén la caja entreabierta**: Deja las cajas usadas ligeramente abiertas con la cuenta seleccionada apartada
6. **Continúa alternando turnos** hasta que el juego termine
{{% /notice %}}

### El Proceso de Aprendizaje

{{% notice style="tip" title="Mecanismo de Refuerzo" %}}
Después de cada juego, MENACE aprende a través de un sistema de recompensa y castigo:

**Si MENACE gana:**
- Todas las cuentas usadas en ese juego se devuelven a sus cajas
- Se añaden **tres cuentas adicionales** de cada color usado
- Esto hace que los movimientos ganadores sean más probables en juegos futuros

**Si MENACE pierde:**
- Las cuentas usadas durante el juego se **eliminan permanentemente**
- Esto hace que las estrategias perdedoras sean menos probables o imposibles de repetir

**Si el juego es un empate:**
- Las cuentas usadas se devuelven con **una cuenta adicional** de cada color
- Los empates se refuerzan ligeramente como resultados aceptables
{{% /notice %}}

### Curva de Aprendizaje

Cuando juega contra un jugador que usa estrategia óptima, el rendimiento de MENACE mejora constantemente:

- **Juegos iniciales**: MENACE juega aleatoriamente, a menudo perdiendo
- **Después de ~20 juegos**: MENACE comienza a mostrar preferencias estratégicas
- **Después de ~50+ juegos**: Contra juego óptimo, MENACE empata consistentemente
- **Contra jugadores aleatorios**: MENACE aprende a ganar la mayoría de los juegos

El aprendizaje no es perfectamente lineal: la varianza estadística significa que MENACE ocasionalmente puede hacer elecciones subóptimas, pero a lo largo de muchos juegos, las estrategias óptimas emergen a través de convergencia estadística.

## Significado Teórico

### Pionero del Aprendizaje por Refuerzo

MENACE implementó lo que más tarde se formalizaría como **aprendizaje por refuerzo**:
- Comienza sin estrategia predeterminada (cuentas iguales en cada caja)
- Aprende mediante prueba y error
- Usa recompensa (añadiendo cuentas) y castigo (eliminando cuentas) para ajustar el comportamiento
- Converge en estrategias óptimas a través del aprendizaje estadístico

Este enfoque precedió e influyó en los algoritmos modernos de aprendizaje por refuerzo, incluido el Q-Learning desarrollado por Christopher Watkins décadas después.

### Paralelismo con la Inicialización de Pesos

La forma en que MENACE comienza con números iguales de cada cuenta de color refleja la **inicialización de pesos** en las redes neuronales modernas. Ambos sistemas:
- Comienzan con condiciones iniciales relativamente uniformes
- Ajustan estos pesos/cuentas a través de la experiencia
- Convergen en soluciones óptimas mediante aprendizaje iterativo

## Legado e Impacto

### Influencia en la Investigación de IA

Después del éxito de MENACE, Donald Michie:
- Fue invitado a la Oficina de Investigación Naval de EE. UU.
- Fue comisionado para construir un programa que ejecutara BOXES para una computadora IBM en Stanford University
- Creó una simulación de MENACE en una computadora Ferranti Pegasus 2
- Desarrolló GLEE (Game Learning Expectimaxing Engine) en 1968 para el equilibrio de un poste en un carro

### Recreaciones Modernas

MENACE ha sido recreado múltiples veces:
- **Matthew Scroggs** (University College London) construyó una réplica funcional en 2016
- Esta réplica apareció en QI (programa de concursos de la BBC), las Royal Institution Christmas Lectures y varios festivales de ciencia
- Una [versión interactiva en línea](https://www.mscroggs.co.uk/menace/) permite a cualquiera jugar contra un MENACE virtual
- MENACE se usa como herramienta de enseñanza para demostrar conceptos de aprendizaje por refuerzo

### Referencias Culturales

MENACE ha sido referenciado en:
- El cuento de Fred Saberhagen de 1963 "Without A Thought"
- La novela de Thomas J. Ryan de 1977 "The Adolescence of P-1"
- El libro de Naomi Alderman de 2023 "The Future"

## Pruébalo Tú Mismo

Puedes experimentar MENACE en acción a través de estos recursos:

{{% notice style="success" title="Recursos Interactivos" %}}
🎮 **[Juega contra MENACE en línea](https://www.mscroggs.co.uk/menace/)** - Simulación interactiva por Matthew Scroggs

📺 **[Ve MENACE en acción](https://www.youtube.com/watch?v=R9c-_neaxeU)** - Excelente video explicativo de Matt Parker (Stand-up Maths)

{{< youtube "R9c-_neaxeU" >}}


🏗️ **[Construye tu propio MENACE](https://www.mscroggs.co.uk/blog/94)** - Instrucciones detalladas para construir un MENACE físico

📄 **[Lee el artículo original](https://doi.org/10.1093/comjnl/6.3.232)** - Publicación de Michie de 1963 en The Computer Journal
{{% /notice %}}

## Conceptos Clave Demostrados

{{% notice style="warning" title="Lo Que MENACE Nos Enseña" %}}
1. **El aprendizaje automático no requiere computadoras**: Los principios pueden demostrarse con componentes físicos
2. **El aprendizaje por refuerzo es poderoso**: Aprender de los resultados (ganar/perder/empatar) sin instrucción explícita
3. **Convergencia estadística**: Incluso con aleatoriedad, las estrategias óptimas emergen con el tiempo
4. **Precedente histórico**: Los conceptos modernos de IA tienen raíces históricas profundas
5. **Demostración accesible**: Los principios complejos de IA pueden entenderse a través de sistemas físicos tangibles
{{% /notice %}}

## Conclusión

MENACE es un testimonio del ingenio de los primeros investigadores de IA y demuestra que los principios fundamentales del aprendizaje automático—aprender de la experiencia, prueba y error, y refuerzo—pueden implementarse incluso sin computadoras digitales modernas. La máquina de cajas de cerillas de Donald Michie continúa inspirando y educando a nuevas generaciones sobre los fundamentos de la inteligencia artificial y el aprendizaje automático.

La elegancia de MENACE no radica solo en su ingeniosa implementación mecánica, sino en cuán claramente ilustra los conceptos centrales que impulsan los sistemas de IA modernos. Cuando las redes neuronales de hoy ajustan sus pesos mediante retropropagación, están siguiendo el mismo principio fundamental que MENACE demostró con cuentas de colores en 1961: aprender de los resultados, reforzar lo que funciona y eliminar lo que no.

## Referencias y Lectura Adicional

- [MENACE - Wikipedia](https://en.wikipedia.org/wiki/Matchbox_Educable_Noughts_and_Crosses_Engine)
- [Michie, D. (1963). "Experiments on the Mechanization of Game-Learning Part I"](https://doi.org/10.1093/comjnl/6.3.232), The Computer Journal, 6(3), 232-236
- [MENACE Interactivo por Matthew Scroggs](https://www.mscroggs.co.uk/menace/)
- [Cómo Construir MENACE](https://www.mscroggs.co.uk/blog/94)
- [Video: MENACE Explicado (Stand-up Maths)](https://www.youtube.com/watch?v=R9c-_neaxeU)
