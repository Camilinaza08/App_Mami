import { useEffect, useState } from "react"
import {useForm} from "react-hook-form"
import {useNavigate, useParams, useLocation} from "react-router-dom"
import empleadosService from "../services/empleados.service"
import horariosService from "../services/horarios.service"

const FormularioHorario = () =>{
    const [empleados, setEmpleados] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, formState:{errors}} = useForm();

    useEffect(() => {
        empleadosService.obtenerTodas().then(setEmpleados)

  if (id) {
    horariosService.obtenerPorId(id).then((h) => {
      reset({ ...h, idEmpleado: Number(h.idEmpleado) });
    });
  }
}, [id, reset]);


   const onSubmit = async (data) => {
    try {
      data.idEmpleado = Number(data.idEmpleado);
      if (id) {
          await horariosService.actualizar(id,data)
        }
       else {

        await horariosService.crear(data)
      }

      navigate("/horarios/lista");

    } catch (error) {
      console.error("Error al guardar horario:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Error al guardar horario");
    }
  };

    return (
        <main className="container mt-5">
      <h3 className="mb-4">{id ? "Editar Horario" : "Nuevo Horario"}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
         <div className="col-md-6">
          <label>Empleado:</label>
          <select {...register("idEmpleado", { required: true })} className="form-select">
            <option value="">Seleccione</option>
            {empleados.map((e) => (
              <option key={e.legajo} value={e.legajo}>{e.nombre}</option>
            ))}
          </select>
          {errors.idEmpleado && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-md-6">
          <label>Fecha:</label>
          <input {...register("fecha", { required: true })} className="form-control" type="date" />
          {errors.fecha && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-md-6">
          <label>Horario de Ingreso:</label>
          <input {...register("ingreso", { required: true })} className="form-control" type="time" />
          {errors.ingreso && <span className="text-danger">Campo obligatorio</span>}
        </div>
         <div className="col-md-6">
          <label>Horario de Egreso:</label>
          <input {...register("egreso", { required: true })} className="form-control" type="time" />
          {errors.egreso && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Guardar</button>
        </div>
      </form>
    </main>
    )
}

export default FormularioHorario