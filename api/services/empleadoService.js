import empleadoRepository from "../repositories/empleadoRepository.js"

class EmpleadoService{
    async obtenerTodos(){
        return await empleadoRepository.obtenerTodos()
}
    async crear(datos){
        const creado = await empleadoRepository.crear(datos)
        return creado
    }

    async actualizar(id,datos){
        const actualizado = await empleadoRepository.actualizar(id,datos)
        return(actualizado)
    }

    async eliminar(id){
        return await empleadoRepository.eliminar(id)
    }

     async obtenerPorId(id){
            const empleado = await empleadoRepository.obtenerPorId(id)
            return empleado
        }

}

export default new EmpleadoService();