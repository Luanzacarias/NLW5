import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';

// arquivo baixado por fora (instalado na parte de navegação, react-navagation)
// traz as características do botão + as da características da plataforma como padrão
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

// importar a biblioteca que trabalha com imagens SVG, já que as imagens da nossa api estão em svg
import { SvgFromUri } from 'react-native-svg';

// definir oq q vai ter o nosso cartão
// tipagem
interface PlantProps extends RectButtonProps {
    // usando o data comoum geral para mandar de uma vez as informações e não precisar passar muitas propriedades la no arquivo
    data:{
        name: string,
        // OBS: a foto está vindo em formato svg, ent tempos que trabalhar junto a biblioteca svg do expo
        photo: string
    }
}

// já desestruturando (?)
// pegando data, ...rest de PlantProps que já deixou os dados de forma correta
export const PlantCardPrimary = ({ data, ...rest} : PlantProps) => {
    return(
        <RectButton
            style={styles.conteiner}
            // resto das propriedades colocadas
            {...rest}
        >

            <SvgFromUri 
                /* foto da planta, usando um componente da biblioteca para trabalhar com fts SVG */
                uri={data.photo}
                width={70}
                height={70}
            /> 
            
            <Text style={styles.text} /* nome da planta */>
                {data.name}
            </Text>

        </RectButton>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        // pra pegar tds os lados logo
        margin: 10
    },
    text:{
        color: colors.green_dark,
        fontFamily: fonts.heading,
        // mesmo efeito de colocar marginTop e marginBotton, sendo que ai já vai se vez os dois
        marginVertical: 16
    }
});