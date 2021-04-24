import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

// todas as pages para as rotas
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { Welcome } from '../pages/Welcome';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';
import AuthRoutes from './tab.routes';

const stackRoutes = createStackNavigator();

// Pra ser sincero entendi quase nada

// quando alguem chamar por um nome de tela ele vai entregar o componente certo
// e isso está centralizado em um conteiner de navedação (index.tsx)
const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            },
        }}
    >

    
    <stackRoutes.Screen 
        //definindo qual vai ser a navegação
        name="Welcome"
        //nome da tela e o componente que quer usar
        component={Welcome}
    />

    <stackRoutes.Screen 
        //definindo qual vai ser a navegação
        name="UserIdentification"
        //nome da tela e o componente que quer usar
        component={UserIdentification}
    />

    <stackRoutes.Screen 
        //definindo qual vai ser a navegação
        name="Confirmation"
        //nome da tela e o componente que quer usar
        component={Confirmation}
    />

    <stackRoutes.Screen
        //definindo qual vai ser a navegação
        name="PlantSelect"
        //nome da tela e o componente que quer usar
        component={AuthRoutes}
    />

    <stackRoutes.Screen
        //definindo qual vai ser a navegação
        name="PlantSave"
        //nome da tela e o componente que quer usar
        component={PlantSave}
    />  

    <stackRoutes.Screen
        //definindo qual vai ser a navegação
        name="MyPlants"
        //nome da tela e o componente que quer usar
        component={AuthRoutes}
    />  
 
    </stackRoutes.Navigator>
)

export default AppRoutes;