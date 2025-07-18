import horariosRepository from "../repositories/horariosRepository.js";
import empleadoRepository from "../repositories/empleadoRepository.js";

class HorarioService{

    async crear(datos){
        await this.validarEmpleadoExistente(datos.idEmpleado)
        await horariosRepository.validarRepeticion(datos.idEmpleado, datos.fecha)
        const horarioObligatorio = await empleadoRepository.obtenerPorId(datos.idEmpleado)
        datos.extras = await this.calcularExtras(datos.ingreso, datos.egreso, horarioObligatorio.hrsObligatorias)
        const creado = await horariosRepository.crear(datos)
        return(creado)
    }

    async validarEmpleadoExistente(legajo){
        const empleado = await empleadoRepository.obtenerPorId(legajo)
        if(!empleado){
            throw new Error(`El empleado con ID ${legajo} no existe.`);
        }
    }

    async calcularExtras(ingreso, egreso, horas){
    const hoy = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  
  const inicio = new Date(`${hoy}T${ingreso}:00`);
  const fin = new Date(`${hoy}T${egreso}:00`);

  // Diferencia en milisegundos
  let diffMs = fin - inicio;

  const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffDecimal = diffHoras + diffMinutos / 60;

  console.log(diffDecimal)

  return diffDecimal - horas
    }

    async actualizar(id, datos){
        await this.validarEmpleadoExistente(datos.idEmpleado)
        const horarioObligatorio = await empleadoRepository.obtenerPorId(datos.idEmpleado)
        datos.extras = await this.calcularExtras(datos.ingreso, datos.egreso, horarioObligatorio.hrsObligatorias)
        const actualizado = await horariosRepository.actualizar(id, datos)
        return(actualizado)
    }

     async eliminar(id){
        return await horariosRepository.eliminar(id)
    }

    async buscar(filtros){
        const horarios = await horariosRepository.buscar(filtros)
        return horarios
    }

    async obtenerPorId(id){
        const horario = await horariosRepository.obtenerPorId(id)
        return horario
    }
}

export default new HorarioService()