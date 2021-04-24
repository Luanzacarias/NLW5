// Componente de cabeçalho

import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

// Deixar a imagem já definida pra nn precisar passa mais coisa na linha do código
import userImg from '../assets/Rodrigo.png';

import colors from '../styles/colors';
// Para ajudar a deixar com a marginTop certa no iphone que tem
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Header(){

    // Salvar o nome do usuário, que foi colocado em UserIdentification
    // <string> já ta tipando o conteúdo para string para nn termos problemas ao usá-lo
    const [userName, setUserName] = useState<string>();

    // Para carregar assim que abrir o app o nome do User
    useEffect( () => {
        // tem que usar uma função assincrona pra caso queira resgatar os dados vamos usar o await(uma vez que ele não retorna de imediato <Promise>)
        // como nn da pra fazer um async useEffect usamos uma função async dentro dele
        async function loadStoregeUserName() {
            // pegamos o item de asyncStore pela key
            const user = await AsyncStorage.getItem('@plantmanager:user');
            // se tiver algo em user então atualiza la para o userName, e se nn tiver deixa em branco(vazio)
            setUserName(user || '');
        }
        // chamar a função para ocorrer td o processo solicitado
        loadStoregeUserName();
    }, []); // no segundo vetor faz com que td vez que oq foi colocado for alterado ele recarregue o useEffect


    return(
        <View style={styles.conteiner}>
            <View /* os 2 text tem que ficar em uma view para eles se comportarem como 1 só, já que no style atem 'row' e 'space-between */>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>

            <Image source={userImg} style={styles.image} />

        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        width: '100%',
        // deixar os itens alinhados em linha, um do lado do outro
        flexDirection: 'row',
        // espaço entre os itens
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        // se quiser pode colocar backgroundColor: colors.red so pra ver o efeito
        marginTop: getStatusBarHeight()
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})