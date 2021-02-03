import React, { createContext, useEffect, useState } from 'react'
import { db } from '../firebase';

export const LibroContext = createContext();

const LibroProvider = (props) => {

    const [libros, setLibros] = useState([]);

    useEffect(() => {
         fetchLibros();
    },[])

    const fetchLibros = async () => {

        try{
            const res = await db.collection('libros').get();
            const arrayLibros = res.docs.map( doc => {
                 return {
                     ...doc.data(),
                     id: doc.id
                 }
            })
            setLibros(arrayLibros);
        }catch(error){
            console.log(error)
        }

    }

    return (
        <LibroContext.Provider value={{libros, fetchLibros}}>
            { props.children}
        </LibroContext.Provider>
    )
}

export default LibroProvider
