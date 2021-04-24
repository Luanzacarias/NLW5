import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
// arquivo baixado por fora (instalado na parte de navegação, react-navagation)
//traz as características do botão + as da características da plataforma como padrão
import { RectButton, RectButtonProps} from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

//fazer a tipagem dele
interface EnviromentButtonProps extends RectButtonProps{
    title: string,
    // vai ser pra saber se ele foi selecionado
    // como não é obrigatório selecionar ele, usa-se "?:"
    active?: boolean
}


export function EnviromentButton({
    // vai pegar esses dados para usar dps dos :
    title,
    // se alguém chamar esse componente e nn falar qual que é o artigo, por padrão é falso
    // selecionado ou nn
    active = false,
    // pegar o resto de propriedades que for colocado 
    ...rest

} : EnviromentButtonProps){
    return(

        <RectButton
            style={[
                // acumulando styles
                styles.conteiner,
                // se active tiver ativado ele vai colocar tbm esse style
                active && styles.conteinerActive
            ]}
            {...rest}
        >
            <Text style={[
                // acumulando styles
                styles.text,
                // se active tiver ativado ele vai colocar tbm esse style
                active && styles.textActive
                ]}>
                {title}
            </Text>

        </RectButton>


    )
}

const styles = StyleSheet.create({
    // quando desativado (não clicado, active=false) essa é a forma do conteiner, cor padrão
    conteiner:{
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },
    // quando ativado (clicado, active=true) essa é a forma do conteiner, a cor muda
    conteinerActive:{
        backgroundColor: colors.green_light
    },
    // quando desativado (não clicado, active=false) essa é a fonte e cor
    text:{
        color: colors.heading,
        fontFamily: fonts.text
    },
    // quando ativado (clicado, active=true) essa é a fonte e cor
    textActive:{
        color: colors.green_dark,
        fontFamily: fonts.heading
    }
})