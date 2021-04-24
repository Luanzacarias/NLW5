// TELA DE SALVAR A PLANTA SELECIONADA
import React, { useState } from 'react';
import {
    Alert,
    View, 
    StyleSheet,
    Image,
    // com o ScrollView, se o aparelho do usuário nn tiver o tamanho pra ver td a tela ele vai conseguir rolar a tela para ver 
    ScrollView,
    Platform, 
    TouchableOpacity,
    Text
} from 'react-native';
// pega o tamanho das bordas do iphone e acho q no android tbm
import { getBottomSpace } from 'react-native-iphone-x-helper';
// importar a biblioteca que lida com imagem em svg
import { SvgFromUri } from 'react-native-svg';

// importar o useRoute para poder pegar os dados trnsferidos lá de PlantSelect(os da API)
import { useNavigation, useRoute } from '@react-navigation/core';
// Para fazer a tipagem dos dados da api
// para fazer o salvamento no dispositivo do usuário
import { loadPlant, PlantProps, savePlant } from '../libs/storage';

// importar a biblioteca do expo "datetimepicker" para usar na hr de configurar a seleção de dia e horário
// Event para tipar o evento de seleção do horário
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
// importar a biblioteca que podemos usar para conferir se a data selecionada já passou
import { format, isBefore } from 'date-fns';

//importar a imagem de gota
import waterdrop from '../assets/waterdrop.png';
// nosso botão criado
import { Button } from '../components/Button';
// nosso pack de cores e fontes
import colors from '../styles/colors';
import fonts from '../styles/fonts';



// Interface para tipar plants (dados tranferido para essa page, os dados sobre as plantas)
interface Param {
    // definição lá na API(no json dela)
    plant: PlantProps
}

export function PlantSave(){

    // para conseguir pegar os dados transferidos para essa page
    const route = useRoute();
   
    // pegando os dados já desestruturados 
    // tipagem la no Param
    const { plant } = route.params as Param;

    // armazenar o horário selecionado em DateTimePicker
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    
    // controlar pra quando vai aparecer ou não
    // o picker fica oculto até que você pressione o botão. No caso do ios é porque ele não é uma "popup" e acaba ficando bem agradável na tela.
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');


    // Para a navegação
    const navigation = useNavigation();



    // Função para alterar o tempo
    // ele recebe um evento e uma data que pode ou nn ser definida
    function handleChangeTime(event: Event, dateTime: Date | undefined){
        // se a plataforma for android ele coloca para mostrar o popup (o do ios fica bem mais agradável, ai pode deixar ativado)
        if(Platform.OS === 'android'){
            // fazer uma inversão true => false || false => true
            setShowDatePicker(oldState => !oldState);
        }
        
        // conferir se o usuário está escolhendo uma data que aindsa não passou
        // isBefore(dateTime, new Date()) ele olha se a data selecionada é antes(Before) do que a new Date(data atual, a do momento em q o user está usando)
        if(dateTime && isBefore(dateTime, new Date())){
            // passa a data atual para sair da antiga
            setSelectedDateTime(new Date);
            return Alert.alert('Escolha uma data no Futuro! ⏰')
        }

        // se o tempo for correto ele vai salvar 
        if (dateTime){
            setSelectedDateTime(dateTime);
        }

    }

    // Função que funciona apenas no ANDROID
    function handleOpenDateTimePickerForAndroid(){
        // pegamos e alteramos o estado
        // fazer uma inversão true => false || false => true
        setShowDatePicker(oldState => !oldState);
    }
    

    // FUÇÃO PARA LIDAR COM O SALVAMENTO DA PLANTA SELECIONADA
    // async por causa do await
    async function handleSave() {
        
        /* 
            se quiser ver como ele salvou o arquivo, descomenta isso:
            const data = await loadPlant();
            console.log(data);

            e comenta o resto dessa função
        */
        // usando dessa forma, com o try, pq la em storage.ts ele ta usando, ai precisa usar para pegar o erro, se tive
        try {
            await savePlant({
                // pegar a própria planta selecionada e o horário colocado
                ...plant, dateTimeNotification: selectedDateTime
            });

        }catch{
            Alert.alert('Não foi possível salvar. 😥')
        }

        // Fazer a navegação para a tela de confirmação(confirmatio)
        navigation.navigate('Confirmation', {
            title: 'Tudo certo',
            subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
            buttonTitle: 'Muito obrigado :D',
            icon: 'hug',
            nextScreen: 'MyPlants'
        });

    }


    return(
        
        <ScrollView /* se a tela for pequena, o usuário consegue rolar a tela */
            // para nn aparecer a barra vertical
            showsVerticalScrollIndicator={false}
            // nn vamos usar o msm do conteiner pq o flex:1 impossibilita o scroll da tela, ent fazemos uma so pra ele com essa mudança (flexGrow)
            contentContainerStyle={styles.scrollListContainer}
        >
            <View style={styles.conteiner}>

                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />

                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipConteiner}>
                        <Image
                            // imagem que foi desponibilizada pelo curso => src/assats
                            source={waterdrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {   
                        // mostrar so se ele estuver ativado, deste modo ao abrir no android ele nn abre de vez o popup
                        // no ios deixamos ativado no estado inicial, la no useState do showDatePicker
                        showDatePicker &&(
                            <DateTimePicker 
                                // tem o valor armazenado 
                                value={selectedDateTime}
                                // modo dele, no caso da gnt é o timer(pra tempo)
                                mode='time'
                                    
                                display='spinner'
                                // função para alterar o tempo configurado
                                onChange={handleChangeTime}
                            />
                    )}

                    {
                        // se for no android vai ter uma coisa indicando para clicar e definir o horário
                        // pq ao tocar nele ele vai abrir o popup
                        Platform.OS === 'android' && (
                            <TouchableOpacity 
                                style={styles.dateTimePickerButton}
                                // chamar a função pra mudar o estado do showDateTime
                                onPress={handleOpenDateTimePickerForAndroid} 
                            >
                                <Text style={styles.dataTimePickerText} /* concatenado com crase */>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}` /* HH:mm representa que so quer horas e minutos */}
                                </Text>
                            </TouchableOpacity>    
                        )
                    }

                    <Button
                        // Nosso componente button lá de components
                        title='Cadastrar planta'
                        // passando a função que lida com o salvamento da planta selecionada
                        onPress={handleSave}
                    />

                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollListContainer:{
        // Não usa flex:1 nele pq impossibilita a rolagem da tela
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    conteiner:{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo:{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        // o paddindBottom no iphone vai ser pelo getBottomSpace e como no android retorna 0 ele passa 20
        paddingBottom: getBottomSpace() || 20
    },
    plantName:{
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout:{
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 12,
        marginTop: 10
    },
    tipConteiner:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage:{
        width: 56,
        height: 56
    },
    tipText:{
        flex: 1,
        paddingLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'center'
    },
    alertLabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },
    dataTimePickerText:{
        color: colors.heading,
        fontSize: 25,
        fontFamily: fonts.text
    }
})