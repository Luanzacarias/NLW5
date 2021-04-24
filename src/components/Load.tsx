// TODO O SISTEMA DA TELA DE LOADING QUE VAI SER USADO DURANTE DO APP
// BIBLIOTECA LITTIE
// TEM QUE BAIXAR: expo install lottie-react-native

import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import LottieView from 'lottie-react-native';

// o json ja baixado na pag de src/assets com a animação, ai so chamar o arquivo
import loadAnimation from '../assets/load.json';

export function Load(){
    return(
        <View style={styles.conteiner} /* pra ela oculpar a tela td */>
            <LottieView 
                // a propria animação
                source={loadAnimation}
                // pra começar sozinha
                autoPlay
                // ficar em loop até acabar o carregamento
                loop
                style={styles.animation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation:{
        backgroundColor: 'transparent',
        width: 200,
        height: 200
    }
})