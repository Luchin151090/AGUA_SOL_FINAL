import express from "express";
import cors from 'cors';
import morgan from "morgan";
import http from "http";
import {Server} from "socket.io";
import multer from 'multer';
import routerVentasPedido from "./routes/ventas_pedido_route.mjs";
import routerUserConductor from "./routes/usuario_conductor_route.mjs";
import routerUserEmpleado from "./routes/usuario_empleado_route.mjs";
import routerUserCliente from "./routes/usuario_cliente_route.mjs";
import routerUserAdmin from "./routes/usuario_administrador_route.mjs";
import routerLogin from "./routes/login_route.mjs";
import routerVentasProduct from "./routes/ventas_producto_route.mjs";
import routerDetallePedido from "./routes/relaciones_detallepedido_route.mjs";
import routerVentasVenta from "./routes/ventas_venta_route.mjs";

/** INICIA LA APP Y EL PUERTO */
const app_sol = express();
const server = http.createServer(app_sol);
const io = new Server(server, {                                         
    reconnection: true,
    reconnectionAttempts: 5,  // Número máximo de intentos
    reconnectionDelay: 1000,  // Retardo entre intentos en milisegundos
  });

io.on('connection', (socket) => {
    console.log('Cliente conectado');
    console.log("holaa");

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // RECIBIENDO 
    socket.on('recibiendoUbicacion',(data) => {
        console.log(data);
        io.emit('enviandoCoordenadas',data);
    });
    
    
    
});


const port = 8004;
//app_sol.use(multer())
app_sol.use(cors());
app_sol.use(express.json());
app_sol.use(morgan('combined'))




/** CONFIGURAMOS LAS RUTAS */
app_sol.use('/api',routerUserAdmin);
app_sol.use('/api',routerUserCliente);
app_sol.use('/api',routerUserEmpleado);
app_sol.use('/api',routerUserConductor);
app_sol.use('/api',routerVentasProduct);
app_sol.use('/api',routerLogin);
app_sol.use('/api',routerVentasPedido);
app_sol.use('/api',routerDetallePedido);
app_sol.use('/api',routerVentasVenta);



server.listen(port, ()=>{
    console.log(`Servidor en: http://127.0.0.1:${port}`);
})

export {app_sol,io,server};