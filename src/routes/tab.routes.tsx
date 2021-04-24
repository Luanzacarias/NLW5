// navegação pela barra inferior 
// baixado lá do react-navigation

import React from 'react';
import {Platform} from 'react-native';

// baixado da part "tab" do site do react navagation
// pra criar os boõtes de navegação
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// nosso arquivo de cores
import colors from '../styles/colors';

// Nossas pages para rotas
import { PlantSelect } from '../pages/PlantSelect';
import { MyPlants } from '../pages/MyPlants';

// icones 
import { MaterialIcons } from '@expo/vector-icons';


// AppTab está se transformando basicamente na própria função
const AppTab = createBottomTabNavigator();

// rotas autenticadas
const AuthRoutes = () => {
    return(
        <AppTab.Navigator
        // opções da tab
            tabBarOptions={{
                // quando tiver ativo ele usa essa cor:
                activeTintColor: colors.green,
                // qunado nn estiver ativo fica com essa cor
                inactiveTintColor: colors.heading,
                // para os ícones ficarem um do lado do outro
                labelPosition: 'beside-icon',
                style:{
                    // se a plataforma for ios tem padding de 20, se nn nn tem (para ficar mais bnt no android)
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88
                },
            }}
        >
            
            <AppTab.Screen 
                // começar a criar as rotas 
                // nome da rota
                name='Nova planta'
                // component que ela abre ao chamar
                component={PlantSelect}
                //opções
                options={{
                    // definir o ícone dele
                    // size e color são pegos lá em cima em tabBarOptions, tornando-se dinâmicos
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons
                            name='add-circle-outline'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
  
            <AppTab.Screen 
                // começar a criar as rotas 
                // nome da rota
                name='Minhas plantas'
                // component que ela abre ao chamar
                component={MyPlants}
                //opções
                options={{
                    // definir o ícone dele
                    // size e color são pegos lá em cima em tabBarOptions, tornando-se dinâmicos
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />


        </AppTab.Navigator>
        
    )
}

export default AuthRoutes;