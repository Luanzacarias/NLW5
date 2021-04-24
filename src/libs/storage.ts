// PRA FAZER A TIPAGEM DO RECURSO ADQUIRIDO DA API e para salvar as plantas selecionadas

// biblioteca do expo para lidar com armazeamento de dados no proprio dispositivo do usuário
import AsyncStorage from '@react-native-async-storage/async-storage';
// importar a biblioteca que podemos umas para o formato do horário
import { format } from 'date-fns';

// importar a biblioteca para notificações (expo local notification)
import *  as Notifications from 'expo-notifications';

// tipagem padrão para quando for pedido (requisitado) em outras pages
export interface PlantProps{
       
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    },
    // Hora
    hour: string;
    // vai vir a hora de acordo com o selecionado no dateTimePicker no arquivo PlantSave 
    dateTimeNotification: Date;
    
}

// para salvar as plantas selecionadas em forma de objeto
// salvando de acordo com o id da planta
// export pra conseguir reutilizar em outro lugar 
export interface StoragePlantProps {
    [id: string]:{
        // tipagem de dados
        data: PlantProps;
        notificationId: string;
    }
}

// função pra fazer esse save 
// junto com o agendamento de notificação (api expo local notificatio)
export async function savePlant(plant: PlantProps) : Promise<void> /* indicar que não tem retorno */ { 
    
    // vai tentar fazer oq está por vir, se der errado ele vai mostrar o alert
    try {

        /* COMEÇA as coisas pra notificação (dados que temos que buscar para fazer e etc) */
        // data agendada para notificação
        const nextTime = new Date(plant.dateTimeNotification);
        // data de agr
        const now = new Date();

        // desestruturar a frequencia que tem que lembrar o usuário
        const { times, repeat_every } = plant.frequency;

        // verificar se é para regar com frequência semanal
        if(repeat_every === 'week'){
            // descobrir qunatas vezes na semana temos que lembrar o usuário
            const interval = Math.trunc(7 / times);
            // setar a nova data, sendo a data atual acrescentando quando vai ser a próxima vez baseado no interval
            nextTime.setDate(now.getDate() + interval);
        }
        else{
            // se nn é semanal é diário, ent smp + 1 pra smp aumentar um dia
            nextTime.setDate(nextTime.getDate() + 1);
        }

        // Pegar quantos segundos tem da data atual até a próxima
        // .abs pra ter valor absoluto( como se tivesse em módulo)
        const seconds = Math.abs((
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
        ));
        
        // id da notificação
        const notificationId = await Notifications.scheduleNotificationAsync({
            // a nossa notificação, o formato dela
            content:{
                title: 'Heeey, 🌱',
                // concatenar(crases) pra usar o nome da planta que irá ser regada
                body: `Está na hora de cuidar da sua ${plant.name}!`,
                // para a notificação ter som
                sound: true,
                // dar prioridade de notificação (android, acho q no ios nn precisa)
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            // gatilho -> qunado tem que ser executada
            trigger: {
                // tem que ser no minimo 60 segundo, ent vamos fazer uma verificação
                // se nossa const segundos for menor que 60s ent definimos 60s, se nn defininmos o próprio seconds
                seconds: seconds < 60 ? 60 : seconds,
                // acionar a repetição
                repeats: true 
            }
        })
            

        // pega os dados e selecionar o que temos no nosso AsyncStorege
        const data = await AsyncStorage.getItem('@plantManager:plants');
        // vai ver se tem dados e tipar pra forma certa, se não tiver nada ele, retorna nada {}
        // o AsyncStorege guarda tudo por string, ent estamos fazendo a conversão dos dados de lá para ser um objeto JSON e que o estilo dele deve seguir o StoregePlantPros
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};
        
        // pega o plant.id, a planta que foi passada pra cadastrar, pasasando pra ele o próprio plant
        const newPlant = {
            [plant.id]: {
                // salvar os dados da planta
                data: plant,
                // salvar o Id da notificação
                notificationId
            }
        }

        // Agr vai armazenar o objeto passado 
        await AsyncStorage.setItem('@plantManager:plants',
            // passar de um arquivo JSON para uma string, já q AsyncStorege só salva as coisas em string
            JSON.stringify({
                // pegando a nova planta que foi criada o objeto, a que foi passada pra cadastrar, e junta as outras plantas já cadastradas
                ...newPlant,
                ...oldPlants
            })
        );

    }catch(error)/* ele vai pegar o erro e lançar pra frente e posso usar na outra tela se quiser */{
        throw new Error(error);
    }
}

// FUNÇÃO PARA CARREGAR AS PLANTAS
export async function loadPlant() : Promise<PlantProps[]> /* retornar um vetor(matriz) baseado em PlantProps */ { 
    
    // vai tentar fazer oq está por vim, se der errado ele vai mostrar o alert
    try {
        // pega os dados e selecionar o que temos no nosso AsyncStorege
        const data = await AsyncStorage.getItem('@plantManager:plants');
        // vai ver se tem dados e tipar pra forma certa, se não tiver nada ele, retorna nada {}
        // o AsyncStorege guarda tudo por string, ent estamos fazendo a conversão dos dados de lá para ser um objeto JSON e que o estilo dele deve seguir o StoregePlantPros
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};
        
        // vamos devolver o dado já da forma certa 
        // transformando cada planta(pegando elas pelas keys) em object
        const plantsSorted = Object.keys(plants).map((plant) => {
            return {
                // pegando as minhas plantas(keys(plants)) selecionando pela chave e descarregando aqui no data
                ...plants[plant].data,
                // acrescentando ele para ja deixar formatado
                // ta percorrendo o caminho para chegar no dateTimeNotification de cada planta que está salva || HH:mm = a forma que aparece
                hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
            }
        })/*sort pra devolver dessa forma de ordem:*/.sort((a,b) => 
            // nesse caso está devolvendo do horário mais perto para o mais longe
            
            // a e b ta só pra simplificar 
            // floor = arredondar
            Math.floor(
                // pegando o horário
                new Date(a.dateTimeNotification).getTime() / 1000 - 
                Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
            )
        );

        // retorna todas as plantas de forma organizada
        return plantsSorted;


        
    }catch(error)/* ele vai pegar o erro e lançar pra frente e posso usar na outra tela se quiser */{
        throw new Error(error);
    }
}

//FUNÇÃO PARA EXCLUIR A PLANTA SALVA 
// peg o id da planta lá onde foi chamada a função
export async function removePlant(id: string): Promise<void> {
    // passando pro data os arquivos armazenados (key feita la em storage.ts)
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    // Pra ver se tem algo armazenado
    // transfromando os dados pegos em AsyncDtorage(em string) em um objeto Json de acordo com a tipagem de StoragePlantProps
    // se nn tiver nada, objeto vazio {}
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    // Excluir a notificação ao excluir a planta 
    // plants[id] pra pegar o id da planta e ai pegar o id notificação dele
    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);

    // deletar a planta que tem o id da planta em que foi feito o toque
    delete plants[id]

    // depois de deletar a gente devolve os dados para AsyncStorage
    await AsyncStorage.setItem(
        // key e modo que ele vai, no caso estamos tirando do formato objeto para string
        '@plantmanager:plants',
        JSON.stringify(plants)
        );
}
    

