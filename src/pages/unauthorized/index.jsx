import React from 'react'

import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';

const Unauthorized = () => {
    return(
        <div style={{justifyContent: 'center', textAlign: 'center'}}>
            <Menu />
            <div style={{marginTop: '3em'}}>
                <h1>Você não tem permissão para acessar essa página...</h1>
                <a href='/'>Voltar para Home</a>
            </div>
            <Rodape />
        </div>
    )
}

export default Unauthorized;