import { WebSocketServer,WebSocket } from 'ws';

//*WSS= WEB SOCKET SERVER
//*WS = WEB SOCKET CLIENT
const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log("Cliente Conectado");
  ws.on('error', console.error);

  ws.on('message', function message(data) {


    const payload = {
        type:'custom-message',
        messageData:data.toString(),
    }
   // ws.send(JSON.stringify(payload));

   //*ENVIAR A TODOS - INCLUYENTE AL QUE ENVIO EL MENSAJE
//    wss.clients.forEach(function each(client){
//     if(client.readyState === WebSocket.OPEN){
//         client.send(JSON.stringify(payload),{binary:false});
//     }
//    });
      //*ENVIAR A TODOS - EXCLUYENTE AL QUE ENVIO EL MENSAJE
      wss.clients.forEach(function each(client){
        if(client !== ws && client.readyState == WebSocket.OPEN){
        client.send(JSON.stringify(payload),{binary:false});
        }
      });
  });


  ws.on('close',()=>{
    console.log('client disconected');
  });

  //!CODIGO QUE MANDA MENSAJES DESDE EL SERVIDOR
//    setInterval(()=>{
//      ws.send('Undertale repeat');
//    },2000);


});
console.log("servidor corriendo en el puerto 3000")