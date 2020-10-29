import React from 'react'

import Menu from '../../components/menu/index';
import Rodape from '../../components/rodape/index';

const NotFound = () => {
    return(
        <div>
            <Menu />
            <h1>404... A página que você está procurando não existe.</h1>
            <Rodape />
        </div>
    )
}

export default NotFound;