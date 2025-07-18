import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import Empleado from "./empleado.js";

class Horario extends Model{}

Horario.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID"
    },
    idEmpleado:{
        type: DataTypes.INTEGER,
        field: "ID_EMPLEADO"
    },
    fecha:{
        type: DataTypes.DATEONLY,
        field: "FECHA"
    },
    ingreso: {
        type: DataTypes.TIME,
        field: "HORARIO_INGRESO"
    },
    egreso: {
        type: DataTypes.TIME,
        field: "HORARIO_EGRESO"
    },
    extras:{
        type: DataTypes.NUMBER,
        field: "CANT_HORAS_EXTRAS"
    }
},{
    sequelize,
    modelName: "Horario",
    tableName: "Horarios",
    timestamps: false
})

Horario.belongsTo(Empleado,{
    foreignKey: "idEmpleado",
    as: "empleado"
})

export default Horario