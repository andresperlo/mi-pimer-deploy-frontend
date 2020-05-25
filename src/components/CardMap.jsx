import React from 'react';

function CardMap(props) {
    return (
        <div key={props.key} className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
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