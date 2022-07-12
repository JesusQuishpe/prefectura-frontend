import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'antd/dist/antd.css';

import { Login } from './components/login/Login';
import { Home } from './components/Home';
import { ToastProvider } from './contexts/ToastContext';
import { UserProvider } from './contexts/UserContext';
import { DeleteModalProvider } from 'contexts/DeleteModalContext';
import { LoaderProvider } from 'contexts/LoaderContext';
import { NotFound } from 'components/NotFound';
import { QRModalProvider } from 'contexts/QrModalContext';


function App() {
  return (
    <div className="App">
      <Router basename={process.env.REACT_APP_BASENAME}>{/*El basename basename='/tesis-sistema/tesis-backend/public/ se agrega solo para ejecutar el comando npm run build */}
        <ToastProvider>
          <LoaderProvider>
            <UserProvider>
              <DeleteModalProvider>
                <QRModalProvider>
                  <Routes>
                    <Route path="/*" element={<Home />}>
                    </Route>
                    <Route path="/login" exact element={<Login />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                  </Routes>
                </QRModalProvider>
              </DeleteModalProvider>
            </UserProvider>
          </LoaderProvider>
        </ToastProvider>
      </Router>
    </div>
  );
}

export default App;
