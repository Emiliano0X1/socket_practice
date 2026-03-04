By Emiliano Gonzalez, Andres Silva, Carlos Ibarra Mora 67

1. ¿Por qué WebSockets (o tu tecnología elegida) es mejor que HTTP normal para un chat?
Esto se debe por la conexion bidireccional que proveen los websockets (socket.io utilizado en este proyecto), que a diferencia de HTTP, que necesita hacer una nueva solicitud al servidor cada vez que se quiera enviar un mensaje, los WebSockets logran un intercambio inmediato manteniendo latencia y conexion instantanea entre los usuarios.

2. ¿Qué mantiene “viva” la conexión y cómo detectas que un cliente se desconectó?
Lo que mantiene viva la conexion es el protocolo ping/pong en donde el servidor envia ping cada cierto tiempo y espera a que haya una respuesta "pong" en un tiempo determinado pR evitar tiempos de espera. Generalmente si no hay una respuesta, la conexion se pierde y se detecta mediante eventos onClose en el cliente. 

3. ¿Qué problema aparece si dos usuarios envían mensajes al mismo tiempo y cómo lo manejas?
Puede que los mensajes se muestren en desorden dependiendo de cuándo llegaron al servidor, por lo cual se puede implementar un parámetro con un TimeStamp para tener control del orden real de los mensajes. Aunque en este caso, Node lo maneja debido a que los eventos se procesan en un hilo, por lo que se serializan y evita condiciones de carrera.

4. ¿Qué riesgos de seguridad tendría tu chat y qué harías para mitigarlos?
Un montón, como:
 - Spam para saturar el servidor: Implementar un rate limiting o limitar la longitud de un mensaje.
 -XSS: Sanitizar los textos antes de procesalos y mostrarlos como textContent.


5. Si tu servidor se cae y vuelve, ¿qué debería hacer el cliente para recuperar la conexión?
El cliente debe reconectarse automáticamente cuando el servidor vuelva. En nuestro caso, Socket.io ya tiene un auto-reconnect por defecto, solo es necesario monitorear la conexin y desconexión y volver a enviar la información necesaria como el Nickname.
