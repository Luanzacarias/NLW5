// Telas de confirmações
import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';

import {Button} from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

// vamos fazer com essa tela de login possa ser reutilizada
// fazer a tipagem
interface Params{
    title: string;
    subTitle: string;
    buttonTitle: string;
    // vai porder ser tanto um como o outro emoji
    icon: 'smile' | 'hug';
    // pra saber pra qual tela vai 
    nextScreen: string
}

// so pra facilitar a escolha dos emojis
const emojis = {
    hug: '🤗',
    smile: '😄'
}

export function Confirmation(){

    // com ele que conseguimos fazer a navegação (além dos outros arquivos)
    const navegation = useNavigation();

    // recuperar os parâmetros
    const routes = useRoute();

    // vamos já desestruturando e passando os parâmetros pra dentro de routes pra quando for usar preencher eles
    const {
        title,
        subTitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    function handleMoveOn(){
        navegation.navigate(nextScreen);
    }

    return(

        <SafeAreaView style={styles.conteiner}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subTitle}
                </Text>
                <View style={styles.footer}>
                    <Button 
                        title={buttonTitle}
                        onPress={handleMoveOn}
                    />
                </View>
            </View>

            
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight, // so pra ajudar o SafeAreaView no android
    },
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    title:{
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 30,
        marginTop: 15
    },
    subtitle:{
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 10,
        color: colors.heading
    },
    emoji:{
        fontSize: 78
    },
    footer:{
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    }
});