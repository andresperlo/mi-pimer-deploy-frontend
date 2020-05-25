import React, { useCallback } from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

function HomePages() {

    const [nuevoArticulo, setNuevoArticulo] = useState({})
    const [articulos, setArticulos] = useState([]);
    const [articuloEditado, setArticuloEditado] = useState({ title: '', body: '' })

    const traerArticulos = useCallback(async () => {
        const res = await axios.get(`/.netlify/functions/api/v1/articulos`);
        setArticulos(res.data)
    }, []);

    useEffect(() => {
        traerArticulos()
    }, [traerArticulos])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/.netlify/functions/api/v1/articulos', nuevoArticulo)
            .then(function (res) {
                Swal.fire(
                    'Se ha Creado una Nueva Card',
                    'Bien ahi!',
                    'success'
                )
                traerArticulos()
            })
            .catch(function (error) {
                console.log(error)
            })
        setNuevoArticulo(e.target.reset())
    }

    const DeleteArticle = (id) => {
        axios.delete(`/.netlify/functions/api/v1/articulos/${id}`)
            .then((res) => {
                Swal.fire(
                    'Se ha Eliminado la Card',
                    '',
                    'success'
                )
                traerArticulos()
            });
    }

    const ArticlePuting = (e) => {
        e.preventDefault();
        const { title, body } = articuloEditado;
        axios.put(`/.netlify/functions/api/v1/articulos/${articuloEditado._id}`, { title, body })
            .then((res) => {
                Swal.fire(
                    'Se ha Modificado la Card',
                    '',
                    'success'
                )
                traerArticulos()
            })
            .catch((err) => {

                Swal.fire(
                    'Error',
                    err.response.data.mensaje,
                    'warning'
                )
            });
    }

    const handleChange = (e) => {
        setNuevoArticulo({ ...nuevoArticulo, [e.target.name]: e.target.value })
    }

    const handleChangeModal = (e) => {
        setArticuloEditado({ ...articuloEditado, [e.target.name]: e.target.value })
    }

    const handleClick = (art) => {
        setArticuloEditado(art)
    }

    const cards = articulos.map(art =>
        <div key={art._id} className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{art.title}</h5>
                <p className="card-text">{art.body}</p>
                <div className='d-flex'>
                    <div className='mr-3'>
                        <button type="button" onClick={() => handleClick(art)} className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
                            Modificar
                </button>
                        {/* aqui estaba el modal */}
                    </div>
                    <div className='ml-3'>
                        <button onClick={() => DeleteArticle(art._id)} className="btn btn-outline-danger">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>)

    return (
        <div className="App">
            <h1 className='py-3 text-center'>Home Page</h1>
            <div className='d-flex justify-content-center'>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex'>
                        <div>
                            <div className="form-group">
                                <input type="text" name='title' className="form-control" aria-describedby="emailHelp"
                                    placeholder='Titulo' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <textarea name="body" id="" cols="30" rows="3" placeholder='Mesaje' onChange={handleChange} />
                            </div>
                        </div>
                        <div className='d-flex ml-3' style={{ height: '130px' }}>
                            <button type="submit" className="btn btn-outline-primary">Crear Noticia</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container">
                <div className="card-columns pt-3">
                    {cards}
                </div>
            </div>
            {/* modal */}
            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <input type="text" value={articuloEditado.title} name='title'
                                    className="form-control col-6" aria-describedby="emailHelp"
                                    placeholder='Titulo' onChange={handleChangeModal} />

                                <div className='pt-3'>
                                    <textarea name="body" value={articuloEditado.body} cols="30" rows="3" placeholder='Mesaje' onChange={handleChangeModal} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={ArticlePuting} className="btn btn-outline-primary w-100"
                                data-dismiss="modal">Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePages;
