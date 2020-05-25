import React from 'react'
import imagen404 from '../Imagenes/imagenError404.jpg'

function Page404() {
    return (
        <>
            <div className='text-center'>
                <h1 className='display-1 py-3'>Error 404</h1>
                <h1>No Existe Lo Que Buscas</h1>
            </div>
            <div className='d-flex justify-content-between'>
                <div>
                    <img src={imagen404} alt="" />
                </div>

            </div>
        </>
    )
}

export default Page404;