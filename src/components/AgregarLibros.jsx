import React, { useState, useContext} from 'react'
import { db } from '../firebase';
import { UsuarioContext } from '../context/UsuarioProvider';
import { LibroContext } from '../context/LibroProvider';

const AgregarLibros = (props) => {

    const [titulo, setTitulo] = useState('');
    const [paginas, setPaginas] = useState('');

    const {usuario } = useContext(UsuarioContext);
    const {fetchLibros} = useContext(LibroContext);

    const agregarLibro = e => {
        e.preventDefault()
        if(!titulo.trim() || !paginas.trim()){
            console.log('vacios');
            return;
        }

        db.collection('libros').add({
             titulo: titulo,
             paginas: paginas,
             uid: usuario.uid,
             autor: db.collection('usuarios').doc(usuario.email)
        }).then(doc => {
            console.log(doc);
            fetchLibros();
        }).catch(err => {
            console.log(err)
        })

        setTitulo('');
        setPaginas('');
    }

    return (
        <div className="mt-5">
            <form onSubmit={agregarLibro}>
                 <input 
                     type="text"
                     placeholder="Titulo"
                     className="form-control mb-2"
                     onChange = { e => setTitulo(e.target.value)}
                     value={titulo}
                     />
                 <input 
                     type="text"
                     placeholder="Pagina"
                     className="form-control mb-2"
                     onChange = { e => setPaginas(e.target.value)}
                     value={paginas}
                     />
                 <button type="submit" className="btn btn-primary">
                     Agregar
                 </button>
            </form>
        </div>
    )
}

export default AgregarLibros
