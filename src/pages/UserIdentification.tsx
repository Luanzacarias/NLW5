import React, { useState } from 'react';
import {SafeAreaView, 
    StyleSheet, 
    Text, 
    View, 
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
// Vai ser usado para quando estiver usando teclado e usar em qualquer parte da ela, o teclado sumir

// biblioteca do expo para lidar com armazeamento de dados no proprio dispositivo do usuário
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// importando nosso botão universal
import {Button} from '../components/Button';
// para navegação
import { useNavigation } from '@react-navigation/core';

export function UserIdentification(){
   
    // PARA NAVEGAÇÃO
    // com ele que conseguimos fazer a navegação (além dos outros arquivos)
    const navigation = useNavigation();


    // armazenar se está ou não com teclado aberto
    const [isFocuses, setIsFocused] = useState(false);
    // armazenar se há informação no input
    const [isFilled,setIsFilled] = useState(false);
    // Pegar o nome de usuário (no msm local em que vê se há informação no input)
    // <string> tá tipando o conteúdo pra ser necessariamente uma string
    const [name, setName] = useState<string>('');

    // saiu do teclado
    function handleInputBlur(){
        setIsFocused(false);
        // se tiver conteúdo ele já fica ativado, msm se sair
        // como handleInputChange já pegou o conteúdo do input ent usamos o name
        setIsFilled(!!name);
    };

    // puxou o teclado
    function handleInputFocus(){
        setIsFocused(true);
    };

    // toda vez que o input muda
    function handleInputChange(value: string){
        // com as duas !! ele transforma a string pra boolean -> vazio = falso || preenchido = vdd
        setIsFilled(!!value);
        setName(value);
    }

    // FUNÇÃO DE CONFIRMAÇÃO DO NOME E NAVEGAÇÃO
    // "submeter"
    async function handleSubmit(){
        // se não tiver nada no nome produzimos um alerta ao usuário
        if(!name)
            return Alert.alert('Me diz como chamar você 😥')
        
            // vai tentar fazer oq está por vim, se der errado ele vai mostrar o alert
        try{

            // processo para salvar o nome do usuário no dispositivo
            // precisa de 2 critérios: key e string(valor)
            // toda vez que precisar do nome do usuário vou chamar pela key
            await AsyncStorage.setItem('@plantmanager:user', name);
            /* 
                como o AsyncStorage não tem resposta imediata, tormanamos a função assicrona 
                e usamos o await para esperar ela armazenar o dado
            */

            // vai navegar até a pag com o nome '' e vai olhar la no stack.routes a qual componente ele se refere
            // , {as condições da tela de Confirmation}
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subTitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        }catch{
            Alert.alert('Não foi possível salvar o seu nome. 😥')
        }
    }


    return(

        <SafeAreaView style={styles.conteiner}>
            <KeyboardAvoidingView
                // FAZER UMA ANIMAÇÃO PARA TUDO SUBIR COM O TECLADO (quando for acionado)
                // usando o msm style nn vai mudar emnada no nosso visual 
                style={styles.conteiner}
                // ios pq no android ele já sobe e usando ele sobe mais ainda
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} /* desativa o keyboard quando qualquer parte da tela for tocada quando o teclado for ativado */ >

                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header} /* só pra ele ficar uniforme e poder diminuir a velocidade com o keyboardingavoidview */>
                                <Text style={styles.emoji}>
                                    { 
                                        // se tiver preenchido 😀, se nn 😄
                                        isFilled ? '😄' : '😀'
                                    }
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos{`\n`}
                                    chamar você?
                                </Text>
                            </View>
                            <TextInput 
                                style={[
                                    // se o usuário nn estiver dentro do input ele vai usar o style padrão criado
                                    styles.input,
                                    // quando o usuário entrar no input a borda fica verde para indicar o usuário
                                    // || ou -> ou um ou outro
                                    (isFocuses || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite um nome"
                                // quando o uuário SAI do input
                                onBlur={handleInputBlur}
                                // quando o usuário ENTRA do input
                                onFocus={handleInputFocus}
                                // se for colocaado algo no campo de texto
                                onChangeText={handleInputChange}
                            />

                            <View style={styles.footer} /* uma View para o component não modificar a pag inteira, so a parte dele */>
                                <Button 
                                    // nossa solicitação title criada no arquivo do Button
                                    title='Confirmar'
                                    // Cliclar e ir para a página de confirmação
                                    onPress={handleSubmit}
                                />
                            </View>

                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
        width: "100%",
        //hz
        alignItems: 'center',
        //vt
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight, // so pra ajudar o SafeAreaView no android
    },
    content:{
        flex: 1,
        width: '100%'
    },
    form:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center', 
    },
    header:{
        alignItems: 'center'
    },
    emoji:{
        fontSize: 44
    },
    input:{
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title:{
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20
    },
    footer:{
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    }
});