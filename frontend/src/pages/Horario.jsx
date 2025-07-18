import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import horariosService from "../services/horarios.service"


const Horario = () =>{
    const [horarios, setHorarios] = useState([])
    const [filtros, setFiltros] = useState({
        nombre: "",
        fechaDesde: "",
        fechaHasta:""

    })
    
    const navigate = useNavigate();

    const cargar = async()=>{
        const data = await horariosService.cargar()
        setHorarios(data)
    }

    const buscar = async() => {
        const data = await horariosService.buscar(filtros)
        setHorarios(data)
    }

    const eliminar = async (id) => {
        if (confirm("¿Seguro que desea eliminar este registro?")) {
      await horariosService.eliminar(id);
      buscar();
    }}

    useEffect(()=> {
        cargar()
    },[])

    return(
       <div className="container my-4">
      <h2 className="mb-4">Listado de Horarios</h2>
      <form className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por empleado"
            value={filtros.nombre}
            onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
          />
        </div>
         <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            placeholder="Buscar por fecha Desde"
            value={filtros.fechaDesde}
            onChange={(e) => setFiltros({ ...filtros, fechaDesde: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            placeholder="Buscar por fechaHasta"
            value={filtros.fechaHasta}
            onChange={(e) => setFiltros({ ...filtros, fechaHasta: e.target.value })}
          />
        </div>
         
        <div className="col-12 d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-primary" onClick={buscar}>Filtrar</button>
        </div>
      </form>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Legajo</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Horas Extras</th>
            <th>Botones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((h) => {
            return (
              <tr key={h.id}>
                <td>{h.empleado?.legajo}</td>
                <td>{h.empleado?.nombre}</td>
                 <td>{h.fecha}</td>
                 <td>{h.extras}</td>
                <td className="text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/horarios/editar/${h.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminar(h.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    )
}

export default Horario