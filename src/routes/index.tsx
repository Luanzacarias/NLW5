import React from 'react';
// NavigationContainer vai definir como vai ser o conteiner de navegação 
import {NavigationContainer} from '@react-navigation/native';

import StackRoutes from './stack.routes'

// quando alguem chamar por um nome de tela ele vai entregar o componente certo
// e isso está centralizado em um conteiner de navedação (esse arquivo)

const Routes = () => (
    <NavigationContainer>
        <StackRoutes />
    </NavigationContainer>
)

export default Routes;