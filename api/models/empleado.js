import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Empleado extends Model {}

Empleado.init({
    legajo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "Legajo"
    },
    nombre:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        field: "Nombre"
    },
    hrsObligatorias:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "Horas_Obligatorias"
    }
},{
    sequelize,
    modelName: "Empleado",
    tableName: "Empleados",
    timestamps: false
})

export default Empleado