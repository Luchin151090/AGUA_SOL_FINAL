import { Socket } from "socket.io";
import { db_pool } from "../config.mjs";
import { io } from '../index.mjs';



const modelPedido = {
    createPedido: async (pedido) => {
        try {
            //  console.log("-----PEDIDOO recibidoooo------")
            // console.log(pedido)
            // const io = await app_sol.get('io');
            console.log("-----PEDIDO INSERTADO-------")
            if (pedido.cliente_id) {
                // Si cliente_id existe, es un cliente registrado
                const pedidos_cr = await db_pool.one(`
                    INSERT INTO ventas.pedido (cliente_id, subtotal,descuento,total, fecha, tipo, estado, observacion)
                    VALUES ($1, $2, $3, $4, $5, $6 , $7, $8)
                    RETURNING *
                `, [pedido.cliente_id, pedido.subtotal,pedido.descuento,pedido.total, pedido.fecha, pedido.tipo, pedido.estado, pedido.observacion]);

                console.log("pedidos cr");
                console.log(pedidos_cr);
                console.log(pedidos_cr.id);

                const pedidoss = await db_pool.one(`SELECT vp.id,vp.subtotal,vp.descuento,vp.total,vp.ruta_id,vp.fecha,vp.estado,vp.tipo,vp.observacion,vc.nombre,vc.apellidos,vc.telefono,rub.latitud,rub.longitud,rub.distrito
                FROM ventas.pedido as vp
                INNER JOIN ventas.cliente as vc ON vp.cliente_id = vc.id
                INNER JOIN relaciones.ubicacion as rub ON vc.id = rub.cliente_id
                WHERE estado =  \'pendiente\' and vp.id=$1`, [pedidos_cr.id]);

                // PEDIDOS SOCKET
                console.log('nuevoPedido Emitido')
                io.emit('nuevoPedido', pedidoss)

                return pedidoss

            } else {
                // Si cliente_id es nulo, es un cliente no registrado
                const pedidos_nr = await db_pool.one(`
                    INSERT INTO ventas.pedido (cliente_nr_id, subtotal,descuento,total, fecha, tipo, estado, observacion)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING *
                `, [pedido.cliente_nr_id, pedido.subtotal,pedido.descuento,pedido.total, pedido.fecha, pedido.tipo, pedido.estado, pedido.observacion]);
                console.log("pedidos nr");
                console.log(pedidos_nr);

                const pedidoss = await db_pool.one(`SELECT vp.id,vp.subtotal,vp.descuento,vp.total,vp.ruta_id,vp.fecha,vp.estado,vp.tipo,vp.observacion,vcnr.nombre,vcnr.apellidos,vcnr.telefono,rub.latitud,rub.longitud,rub.distrito
                FROM ventas.pedido as vp
                INNER JOIN ventas.cliente_noregistrado as vcnr ON vp.cliente_nr_id = vcnr.id
                INNER JOIN relaciones.ubicacion as rub ON vcnr.id = rub.cliente_nr_id
                WHERE estado =  \'pendiente\' and vp.id=$1`, [pedidos_nr.id]);

                // PEDIDOS SOCKET
                io.emit('nuevoPedido', pedidoss)
                return pedidoss
            }


        }
        catch (e) {
            throw new Error(`Error query create:${e}`)
        }
    },
    getLastPedido: async (id) => {
        try {
            const lastPedido = await db_pool.one('SELECT id FROM ventas.pedido WHERE cliente_id=$1 ORDER BY id DESC LIMIT 1',[id]);
            return lastPedido;
        } catch (e) {
            throw new Error(`Error getting last pedido: ${e}`);
        }
    },

    getPedido: async () => {
        console.log("dentro de get para conductores")

        try {
            const pedidos = await db_pool.any(`
            SELECT
                vp.id,
                vp.subtotal,
                vp.descuento,
                vp.total,
                vp.ruta_id,
                vp.fecha,
                vp.estado,
                vp.tipo,
                vp.observacion,
                COALESCE(rub.latitud, rub_nr.latitud) as latitud,
                COALESCE(rub.longitud, rub_nr.longitud) as longitud,
                COALESCE(rub.distrito, rub_nr.distrito) as distrito,
                COALESCE(vc.nombre, vcnr.nombre) as nombre,
                COALESCE(vc.apellidos, vcnr.apellidos) as apellidos,
                COALESCE(vc.telefono, vcnr.telefono) as telefono
                
            FROM
                ventas.pedido as vp
            LEFT JOIN ventas.cliente as vc ON vp.cliente_id = vc.id
            LEFT JOIN ventas.cliente_noregistrado as vcnr ON vp.cliente_nr_id = vcnr.id
            LEFT JOIN relaciones.ubicacion as rub ON vp.cliente_id = rub.cliente_id
            LEFT JOIN relaciones.ubicacion as rub_nr ON vp.cliente_nr_id = rub_nr.cliente_nr_id
            WHERE estado = \'pendiente\' ORDER BY vp.id ASC;`);

            console.log(pedidos)
            return pedidos
            

        } catch (error) {
            throw new Error(`Error getting pedido: ${error}`)
        }
    },


    getPedidoConductor: async (rutaID,conductorID)=> {
        console.log("dentro de get Pedidos para Conductores....")
        
        try {
          const pedidos = await db_pool.any(`SELECT vp.id, vp.total, vp.fecha, vp.estado, vp.tipo, vc.nombre, vc.apellidos, vc.telefono, vc.direccion FROM ventas.ruta as vr INNER JOIN ventas.pedido as vp ON vr.id = vp.ruta_id INNER JOIN ventas.cliente as vc ON vp.cliente_id = vc.id WHERE ruta_id=$1 and conductor_id=$2`,[rutaID,conductorID]);
          console.log(pedidos)
            return pedidos

        } catch (error) {
            throw new Error(`Error getting pedido: ${error}`)
        }
    },

    deletePedido: async (id) => {
        try {
            const result = await db_pool.result('DELETE FROM ventas.pedido WHERE ID = $1', [id]);
            return result.rowCount === 1; // Devuelve true si se eliminó un registro, false si no se encontró el registro
        } catch (error) {
            throw new Error(`Error en la eliminación del pedido: ${error.message}`);
        }
    },
    
    updateEstadoPedido: async (pedidoID,newDatos) => {

        try {
            console.log('entro a update')
            const result = await db_pool.oneOrNone('UPDATE ventas.pedido SET estado = $1,foto=$2 WHERE id = $3 RETURNING *',
                [newDatos.estado,newDatos.foto,pedidoID]);

            if (!result) {
                throw new Error(`No se encontró un pedido con ID ${id}.`);
            }
            return result
        } catch (error) {
            throw new Error(`Error en la actualización del pedido: ${error.message}`);
        }
    },
    updateRutaPedido:async (id,ruta) => {
        try {
            const result  = await db_pool.oneOrNone('UPDATE ventas.pedido SET ruta_id = $1,estado = $2 WHERE id = $3 RETURNING *',
            [ruta.ruta_id,ruta.estado,id]);
            if (!result){
                return {"Message":"No se encontró un pedido con ese ID"}
            }
            return{result}

        } catch (error) {
            throw new Error(`Error en la actualización del pedido: ${error.message}`)
        }
    }
}

export default modelPedido;
