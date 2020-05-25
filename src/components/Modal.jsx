import React from 'react'


function Modal(props) {
    return (
        <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{`ID:${props.id}`}</h5>
                    </div>
                    <div className="modal-body">
                        <div>
                            <input type="text" value={props.articuloEditado.title} name='title'
                                className="form-control col-6" aria-describedby="emailHelp"
                                placeholder='Titulo' onChange={props.handleChangeModal} />

                            <div className='pt-3'>
                                <textarea name="body" value={props.articuloEditado.body} cols="30" rows="3" placeholder='Mesaje' onChange={props.handleChangeModal} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={props.ArticlePuting} className="btn btn-outline-primary w-100"
                            data-dismiss="modal">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Modal;