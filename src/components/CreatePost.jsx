import React from 'react'


function CreatePost(props) {
    return (
        <div className='d-flex justify-content-center'>
            <form onSubmit={props.handleSubmit}>
                <div className='d-flex'>
                    <div>
                        <div className="form-group">
                            <input type="text" name='title' className="form-control" aria-describedby="emailHelp"
                                placeholder='Titulo' onChange={props.handleChange} />
                        </div>
                        <div className="form-group">
                            <textarea name="body" id="" cols="30" rows="3" placeholder='Mesaje' onChange={props.handleChange} />
                        </div>
                    </div>
                    <div className='d-flex ml-3' style={{ height: '130px' }}>
                        <button type="submit" className="btn btn-outline-primary">Crear Noticia</button>
                    </div>
                </div>
            </form>
        </div>
    );

}


export default CreatePost;