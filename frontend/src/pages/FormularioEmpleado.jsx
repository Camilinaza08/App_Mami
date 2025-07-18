import { useEffect, useState } from "react"
import {useForm} from "react-hook-form"
import {useNavigate, useParams, useLocation} from "react-router-dom"
import empleadosService from "../services/empleados.service"

const FormularioEmpleado = () =>{
    const [empleados, setEmpleados] = useState([]);
    const {legajo} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, formState:{errors}} = useForm();

    useEffect(() => {
        empleadosService.obtenerTodas().then(setEmpleados)

  if (legajo) {
    empleadosService.obtenerPorId(legajo).then((e) => {
      reset({ ...e, legajo: Number(e.legajo) });
    });
  }
}, [legajo, reset]);


   const onSubmit = async (data) => {
    try {
      data.legajo = Number(data.legajo);
      data.hrsObligatorias = Number(data.hrsObligatorias)
      if (legajo) {
          await empleadosService.actualizar(legajo,data)
        }
       else {

        await empleadosService.crear(data)
      }

      navigate("/horarios/lista");

    } catch (error) {
      console.error("Error al guardar empleado:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Error al guardar empleado");
    }
  };

    return (
        <main className="container mt-5">
      <h3 className="mb-4">{legajo ? "Editar Empleado" : "Nuevo Empleado"}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label>Legajo:</label>
          <input {...register("legajo", { required: true })} className="form-control" type="number" />
          {errors.legajo && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-md-6">
          <label>Nombre y apellido:</label>
          <input {...register("nombre", { required: true })} className="form-control" type="text" />
          {errors.nombre && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-md-6">
          <label>Cantidad de Horas Obligatorias:</label>
          <input {...register("hrsObligatorias", { required: true })} className="form-control" type="number" />
          {errors.hrsObligatorias && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Guardar</button>
        </div>
      </form>
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Legajo</th>
            <th>Nombre</th>
            <th>Cantidad de Horas Obligatorias</th>
            <th>Botones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((e) => {
            return (
              <tr key={e.legajo}>
                <td>{e.legajo}</td>
                <td>{e.nombre}</td>
                 <td>{e.hrsObligatorias}</td>
                <td className="text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/empleados/editar/${e.legajo}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminar(e.legajo)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>


    </main>
    )
}

export default FormularioEmpleado