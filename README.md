By Emiliano Gonzalez, Andres Silva, Carlos Ibarra Mora 67

1. ¿Por qué WebSockets (o tu tecnología elegida) es mejor que HTTP normal para un chat?
Esto se debe por la conexion bidireccional que proveen los websockets (socket.io utilizado en este proyecto), que a diferencia de HTTP, que necesita hacer una nueva solicitud al servidor cada vez que se quiera enviar un mensaje, los WebSockets logran un intercambio inmediato manteniendo latencia y conexion instantanea entre los usuarios.

2. ¿Qué mantiene “viva” la conexión y cómo detectas que un cliente se desconectó?
Lo que mantiene viva la conexion es el protocolo ping/pong en donde el servidor envia ping cada cierto tiempo y espera a que haya una respuesta "pong" en un tiempo determinado pR evitar tiempos de espera. Generalmente si no hay una respuesta, la conexion se pierde y se detecta mediante eventos onClose en el cliente. 

3. ¿Qué problema aparece si dos usuarios envían mensajes al mismo tiempo y cómo lo manejas?


4. ¿Qué riesgos de seguridad tendría tu chat y qué harías para mitigarlos?


5. Si tu servidor se cae y vuelve, ¿qué debería hacer el cliente para recuperar la conexión?