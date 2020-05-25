import React, { useCallback } from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import CardMap from '../components/CardMap'
import Modal from '../components/Modal'

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

    const cards = articulos.map(art => <CardMap art={art} key={art._id} id={art._id}
        title={art.title} body={art.body} handleClick={handleClick} DeleteArticle={DeleteArticle} />)

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
            <Modal articuloEditado={articuloEditado} handleChangeModal={handleChangeModal}
                ArticlePuting={ArticlePuting} />
        </div>
    );
}

export default HomePages;
