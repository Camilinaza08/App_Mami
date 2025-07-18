import { act } from "react";
import axios from "./axios.config.js";

const obtenerTodas = async() => {
    const response = await axios.get("/empleados")
    return response.data
}

const eliminar = async(id) => {
    await axios.delete(`/empleados/${id}`)
}

const obtenerPorId = async(id) => {
    const response = await axios.get(`/empleados/${id}`)
    return response.data
}

const crear = async(empleado) => {
    const response = await axios.post("/empleados", empleado)
    return response.data
}

const actualizar = async(id, empleado) =>{
    const response = await axios.put(`/empleados/${id}`,empleado)
    return response.data
}

export default{
    obtenerTodas,
    eliminar, 
    actualizar,
    crear,
    obtenerPorId
}