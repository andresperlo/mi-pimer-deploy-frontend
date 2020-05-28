import React from 'react';
import { Link } from 'react-router-dom'

function CardMap(props) {

    return (

        <div key={props.id} className="card" style={{ width: '18rem' }}>
            <div className="card-body">
               <Link to={`/articulo/${props.id}`}><h5 className="card-title">{props.title}</h5></Link>
                <p className="card-text">{props.body}</p>
                <div className='d-flex'>
                    <div className='mr-3'>
                        <button type="button" onClick={() => props.handleClick(props.art)} className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
                            Modificar
                        </button>
                        {/* aqui estaba el modal */}
                    </div>
                    <div className='ml-3'>
                        <button onClick={() => props.DeleteArticle(props.id)} className="btn btn-outline-danger">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardMap;