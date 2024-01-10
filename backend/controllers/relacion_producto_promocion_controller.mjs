import modelProductoPromocion from "../models/relacion_detallepromocion_model.mjs";

export const createProductoPromociones = async (req,res) => {
    try {
        const nuevaRelacion = req.body
        const relacionCreada= await modelProductoPromocion.createProductoPromocion(nuevaRelacion);
        
        res.json(relacionCreada);
    } catch (error) {
        res.status(500).json({error:error.message});

    }
}


export const getProductoPromociones =  async (req,res) => {
    console.log("id llego")
    try {
        const getProductoPromociones = await modelProductoPromocion.getProductoPromocion();
        res.json(getProductoPromociones)
    } catch (error) {
        res.status(500).json({erro:error.message})
    }
}


export const deleteProductoPromociones = async (req,res) => {
    console.log("id llego")
    try {
        const { relacionID } = req.params;
        const id = parseInt(relacionID, 10);
        const deleteProductoPromociones = await modelProductoPromocion.deleteProductoPromocion(id);

        if (deleteProductoPromociones) {
            res.json({ mensaje: 'La relacion producto promocion ha sido eliminada exitosamente' });
        } else {
            // Si rowCount no es 1, significa que no se encontró un cliente con ese ID
            res.status(404).json({ error: 'No se encontró la ruta con el ID proporcionado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProductoPromociones = async (req,res)=>{
    try {
        const {relacionID} = req.params;
        const id = parseInt(relacionID,10);
        const data = req.body;
        const updateProductoPromociones = await modelProductoPromocion.updateProductoPromocion(id,data);
        res.json(updateProductoPromociones);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}