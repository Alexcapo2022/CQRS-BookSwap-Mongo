# Patrón de Arquitectura Cloud CRQS
**Alexander Cruz Marticorena**
**20192659@aloe.ulima.edu.pe**
## 1.	Principios Fundamentales de CQRS en la Nube
El acrónimo CQRS, que corresponde a la denominación Command and Query Responsibility Segregation, este patrón arquitectónico está destinado a la segregación de las operaciones vinculadas a la consulta y actualización de un repositorio de datos en el contexto de aplicaciones informáticas. La implementación de CQRS en una aplicación adquiere un valor significativo al proporcionar una optimización notoria en cuanto a su rendimiento, escalabilidad y nivel de seguridad inherente. Este paradigma introduce una notoria flexibilidad en la estructura del sistema, lo cual conlleva a que este pueda evolucionar de manera más fluida y acorde con las necesidades cambiantes con el transcurso del tiempo. Es importante destacar que una de las ventajas primordiales radica en que la segregación de las operaciones de lectura y actualización mitiga la probabilidad de conflictos de fusión a nivel de dominio, evitando así posibles inconvenientes derivados de las operaciones concurrentes. En consecuencia, la adopción de CQRS representa un enfoque sofisticado y efectivo para el diseño de sistemas de software que requieren un alto grado de modularidad y desempeño, como se visualiza en la figura 1.

**Figura 1**

Arquitectura CQRS
![image](https://github.com/Alexcapo2022/CQRS-BookSwap-Mongo/assets/98053517/7e71e3c1-6182-4c2d-8b4c-255e94279844)

*Nota.* En la figura se muestra la estructura de la arquitectura CQRS

El principio CQRS representa una estrategia arquitectónica que aconseja la separación de las operaciones que modifican el estado (comandos) de las operaciones de consulta. Esta separación ofrece una amplia gama de posibilidades, permitiendo elegir distintas bases de datos para las operaciones de escritura y lectura. De este modo, los desarrolladores tienen la capacidad de seleccionar opciones más eficientes para las consultas sin comprometer los beneficios de la base de datos original, como, por ejemplo, una base de datos relacional para las operaciones que modifican el estado (Debski et al., 2018).
### 1.1	Características Clave de CQRS:
*Separación de Responsabilidades:* La separación de la lógica de escritura y lectura en CQRS se fundamenta en el principio de responsabilidad única y la teoría de la segregación de tareas. Este enfoque está intrínsecamente ligado al principio SOLID (Single Responsibility Principle), que aboga por la separación de preocupaciones. Al aplicar CQRS, se logra una clara distinción entre las operaciones de escritura (comandos que modifican el estado) y las operaciones de lectura (consultas que recuperan datos). Esta separación permite una optimización específica para cada tipo de operación, facilitando la evolución y mantenimiento del sistema. Los patrones de diseño, como el Command pattern para las operaciones de escritura y el Query pattern para las operaciones de lectura, se aplican de manera más eficiente al desacoplar estas responsabilidades. Esto resulta en un sistema más escalable y flexible, ya que cada parte puede evolucionar independientemente según sus necesidades, y las pruebas, el mantenimiento y la comprensión del sistema se simplifican al tener lógicas más enfocadas y específicas.

**Figura 2**

Design Pattern

![image](https://github.com/Alexcapo2022/CQRS-BookSwap-Mongo/assets/98053517/41c94ca7-c2bd-4c21-b1d1-ff899e7599a7)

*Nota.* Adaptado de CQRS Design Pattern in Microservices Architectures, por Ozkaya 2023

*Modelo de Dominio Enriquecido:* CQRS fomenta la creación de modelos de dominio más enriquecidos y especializados para operaciones de escritura. Esta característica se alinea con los principios de Domain-Driven Design (DDD), que postulan la importancia de modelar el dominio de negocios y la lógica compleja de manera específica y precisa. Al separar los comandos y las consultas, se permite la optimización individual de los modelos de dominio para cada tarea. Esta estrategia ofrece beneficios considerables en el diseño del sistema. Los modelos de dominio de escritura pueden estar más enfocados en el cumplimiento de reglas de negocio y mantener una representación más coherente y precisa del estado del sistema, ya que no están condicionados por las necesidades de lectura y consulta. Esto permite adaptar la estructura de los datos y las reglas de negocio de manera más eficiente, mejorando así la claridad y mantenibilidad del sistema.

*Flexibilidad en el Almacenamiento de Datos:* La flexibilidad en el almacenamiento de datos es un punto central en la arquitectura CQRS. Al permitir el uso de diferentes almacenes de datos para comandos y consultas, se pueden optimizar los recursos y las estructuras de datos para cada tipo de operación. Por ejemplo, una base de datos altamente normalizada y optimizada para escrituras de comandos puede ser distinta a una base de datos denormalizada y optimizada para lecturas de consultas. Este enfoque está respaldado por teorías de diseño de bases de datos, como la teoría de normalización y de normalización, y la optimización de consultas. La separación de datos para lecturas y escrituras minimiza la sobrecarga de una base de datos única y permite adaptar la estructura de almacenamiento para obtener el máximo rendimiento y escalabilidad según los requisitos de cada tipo de operación. Además, se puede seleccionar la tecnología más adecuada para cada tipo de almacenamiento, lo que amplía la capacidad del sistema para manejar volúmenes y tipos de datos diversos de manera más eficiente.

## 2.Sincronización y Event Sourcing
La aplicación del principio de CQRS se alinea de manera efectiva con el concepto de Event Sourcing, una evolución avanzada del patrón de registro de transacciones bien conocido por los diseñadores de bases de datos. Este enfoque implica modelar el comportamiento del sistema en función de eventos que ocurren en el sistema y máquinas de estados, en lugar de simplemente representar el estado. La ventaja fundamental radica en la capacidad de prescindir del mapeo objeto-relacional, proporcionando así un modelo completamente independiente de la capa de persistencia.

**Figura 3**

Representación de Event Sourcing
![image](https://github.com/Alexcapo2022/CQRS-BookSwap-Mongo/assets/98053517/d479e7ce-abd2-4d4f-8fcc-efafa50dba0b)

*Nota.* Adaptado de Event Sourcing and CQRS, por Zimarev 2020

### 2.1 Ventajas del Event sourcing
* *Reconstrucción del Estado:* Event Sourcing posibilita la reconstrucción del estado de un sistema en cualquier momento del tiempo. Este enfoque, basado en eventos inmutables, permite un rastreo detallado de todas las transiciones y cambios en el sistema. Cada evento capturado se convierte en un componente esencial para la reproducción de cualquier estado del sistema en un instante específico. Esto facilita la realización de auditorías detalladas y el análisis retrospectivo del sistema, lo que resulta crucial para resolver problemas y comprender la evolución del mismo a lo largo del tiempo.
* *Auditoría Completa:* La captura de todos los eventos proporciona una trazabilidad exhaustiva de las acciones realizadas en el sistema. Cada acción se convierte en un evento registrado, lo que permite un seguimiento detallado y un análisis profundo del historial de cambios en el sistema. Esto facilita la comprensión de las operaciones realizadas, los estados anteriores y posteriores a un evento específico, brindando una visión completa y detallada de la evolución del sistema. 
* *Resiliencia y Recuperación:* La capacidad para recuperar el estado del sistema tras fallas o interrupciones se convierte en un aspecto fundamental. Al disponer de un registro exhaustivo de eventos, el sistema tiene la capacidad de reconstruir su estado anterior a cualquier falla. Esta característica proporciona una mayor resiliencia y confiabilidad al sistema, permitiéndole recuperarse y continuar funcionando incluso después de situaciones adversas. El Event Sourcing, al basarse en eventos inmutables, actúa como un respaldo integral que asegura la continuidad operativa del sistema en condiciones desafiantes.
### 2.2 Retos y Consideraciones con respecto a CQRS y Event Sourcing
* *Consistencia y Conflictos:* La gestión de conflictos entre eventos concurrentes y la garantía de consistencia son áreas críticas. En un entorno donde los eventos se propagan de forma asincrónica, surgen desafíos al manejar múltiples eventos concurrentes que pueden modificar el estado del sistema de manera simultánea. Garantizar la coherencia del sistema y resolver conflictos se vuelve esencial para mantener la integridad de los datos en una arquitectura basada en CQRS y Event Sourcing.

* *Evolución de Eventos:* Los eventos, al ser la base del estado del sistema, pueden evolucionar con el tiempo. La introducción de versiones cambiantes de eventos o la eliminación de eventos obsoletos sin comprometer la integridad del sistema puede ser un desafío. Es fundamental desarrollar estrategias para manejar la evolución de eventos y su impacto en la consistencia y la reconstrucción del estado del sistema.
### 2.3 Estrategias Prácticas de Implementación
* *Versionado y Evolución de Eventos:* La implementación de estrategias efectivas de versionado de eventos se vuelve crucial. Garantizar la compatibilidad y la evolución sin problemas a lo largo del tiempo es esencial para adaptarse a cambios en la estructura de los eventos y mantener la integridad del sistema.

* *Gestión de Agregados:* El diseño de límites claros para los agregados es esencial para minimizar los conflictos de concurrencia y asegurar la coherencia del sistema. Al establecer límites de agregados precisos, se reduce la posibilidad de conflictos entre eventos y se fortalece la cohesión de la información.

* *Seguridad y Auditoría:* El control de acceso a eventos y la creación de registros de auditoría juegan un papel crítico en la protección de datos y la trazabilidad de las operaciones en el sistema. Establecer mecanismos robustos para controlar el acceso a eventos y registrar las operaciones realizadas es esencial para garantizar la integridad y la seguridad del sistema en una arquitectura basada en CQRS y Event Sourcing.

## 2.4 Beneficios de CQRS
* *Rendimiento Optimizado:* La especialización de los mecanismos de lectura y escritura resulta en un rendimiento optimizado del sistema. Al diseñar cada operación específicamente para su propósito, se minimiza la sobrecarga inherente a las operaciones combinadas, lo que repercute en una ejecución más eficiente y rápida.
  
* *Escalabilidad:* La separación clara entre comandos y consultas es esencial para la escalabilidad del sistema. Permite que los componentes de lectura y escritura se escalen de manera independiente en función de las necesidades particulares de cada parte del sistema. Esta capacidad de escalado independiente facilita la adaptación a cargas de trabajo variables y promueve un crecimiento más eficiente y balanceado.
  
* *Mantenibilidad y Evolución del Sistema:* La separación de responsabilidades resulta fundamental para la mantenibilidad y evolución continuada del sistema a lo largo del tiempo. Esta segregación permite realizar modificaciones y mejoras en un área sin afectar negativamente la otra. Por ende, simplifica las actualizaciones y evita interdependencias que podrían dificultar la evolución del sistema.

## 3. Caso de aplicación

## 4. Referencias
* Edirisinghe, D. M. (2022, 5 enero). CQRS and Mediator Design Patterns - Darshana Mihiran Edirisinghe - Medium. Medium. https://medium.com/@darshana-edirisinghe/cqrs-and-mediator-design-patterns-f11d2e9e9c2e
* Debski, A., Szczepanik, B., Malawski, M., Spahr, S., & Muthig, D. (2018). A scalable, reactive architecture for cloud applications. IEEE Software, 35(2), 62-71. https://doi.org/10.1109/ms.2017.265095722
* Zimarev, A. (2020, 17 junio). Event Sourcing and CQRS - Event Store blog. https://www.eventstore.com/blog/event-sourcing-and-cqrs
* Ozkaya, M. (2023, 9 abril). CQRS Design Pattern in Microservices Architectures - Design Microservices Architecture with Patterns & Principles - Medium. Medium. https://medium.com/design-microservices-architecture-with-patterns/cqrs-design-pattern-in-microservices-architectures-5d41e359768c


