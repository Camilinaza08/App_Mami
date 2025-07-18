import { NavLink } from "react-router-dom";

export default function Encabezado() {
    return (
        <header className="bg-dark text-white py-3 mb-4">
            <div className="container py-5 h-100 position-relative">
                <nav className="mt-3">
                  <ul
                      className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm justify-content-center"
                      id="pillNav"
                  >
                      <li className="nav-item">
                          <NavLink
                              to="/horarios/lista"
                              className="nav-link rounded-5"
                              activeclassname="active"
                          >
                              Horarios
                          </NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink
                              to="/horarios/nuevo"
                              className="nav-link rounded-5"
                              activeclassname="active"
                          >
                              Nuevo Horario
                          </NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink
                              to="/empleados/nuevo"
                              className="nav-link rounded-5"
                              activeclassname="active"
                          >
                              Nuevo Empleado
                          </NavLink>
                      </li>
                  </ul>
                </nav>
            </div>
        </header>
    );}