import React, { useCallback } from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'

function HomePages() {

    const history = useHistory()
    const params = useParams()
    const [articulo, setArticulo] = useState({});

    const traerArticulo = useCallback(async () => {
        const res = await axios.get(`/.netlify/functions/api/v1/articulos/${params.id}`);
        setArticulo(res.data)
    }, [params.id]);

    useEffect(() => {
        traerArticulo()
    }, [traerArticulo])

    const volver = () =>{
        history.goBack()
    }

    return (
        <div className="App">
           
            <h1 className='py-3 text-center'>Article Page</h1>
            <button type="button" onClick={volver} className="btn btn-outline-primary ml-5 mt-5">Atras</button>
            <div className="container">
                <div className="card-columns pt-3">
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">{articulo.title}</h5>
                            <p className="card-text">{articulo.body}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomePages;
