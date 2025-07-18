import axios from "axios";

const instancia = axios.create({
  baseURL: "https://app-mami.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default instancia;
