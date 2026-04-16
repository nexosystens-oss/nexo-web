import { Routes, Route, Navigate } from "react-router-dom";
import Login from './Paginas/Login/Login.jsx';
import BaixaFicha from './Paginas/BaixaFicha/BaixaFicha.jsx';


function App(){
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/baixa-ficha" element={<BaixaFicha />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App