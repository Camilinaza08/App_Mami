import axios from "./axios.config.js"

const cargar = async()=>{
    const response = await axios.get("/horarios")
    return response.data
}

const buscar = async(filtros) => {
    const params = new URLSearchParams(filtros).toString();
    const response = await axios.get(`/horarios?${params}`)
    return response.data
}

const eliminar = async(id) => {
    await axios.delete(`/horarios/${id}`)
}

const obtenerPorId = async(id) => {
    const response = await axios.get(`/horarios/${id}`)
    return response.data
}

const crear = async(horario) => {
    const response = await axios.post("/horarios", horario)
    return response.data
}

const actualizar = async(id, horario) =>{
    const response = await axios.put(`/horarios/${id}`,horario)
    return response.data
}

export default {
    cargar,
    buscar,
    eliminar,
    obtenerPorId,
    crear,
    actualizar
}