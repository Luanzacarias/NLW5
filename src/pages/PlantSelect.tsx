import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    // renderizar listas 
    FlatList,
    // pra fazer um botão de load
    // "ele é um loadizinho", aquele circulo que fica rodando
    ActivityIndicator
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// componente cabeçalho
import {Header} from '../components/Header';
// componente que faz a parte dos botões do enviroment(ambientes) 
import { EnviromentButton } from '../components/EnviromentButton';
// componente que faz a parte dos botões das plantas
import { PlantCardPrimary } from '../components/PlantCardPrimary';
// tela de loading (a animação já pronta)
import { Load } from '../components/Load';
// Para fazer a tipagem dos dados da api
import { PlantProps } from '../libs/storage';
// api que nesse caso é local
import api from '../services/api';
// para navegação entre as pages
import { useNavigation } from '@react-navigation/core';


// criar uma interface para tipar oq vem da api para a função assíncrona fetchEnviroment
// usada para pegar os locais(cômodos) lá na api
interface EnviromentProps{
    key: string;
    title: string;
}


export function PlantSelect(){
    // o "tipo" <EnviromentProps> e indicando que é uma coleção pelos [], já que será + de 1 recebido pela api
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);

    // um estado para os nomes e fotos das plantas
    // Plantprops chama a tipagem dos dados da api la no arquivo libs/storage.ts
    const [plants, setPlants] = useState<PlantProps[]>([]);

    // Descobrir o botão do filtro que está ativado (filtro = cômodos)
    const [enviromentSelected, setEnviromentSelected] = useState('all');


    // PARA FAZER O FILTRO, ARMAZENAR QUAL ESTÁ ATIVO E DPS SELECIONAR AS PLANTAS CORRESPONDENTES
    // estado auxiliar para não ficar fazendo requisição td hr na API
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);

    // ESTADO PARA LIDAR COM A TELA DE LOAD
    // por padrão ele é vdd (acionado)
    const [loading, setLoading] = useState(true);

    // estado para a navegação
    const navigation = useNavigation();


    // Estado para paginação
    const [page, setPage] = useState(1);
    // pra saber se tem mais coisa pra carregar
    const [loadingMore, setLoadingMore] = useState(false);


    // fetch = buscar
    // Função para buscar as plantas pela api
    async function fetchPlants() {
        // trazer o pedaço da api para o data
        // await espera até que tudo seja pego
        // ('plants') é o elemento do json que queremos pegar
        // usa-se crase
        /*
            ?_sort=name&_order=asc é um recurso do prorpio JSON-server para 
            pedar os dados de forma ordenada por ordem ascendente em função do título
            "https://github.com/typicode/json-server#getting-started" aqui o link  

            &_page=${page}&_limit=8 ta sendo usado pra melhorar a ambientação pro usuário
            PAGINAÇÃO
            ${} -> interpolação, ta pegando mostrando a pagina
            _limit=8 -> quer trazer apenas 8 itens por página
        */
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        // VERIFICAÇÃO 
        // se nn tem nada entra a tela de loading pra carregar
        if(!data){
            return setLoading(true);
        }
        // se a pagina for maior que 1 ele vai pegar o valor anterior e juntar com o novo
        if(page > 1){
            setPlants(oldvalue => [...oldvalue, ...data])
            setFilteredPlants(oldvalue => [...oldvalue, ...data])
        }
        else{
            // salvar os dados em plants para poder usar depois
            setPlants(data);
            // para quando abrir o app ele carregar por padão o "filtro todos"
            setFilteredPlants(data);
        }
    
        // PARAR A TELA DE LOADING
        setLoading(false);
        //
        setLoadingMore(false);
    }

    // função para trocar o estado active(selecionado ou nn || true/false) do item tocado, lá nos filtros
    // active está em EnvirimentedButton
    function handleEnrivomentSelected(enviroment: string){
        setEnviromentSelected(enviroment);
        // verificar se o ambiente selecionado é todos e assim não deixar a função prosseguir
        // e armazenar tds as plantas no estado de selecionados
        // já que por padão tds estão lá
        if (enviroment === 'all')
            return setFilteredPlants(plants);
        
        // se nn for todos ent vai ser percorrido um filtro dentro de plants(já que todos estão armazenado lá) e pega so os certos
        const filtered = plants.filter(plants =>
                // vai verificar se a planta tem um ambiente que está no filtro
                // no Json os ambientes em em [](vetores//arrays)
                // * includes é do prorpio 'filter'
                // * 'enviroment' é o selecionado pelo usuário lá na FlatListe
                plants.environments.includes(enviroment)
            );
            setFilteredPlants(filtered);
    }

    // função pra quando o usuário chegar no fim da rolagem,do flatlist com as plantas, ele chamar mais dados 
    // fetch = buscar
    function handleFetchMore(distance: number){
        if(distance < 1)
            return;

        setLoadingMore(true);
        // pegar o numero da pag e somar 1 para adicionar mais opções das páginas seguintes
        setPage(oldValue => oldValue + 1);
        // para buscar as plantas
        // fetch = buscar
        fetchPlants();
    }

    // função pra selecionar e salvar a planta tocada 
    // ja fazendo a tipagem lá pelo PlantProps
    function handlePlantSelect(plant: PlantProps){
        // a gente já está passando os dados de todas as plantas que foram pegos pela api e passando lá pra PlantSave
        navigation.navigate('PlantSave', { plant });
    }


    // ele carrega oq foi pedido antes da tela ser exibida para o usuário
    // useEffect para o nome dos locais das plantas
    useEffect(() => {
        // fetch = buscar
        async function fetchEnviroment() {
            // trazer o pedaço da api para o data
            // await espera até que tudo seja pego
            // ('plants_environments') é o elemento do json que queremos pegar
            /*
                ?_sort=title&_order=asc é um recurso do prorpio JSON-server para 
                pedar os dados de forma ordenada por ordem ascendente em função do título
                "https://github.com/typicode/json-server#getting-started" aqui o link
            */
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            // salvar os dados em enviroments para poder usar depois
            setEnviroments([
                // como eu quero um que nn tem na api eu cria um vetor(array/[]) e coloco manualmente e na outra parte ...data para despeijar tds os outros dados la 
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }

        fetchEnviroment();
    }, [])

    // useEffect para o plantprops
    // chama a função fetchPlants
    // fetch = buscar
    // LEMBRAR QUE USE EFFECT TEM DOIS PARÂMETROS
    useEffect(() => {
        fetchPlants();
    }, [])


    // por padrão ele entende q so roda se for vdd
    // chama a tela de loading(enqunato carrega os dados necessários solicitados no UseEffect) antes dessa tela
    if (loading)
        return <Load />
        // ela vai parar quando la no fetchPlants terminar de carregar

    return(
        <View style={styles.conteiner}>
            <View style={styles.header} /* a parte do cabeçalho em si */ >
                <Header />

                <Text style={styles.title}>
                    Em qual qual ambiente
                </Text>
                <Text style={styles.subTitle}>
                    você quer colocar sua planta?
                </Text>
            </View>

            <View /* só pra envolver e separar a FlatList */ >
                <FlatList 
                    // dados recolhidos da api
                    // enviroments já está com os dados pq o useEffect colocou neles ao ligar o app
                    data={enviroments}
                    // pra questão de performace 
                    // identificar um identificador único
                    // nn necessariamente precisa desse string() pq já passamos la na tipagem dos dados da api que eles seriam string
                    keyExtractor={(item) => String(item.key)}
                    // renderItem chama uma função anônima para renderizar tds os itens
                    renderItem={ ({item}) => (
                        <EnviromentButton 
                            // pegando cada title presente em cada item do data
                            title={item.title}
                            // para fazer o filtro usando o active
                            // vai pegar tds os que estão como true la no envirementSelected 
                            active={item.key === enviromentSelected }
                            
                            // quando o item for tocado ele vai ser considerado como selecionado e colocará o active como true e tudo isso será feita na função chamada
                            onPress={() => handleEnrivomentSelected(item.key)}
                        />
                    )}
                    // propriedade pra deizar a lista em forma horizontal
                    horizontal
                    // retirar a barra de rolagem que aparece
                    showsHorizontalScrollIndicator={false}
                    // o style da lista
                    contentContainerStyle={styles.enviromentList}
                    // como no style -> marginLeft: 32 fica cortando o ultimo, ent usa isso (vi no faq)
                    ListHeaderComponent={<View />}
                    ListHeaderComponentStyle={{ marginRight: 32 }}

                    
                />
            </View>

            <View style={styles.plants} /* outa view para a outra flatList */>
                <FlatList
                    // filteredPlants já está com os filtros que o usuário selecinou 
                    data={filteredPlants}
                    // pra questão de performace 
                    // identificar um identificador único
                    // nn necessariamente precisa desse string() pq já passamos la na tipagem dos dados da api que eles seriam string
                    keyExtractor={(item) => String(item.id)}
                    // renderItem chama uma função anônima para renderizar tds os itens
                    renderItem={({ item }) => (
                        // pega tds os dados e manda para o arquivo do componente e faz as coisas de lá
                        <PlantCardPrimary 
                            data={item}
                            // ao tocar leva para a função que torna a planta "selecionada" 
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}

                    // retirar a barra de rolagem que aparece
                    showsVerticalScrollIndicator={false}
                    // Pra fazer colunas com tds os elementos renderizados
                    numColumns={2}
                    // quando o usuário vhegar a 10% final da tela
                    onEndReachedThreshold={0.1}
                    // oq fazer quando isso acontecer? (isso = onEndReachedThreshold)
                    // vai chamar a função que carrega mais elementos pra a página
                    onEndReached={ ({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                
                    // pra zer um botão de load
                    // aquele circulo que fica rodando 
                    ListFooterComponent={
                        // so se LoadingMore for true que ele aparece
                        // <></> caso nn esteja true ele nn carrega nada
                        loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
                    }
                />
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
        backgroundColor: colors.background
    },
    header:{
        paddingHorizontal: 30
    },
    title:{
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subTitle:{
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    enviromentList:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32
    },
    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
    
});