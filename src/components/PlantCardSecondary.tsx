import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-native';
import { Feather } from '@expo/vector-icons';


// arquivo baixado por fora (instalado na parte de navegação, react-navagation)
// traz as características do botão + as da características da plataforma como padrão
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

// para fazer o swipe(deslizar para o lado) e aparecer para excluir a planta salva
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// importar a biblioteca que trabalha com imagens SVG, já que as imagens da nossa api estão em svg
import { SvgFromUri } from 'react-native-svg';

// definir oq q vai ter o nosso cartão
// tipagem
interface PlantProps extends RectButtonProps {
    // usando o data comum geral para mandar de uma vez as informações e não precisar passar muitas propriedades la no arquivo
    data:{
        name: string;
        // OBS: a foto está vindo em formato svg, ent tempos que trabalhar junto a biblioteca svg do expo
        photo: string;
        // pegar o horário que será regada
        hour: string;
    };
    // vamos tipar uma função, ent nosso elemento, além de dados, tbm receberá uma função 
    handleRemove: () => void;
}

// já desestruturando (?)
// pegando data, ...rest de PlantProps que já deixou os dados de forma correta
export const PlantCardSecondary = ({ data, handleRemove, ...rest} : PlantProps) => {
    return(

        <Swipeable /* colocando ele aq para conseguir pegar ele todo e nn so uma parte */
            // para bloquear o movimento pro lado direito (so vamos usar o esquerdo)
            overshootRight={false}
            // aqui q vai renderizar o botão de deletar 
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather
                                // icone de lixo
                                name='trash'
                                size={32}
                                color={colors.white}
                            />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={styles.conteiner}
                // resto das propriedades colocadas
                {...rest}
            >

                <SvgFromUri 
                    /* foto da planta, usando um componente da biblioteca para trabalhar com fts SVG */
                    uri={data.photo}
                    width={50}
                    height={50}
                /> 

                <Text style={styles.title} /* nome da planta */>
                    {data.name}
                </Text>

                <View style={styles.details}>
                    <Text style={styles.time}>
                        Regar às
                    </Text>
                    <Text style={styles.timeLabel}>
                        {data.hour}
                    </Text>
                </View>

            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5
    },
    title:{
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    details:{
        alignItems: 'flex-end',
    },
    timeLabel:{
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time:{
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    buttonRemove:{
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingLeft: 15,
        right: 20
    }
});