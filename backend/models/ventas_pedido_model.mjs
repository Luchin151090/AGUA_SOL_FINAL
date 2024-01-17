import { db_pool } from "../config.mjs";
import { io } from '../index.mjs';



const modelPedido = {
    createPedido:async (pedido) => {
        try{

           // const io = await app_sol.get('io');

            const pedidos = await db_pool.one('INSERT INTO ventas.pedido (ruta_id,cliente_id,monto_total,fecha,tipo,estado) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [pedido.ruta_id,pedido.cliente_id,pedido.monto_total,pedido.fecha,pedido.tipo,pedido.estado]);
            
           // const io = app_sol.get(io);
            //EMITIR UN EVENTO
            io.emit('nuevoPedido',pedidos)

            return pedidos

        }
        catch(e){
            throw new Error(`Error query create:${e}`)
        }
    },
    getLastPedido: async () => {
        try {
            const lastPedido = await db_pool.one('SELECT id FROM ventas.pedido ORDER BY id DESC LIMIT 1');
            return lastPedido;
        } catch (e) {
            throw new Error(`Error getting last pedido: ${e}`);
        }
    },
    getPedido: async ()=> {
        console.log("dentro de get....")
        
        try {
            const pedidos = await db_pool.any('SELECT id,ruta_id,cliente_id,cliente_nr_id,monto_total,fecha,tipo,estado FROM ventas.pedido WHERE estado =  \'pendiente\'');
            console.log("EMITIENDO PEDIDOS,...")
            //io.emit('vista',"hola")
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
    
    updatePedido: async (id, pedido) => {

        try {
            const result = await db_pool.oneOrNone('UPDATE ventas.pedido SET ruta_id = $1, monto_total = $2, fecha = $3, estado = $4, tipo = $5 WHERE id = $6 RETURNING *',
                [pedido.ruta_id,pedido.monto_total,pedido.fecha,pedido.estado,pedido.tipo,id]);

            if (!result) {
                throw new Error(`No se encontró un pedido con ID ${id}.`);
            }
            return { result }
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
