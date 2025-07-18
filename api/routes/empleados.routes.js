import empleadoService from "../services/empleadoService.js";
import express from "express";

const router = express.Router();

router.post("/", async(req,res)=>{
    try{
        const empleadoCreado = await empleadoService.crear(req.body);
        res.status(201).json(empleadoCreado)
    }catch(err){
        res.status(400).json({error: err.message})
    }
})

router.put("/:id", async(req,res)=>{
    try{
        const empleadoActualizado = await empleadoService.actualizar(parseInt(req.params.id),req.body)
        res.json(empleadoActualizado)
    } catch(err){
        res.status(400).json({error: err.message})
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        await empleadoService.eliminar(parseInt(req.params.id))
        res.status(204).end();
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

router.get("/:id", async(req,res)=>{
    try{
        const empleado = await empleadoService.obtenerPorId(parseInt(req.params.id))
        if(!empleado) return res.status(400).json({error: "Empleado no encontrado"})
        res.json(empleado).status(200)
    } catch(err){
        res.status(500).json({error: err.message})
    }
})
router.get("/", async(req,res)=> {
    try{
        const empleados = await empleadoService.obtenerTodos();
        res.json(empleados).status(200)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

export default router