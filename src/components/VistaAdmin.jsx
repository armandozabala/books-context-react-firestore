import React, { useState, useEffect } from 'react'
import { db, auth, functions } from '../firebase';

const VistaAdmin = () => {

    const  [usuarios, setUsuarios] =  useState([])

    useEffect(() => {
         fetchUsuarios();
    }, [])

    const fetchUsuarios  = async() => {

        try{
            const res = await db.collection('usuarios').get();
            const arrayUsuarios = res.docs.map(doc => doc.data());
            console.log(arrayUsuarios);
            setUsuarios(arrayUsuarios);

        }catch(error){
            console.log(error)
        }
    }

    const eliminarAutor = email => {
          const agregarRol = functions.httpsCallable('eliminarAutor');
          agregarRol({email: email})
          .then(res => {

            if(res.data.error){
                console.log("no tiene permiso");
                return; 
            }

            db.collection('usuarios').doc(email).update({
                 rol: 'invitado'
            }).then( user => {
                    console.log('usuario modificado');
                    fetchUsuarios();
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const eliminarAdministrador = email => {
        const agregarRol = functions.httpsCallable('eliminarAdministrador');
        agregarRol({email: email})
        .then(res => {

          if(res.data.error){
              console.log("no tiene permiso");
              return; 
          }

          db.collection('usuarios').doc(email).update({
               rol: 'invitado'
          }).then( user => {
                  console.log('usuario modificado');
                  fetchUsuarios();
          })
      }).catch(err => {
          console.log(err)
      })
   }

    const crearAutor = email => {
        const agregarRol = functions.httpsCallable('crearAutor');
        agregarRol({email: email})
        .then(res => {

            if(res.data.error){
                console.log("no tiene permiso");
                return; 
            }

            db.collection('usuarios').doc(email).update({
                 rol: 'autor'
            }).then( user => {
                    console.log('usuario modificado');
                    fetchUsuarios();
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const administrador = email => {
        
        if(!email.trim()){
            console.log("email vacio");
            return;
        }
        const agregarRol = functions.httpsCallable('agregarAdministrador');
        agregarRol({email: email})
        .then(res => {

            if(res.data.error){
                console.log("no tiene permiso");
                return; 
            }

            db.collection('usuarios').doc(email).update({
                 rol: 'admin'
            }).then( user => {
                    console.log('usuario modificado');
                    fetchUsuarios();
            })
        }).catch(err => {
            console.log(err)
        })

    }

    return (
        <div>
            <h2>Administracion de Usuarios</h2>
            {
                usuarios.map(usuario => (
                     <div key={usuario.uid} className="mt-3">
                         {usuario.email} - rol: {usuario.rol}

                          {
                                usuario.rol === 'admin' ? (
                                    <button className="btn btn-danger mx-2"
                                         onClick={() => eliminarAdministrador(usuario.email) }>
                                         Eliminar Administrador
                                    </button>
                                ): (
                                    <>
                                    <button className="btn btn-dark mx-2"
                                             onClick={() => administrador(usuario.email) }>
                                              Administrador
                                     </button>
                                    <button className="btn btn-success mx-2"
                                             onClick={() => crearAutor(usuario.email)}>
                                              Autor
                                     </button>
                                     <button className="btn btn-info mx-2"
                                             onClick={() => eliminarAutor(usuario.email)}>
                                             Invitado
                                     </button>
                                    </>
                                )
                          }

                     
                      </div>
                ))
            }
        </div>
    )
}

export default VistaAdmin
