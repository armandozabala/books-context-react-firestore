import React, { useState, useEffect, useContext } from 'react'
import {db} from '../firebase';
import { LibroContext } from '../context/LibroProvider';
import { UsuarioContext } from '../context/UsuarioProvider';

const PintarAutor = (props) => {

    const [autor, setAutor] = useState('');

    const { fetchLibros } = useContext(LibroContext);
    const { usuario } = useContext(UsuarioContext);

    useEffect(() => {
            fetchAutor();
    },[])

    const eliminarLibro = async () => {

        try
        {
            await db.collection('libros').doc(props.id).delete();
            fetchLibros();
        }
        catch(error)
        {
            console.log(error);
        }

    }

    const fetchAutor = async () => {
            try{
                const res =  await props.referencia.get();
                console.log(res.data())
                setAutor(res.data().email)
            }catch(error){
                console.log(error)
            }
    };


    return (
        <div>
            <span>{autor}</span>
            {
                (autor == usuario.email || usuario.rol === 'admin') && (
                <button 
                    className="btn btn-danger float-right"
                    onClick={() => eliminarLibro()}
                    >
                    Eliminar
                </button>           
                )
            }
            
        </div>
    )
}

export default PintarAutor
