import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Encabezado from "./componentes/Encabezado.jsx";
import PiePagina from "./componentes/PiePagina.jsx";
import Horario from "./pages/Horario.jsx";
import FormularioEmpleado from "./pages/FormularioEmpleado.jsx";
import FormularioHorario from "./pages/FormularioHorario.jsx";

function App() {

  return (
    <BrowserRouter>
      <div className="container-md mt-5">
      <Encabezado />
      <Routes>
        <Route path="/" element={<Navigate to="/horarios/lista" />} />
        <Route path="/horarios/lista" element={<Horario />} />
        <Route path="/horarios/nuevo" element={<FormularioHorario />} />
        <Route path="/horarios/editar/:id" element={<FormularioHorario />} />
        <Route path="/empleados/nuevo/" element={<FormularioEmpleado />} />
         <Route path="/empleados/editar/:legajo" element={<FormularioEmpleado />} />
      </Routes>
      <PiePagina />
      </div>
    </BrowserRouter>
  );
}

export default App;
