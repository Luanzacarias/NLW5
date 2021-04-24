import React, { useEffect } from 'react';
// todo sistema de rotas está aqui
import Routes from './src/routes'; // não precisa dizer o nome do arquivo pq ele procura e acha por padrão
import * as Notifications from 'expo-notifications';
// importar o que nos auxilia a fazer uma tela de loading, segura o conteúdo com outra tela até ser carregado
import AppLoading from 'expo-app-loading';

// importar uma fonte de texto (jost) no aquivo "raiz" para estar disponível em todos os lugares 
import {
  // useFonts foi recomendado pelo proprio expo(no seu site)
  // buscando todas as fontes que queremos usar
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
// nossa tipagem para dados das plantas
import { PlantProps } from './src/libs/storage';




export default function App(){

  //pra ter armazenado as nossas fontes
  // useFonts -> [boolean, error | null], ent vamos confirmar o boolean depois 
  const [ fontsLoad ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  // vamos faz oq cem a seguir para observar notificações
  // criando um listener, uma função que fica observando quando uma notificação chega
  // useEffect(() => {
  //   const subscription = Notifications.addNotificationReceivedListener(
  //     async notification => {
  //       // quando a gente agendou uma notificação, a gnt passou uma coisa e enviou os dados da planta
  //       // PlantProps pra tipar nosso data
  //       const data = notification.request.content.data.plant as PlantProps;
  //       console.log(data);
  //     }
  //   );
  //   // retornar e dps remover essa sub inscrição
  //   return () => subscription.remove();


    
  //   async function notifications() {
  //      // ver tds as notificações
  //     // const data = await Notifications.getAllScheduledNotificationsAsync();
  //     // console.log('NOTIFICAÇÕES AGENDADAS ###########')
  //     // console.log(data);

  //     // deletar tds as notificações
  //   //   await Notifications.cancelAllScheduledNotificationsAsync();

  //   //   // ver tds as notificações
  //   //   const data = await Notifications.getAllScheduledNotificationsAsync();
  //   //   console.log('NOTIFICAÇÕES AGENDADAS ###########')
  //   //   console.log(data);
  //   // }
  //   // notifications();

  // },[])


  // enquanto o boolean for false ele vai mostrar a tela de loading (a imagem de splash padrão[dentro de assets padrão])
  if(!fontsLoad)
    return <AppLoading/>

  return (

    <Routes /* componente com as rotas *//>

  )
};


