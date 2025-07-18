import RepositorioBase from "./repositorioBase.js";
import Empleado from "../models/empleado.js";

class EmpleadoRepository extends RepositorioBase{
    constructor(){
        super(Empleado)
    }

    async obtenerTodos(){
        return this.modelo.findAll({
            order: [["Legajo", "ASC"]]
        })
    }
}

export default new EmpleadoRepository();