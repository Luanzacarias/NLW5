import React from 'react';
import {
    SafeAreaView,
    Text,
    Image, 
    TouchableOpacity, 
    StyleSheet,
    StatusBar, // so pra ajudar o SafeAreaView no android
    Dimensions, // Obtem informação sobre a dimensão da tela de forma dinâmica
    View, 

} from 'react-native';
import { Feather } from '@expo/vector-icons'

import wateringImg from "../assets/watering.png";
import colors from '../styles/colors';
import fonts from '../styles/fonts';
// para navegação
import { useNavigation } from '@react-navigation/core';


export function Welcome(){

    // com ele que conseguimos fazer a navegação (além dos outros arquivos)
    const navagation = useNavigation();

    function handleStart(){
        // vai navegar até a pag com o nome '' e vai olhar la no stack.routes a qual componente ele se refere
        navagation.navigate('UserIdentification')
    }

    return(
        // usando um View para dar um paddind a mais, pois o SafeAreaView nn suporta
        // (wrapper = "embrulho")
        <SafeAreaView style={styles.conteiner}>
            
            <View style={styles.wrapper}> 

                <Text style={styles.title} /* {'\n'} faz a quebra para baixo do texto */ >
                    Gerencie {'\n'} 
                    suas plantas de{'\n'}
                    forma fácil
                </Text>
            
                <Image 
                    source={wateringImg} 
                    style={styles.image} 
                    resizeMode="contain" 
                />

                <Text style={styles.subTitle}>
                    Não esqueça mais de regar suas plantas. 
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity 
                    style={styles.button}
                    // isso é a transparência do proprio TouchableOpacity, ai estamos regulando a intensidade disso.
                    activeOpacity={0.7}
                    // com a função handleStart a gnt vai chamar a função para a navegação
                    onPress={handleStart}
                >
            
                    
                    <Feather 
                        name='chevron-right' 
                        style={styles.buttonIcon}
                    />
                    

                </TouchableOpacity>

            </View>

        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    conteiner:{
        flex: 1
        // basicamente ele so está protegendo para que nada pegue nas bordas do aparelho
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        // espaço entre os itens
        justifyContent: 'space-around',
        marginTop:StatusBar.currentHeight, // so pra ajudar o SafeAreaView no android
        paddingHorizontal: 20
    },
    title:{
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subTitle:{
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image:{
        height: Dimensions.get('window').width * 0.7
        // basicamente ele ta pegando a dimenção da "janela" toda e usando 70% (0.7)
        // width = largura
    },
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
        paddingHorizontal: 10,
    },
    buttonIcon:{
        color: colors.white,
        fontSize: 32
    }
});