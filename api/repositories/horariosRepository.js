import RepositorioBase from "./repositorioBase.js";
import Horario from "../models/horario.js"
import Empleado from "../models/empleado.js";
import {Op} from "sequelize"

class HorarioRepository extends RepositorioBase{
    constructor(){
        super(Horario)
    }

   async buscar({ nombre, fechaDesde, fechaHasta }) {
  const includeEmpleado = {
    model: Empleado,
    as: "empleado"
  };

  const condicionesEmpleado = [];
  const condiciones = [];

  if (nombre) {
    condicionesEmpleado.push({
      Nombre: { [Op.like]: `%${nombre}%` }
    });
  }

  if (fechaDesde) {
    condiciones.push({ Fecha: { [Op.gte]: fechaDesde } });
  }

  if (fechaHasta) {
    condiciones.push({ Fecha: { [Op.lte]: fechaHasta } });
  }

  if (condicionesEmpleado.length > 0) {
    includeEmpleado.where = { [Op.and]: condicionesEmpleado };
  }

  return this.modelo.findAll({
    where: { [Op.and]: condiciones },
    include: [includeEmpleado],
  });
}

    async validarRepeticion(empleado, fecha){
        const existeHorario = await Horario.findOne({
        where: {
            ID_EMPLEADO: empleado,
            FECHA: fecha
        }
        });

if (existeHorario) {
  throw new Error('Ya existe un horario para este empleado en esa fecha');
}
    }

    async obtenerPorId(id){
        return this.modelo.findByPk(id,{
            include:{
                model: Empleado,
                as: "empleado"
            }
        })
    }
}

export default new HorarioRepository();