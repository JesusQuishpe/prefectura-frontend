import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Caja from './components/caja/Caja';
import Enfermeria from './components/enfermeria/Enfermeria';
import { Laboratorio } from './components/laboratorio/Laboratorio';
import { Login } from './components/login/Login';
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';
import { Menu } from './components/Menu';
function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" exact element={<Login />}></Route>
            <Route path="caja" exact element={<Caja />}></Route>
            <Route path="enfermeria" exact element={<Enfermeria />}></Route>
            <Route path="laboratorio/*" exact element={<Laboratorio />}></Route>

          </Routes>
        </UserContext.Provider>

      </Router>
    </div>
  );
}

export default App;
