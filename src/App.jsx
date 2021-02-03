
import React , {useContext} from 'react'
import AgregarLibros from './components/AgregarLibros';
import Libros from './components/Libros';
import Navbar from './components/Navbar'
import VistaAdmin from './components/VistaAdmin'

import { UsuarioContext } from './context/UsuarioProvider';

function App() {

  const {usuario} = useContext(UsuarioContext);

  return (
    <div>
          <Navbar/>
          <div className="container">
            {
               usuario.rol === 'admin' &&  <VistaAdmin/>
            }
            {
               usuario.rol === 'autor' && <AgregarLibros/>
            }
            <Libros/>
          </div>
         
    </div>
  );
}

export default App;
