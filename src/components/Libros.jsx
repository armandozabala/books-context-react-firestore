import React, {useContext} from 'react'

import { LibroContext } from '../context/LibroProvider'
import PintarAutor from './PintarAutor';

const Libros = () => {

    const {libros} = useContext(LibroContext);

    return (
        <div className="mt-5">
            <h3>Lista de Libros</h3>
            <ul className="list-group">
                 {
                     libros.map(libro => (
                          <li key={libro.id} className="list-group-item">
                              <span>
                                {libro.titulo}
                              </span>
                              <span>
                                  <PintarAutor referencia={libro.autor} id={libro.id}/>
                              </span>
                          </li>
                     ))
                 }
            </ul>
        </div>
    )
}

export default Libros
