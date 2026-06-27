import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <h1 style={{color:"white"}}>
            LOGIN TESTE OK
          </h1>
        } 
      />
    </Routes>
  );
}

export default App;