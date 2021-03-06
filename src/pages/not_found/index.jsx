import React from 'react'

import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';

import not_found from '../../assets/img/not_found.svg';

const NotFound = () => {
    return(
        <div style={{justifyContent: 'center', textAlign: 'center'}}>
            <Menu />
            <div style={{marginTop: '3em'}}>
                <img src={not_found} alt="404" style={{width: '500px'}} />
                <h1 style={{marginTop: '2em'}}>404... A página que você está procurando não existe.</h1>
                
                <a href='/'>Voltar para Home</a>
            </div>
            <Rodape />
        </div>
    )
}

export default NotFound;