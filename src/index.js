import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import UsuarioProvider from './context/UsuarioProvider';
import LibroProvider from './context/LibroProvider';

ReactDOM.render(
  <React.StrictMode>
     <UsuarioProvider>
       <LibroProvider>
           <App />
       </LibroProvider>
    </UsuarioProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


