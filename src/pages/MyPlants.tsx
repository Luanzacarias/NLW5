// Page que vai mostrar as plantas selecionadas

import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Alert
} from 'react-native';

//nosso componente de 'título'
import { Header } from '../components/Header';
// nosso componente de card secundário
import { PlantCardSecondary } from '../components/PlantCardSecondary';

// nosso pack de cores e fontes
import colors from '../styles/colors';
import fonts from '../styles/fonts';
//importar a imagem de gota
import waterdrop from '../assets/waterdrop.png';
// importndo nossa tipagem dos dados das plantas
// importanto a função que carrega os dados das plantas
// importando a função de remover a planta salva 
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
// Nosso component de tela de load
import { Load } from '../components/Load';

// pra saber qual é a distância de uma data a outra
import { formatDistance } from 'date-fns';
// localidade brasil, pra ter a localização quando buscar a data atual
import { pt } from 'date-fns/locale';







export function MyPlants() {

    // estado pegar os dados das plantas selecionada
    // tipando de acordo com o PlantProps
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);

    // estado da tela de loading para o carregamento dos dados
    // por padão true pra já estar ativado
    const [loading, setLoading] = useState(true);

    // estado que vai indicar a próxima regada
    const [nextWatered, setNextWatered] = useState<string>();

    // Para carregar os dados das plantas e ver qual é a próxima a ser regada assim que abrir a tela
    useEffect(() => {
        async function loadStoregeData() {
            // plantsStorege vai ficar com os dados carregados sobre as plantas que foram selecionadas
            const plantsStorege = await loadPlant();

            // calcula a distância entre duas datas
            const nextTime = formatDistance(
                // lá no loadPlants ele ordena por quem é mais próximo, vamos usar o [0] pq é o mais próximo
                // comparando o mais próximo com a hora atual 
                new Date(plantsStorege[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                // local do tempo atual
                { locale: pt}
            );
            
            // setar qual é a próxima planta a ser regada
            setNextWatered(
                // concatenado, usa crase
                // plantsStorege[0] pq ela é a próxima, ent o alerta principal vai estar com o dado da que está com o horário mais próximo
                `Não esqueça de regar a ${plantsStorege[0].name} à ${nextTime}.`
            )
            
            // armazenar os dados das plantas que foram carregados e estão em plantsStorege
            setMyPlants(plantsStorege);
            
            // Pra parar a telinha de loading
            setLoading(false);

        }

        // chamar a função pra rodar
        loadStoregeData();

    }, [])


    // FUNÇÃO PARA REMOVER A PLANTA SELECIONADA
    function handleRemove(plant: PlantProps) {
        // vamos fazer um alerta de confirmação de exclusão
        // (titulo, pergunta, [Vetor com algumas opções])
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            // passando duas opções de resposta (2 botões)
            {
                text: 'Não 🙏🏼',
                // style padrão
                style: 'cancel'
            },
            {
                text: 'Sim 👍🏼',
                // o que vai acontecer quando tocar? chama uma função async(pq temos que usar await) pra excluir
                onPress: async () => {
                    // tentar fazer essa ação e se der errado pega o erro
                    try{
                        // FUNÇÃO PARA REMOVER A PLANTA, lá no libs/storage.ts
                        await removePlant(plant.id);
                        
                        // dando td certo, atualizamos nossa lista 
                        // pega os dados antigos e faz atualização de estado, passando tds menos o da plant.id que foi solicitado para exclusão
                        setMyPlants((oldData) => 
                            // faz a filtragem e pegas tds menos o plant.id
                            // plant foi passado no começo da função
                            oldData.filter((item) => item.id !== plant.id)
                        );

                    }catch(error){
                        // Alertar caso nn consiga deletar
                        Alert.alert('Não foi possível remover!');
                        console.log(error.message)
                    }
                },
            }
        ]);
    }


        // por padrão ele entende q so roda se for vdd
    // chama a tela de loading(enqunato carrega os dados necessários solicitados no UseEffect) antes dessa tela
    if (loading)
        return <Load />
        // ela vai parar quando la no fetchPlants terminar de carregar


    return(
        <View style={styles.conteiner}>
            <Header/>

            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop} 
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas Regadas
                </Text>

                <FlatList 
                    // dados da flatListe
                    data={myPlants}
                    // pra questão de performace 
                    // identificar um identificador único
                    // nn necessariamente precisa desse string() pq já passamos la na tipagem dos dados da api que eles seriam string
                    keyExtractor={(item) => String(item.id)}
                    // renderItem chama uma função anônima para renderizar tds os itens
                    renderItem={({ item }) => (
                        // component do card das plantas da parte de minhas plantas
                        <PlantCardSecondary
                            data={item}
                            // função pra remover a planta selecionada
                            handleRemove={() => {handleRemove(item)}}
                        />
                    )}
                    // tirar a barra de rolagem vertical
                    showsVerticalScrollIndicator={false}
                    
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: colors.background
    },
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage:{
        width: 60,
        height: 60
    },
    spotlightText:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20
    },
    plants:{
        flex: 1,
        width: '100%'
    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    },

})