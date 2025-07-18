import horarioService from "../services/horarioService.js";
import express from "express";

const router = express.Router();

router.post("/", async(req,res)=>{
    try{
        const horarioCreado = await horarioService.crear(req.body);
        res.status(201).json(horarioCreado)
    }catch(err){
        res.status(400).json({error: err.message})
    }
})

router.put("/:id", async(req,res)=>{
    try{
        const horarioActualizado = await horarioService.actualizar(parseInt(req.params.id),req.body)
        res.json(horarioActualizado)
    } catch(err){
        res.status(400).json({error: err.message})
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        await horarioService.eliminar(parseInt(req.params.id))
        res.status(204).end();
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

router.get("/:id", async(req,res)=>{
    try{
        const horario = await horarioService.obtenerPorId(parseInt(req.params.id))
        if(!horario) return res.status(400).json({error: "Horario no encontrado"})
        res.json(horario).status(200)
    } catch(err){
        res.status(500).json({error: err.message})
    }
})

router.get("/", async(req,res)=>{
    try{
        const horarios = await horarioService.buscar(req.query);
        res.status(200).json(horarios)
    } catch(err){
        res.status(400).json({error: err.message})
    }
})



export default router