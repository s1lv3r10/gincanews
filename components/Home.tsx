import { View, ScrollView, ImageBackground, RefreshControl } from "react-native";
import * as SecureStore from 'expo-secure-store'
import { Text, useTheme, Card, Button, TouchableRipple } from "react-native-paper";
import { ContainerStyles, ThemeType } from '../utils/styles';
import { CronogramaType, HomeNavProps, NoticiaType } from "../utils/types";
import { Api } from "../utils/api";
import { useCallback, useEffect, useState } from "react";


export default function Home({ navigation }: HomeNavProps) {
    const theme = useTheme<ThemeType>();
    const back = require('../img/fundo.png')
    const api = new Api()
    const id = SecureStore.getItem('userLogged')

    const [news, setNews] = useState<NoticiaType[]>([])
    const [eves, setEves] = useState<CronogramaType[]>([])
    const [loading, setLoading] = useState(true)

    const load = async () => {
        const user = await api.getUsuario(parseInt(id))

        const eves = await api.getCronos(user[0].em_user)
        const news = await api.getAllNews()

        setEves(eves)
        setNews(news)
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await load()
        setRefreshing(false);
    }, []);


    useEffect(() => {
        (async () => {
            await load()
            setLoading(false)
        })()
    }, [])
    
    const MinimalNoticia = ({ mmanchete_not, autor_not }: { mmanchete_not: string, autor_not: string }) => {
        return (
            <TouchableRipple onPress={() => navigation.navigate('Notícias')} borderless>
                <Card style={ContainerStyles.cardNews}>
                    <Card.Content>
                        <Text variant="titleMedium" style={ContainerStyles.cardText}>
                            {mmanchete_not ?? '...'} 
                        </Text>
                        <Text variant="titleMedium" style={[ContainerStyles.cardSubTitle, { marginBottom: 0 }]}>
                            {autor_not ?? '...'} 
                        </Text>
                    </Card.Content>
                </Card>
            </TouchableRipple>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={back}
                resizeMode="cover"
            >
                <ScrollView 
                    contentContainerStyle={{ padding: 16, zIndex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {/* Card de notícia */}
                    {
                        !loading && (news.length > 0)
                        ? (
                            <Card style={ContainerStyles.cardNews}>
                                

                                <Card.Content>
                                    <Text variant="titleLarge" style={ContainerStyles.cardText}>
                                        Última Notícia
                                    </Text>
                                    <Text style={ContainerStyles.cardTitle}>
                                        {loading ? '...' : news[news.length - 1].mmanchete_not }
                                    </Text>
                                    <Text style={ContainerStyles.cardSubTitle}>
                                        {loading ? '...' : new Date(news[news.length - 1].data_not).toLocaleString('pt-BR', { dateStyle: 'long' })}
                                    </Text>
                                </Card.Content>
                                <Card.Cover source={{ uri: loading ? 'https://picsum.photos/700' : news[news.length - 1].midia_not == 'SEM_MIDIA' ? 'https://picsum.photos/700' : news[news.length - 1].midia_not }} />
                                <Card.Actions style={{ justifyContent: 'center' }}>
                                    <Button
                                        mode="outlined"
                                        textColor={theme.colors.vermelhoPrincipal}
                                        style={{
                                            borderColor: theme.colors.vermelhoPrincipal,
                                            borderWidth: 1,
                                            paddingHorizontal: 20,
                                        }}
                                        onPress={() => { navigation.navigate('Notícias') }}
                                    >
                                        Veja Mais
                                    </Button>
                                </Card.Actions>
                            </Card>
                        ) : (
                            <></>
                        )
                    }

                    {/* Próximos eventos */}
                    <View style={ContainerStyles.row}>
                        <TouchableRipple onPress={() => navigation.navigate('Cronograma')} borderless>
                            <Card style={ContainerStyles.cardEvento}>
                                <Card.Content>
                                    <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                        Próximo Evento
                                    </Text>
                                    <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                                        {
                                            loading 
                                            ? '...' 
                                            : eves.length > 0 
                                            ? eves[0].desc_cono 
                                            : '...'
                                        }
                                    </Text>
                                    <Text variant="bodyLarge" style={ContainerStyles.cardDate}>
                                        {
                                            loading 
                                            ? '...' 
                                            : eves.length > 0
                                            ? new Date(eves[0].data_crono).toLocaleString('pt-BR', { day: '2-digit', month: 'short' })
                                            : '...'
                                        }
                                    </Text>
                                </Card.Content>
                            </Card>
                        </TouchableRipple>

                        <TouchableRipple onPress={() => navigation.navigate('Cronograma')} borderless rippleColor="rgba(0,0,0,0.1)">
                            <Card style={ContainerStyles.cardEvento}>
                                <Card.Content>
                                    <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                        Próximo Evento
                                    </Text>
                                    <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                                        {
                                            loading 
                                            ? '...' 
                                            : eves.length > 1 
                                            ? eves[1].desc_cono 
                                            : '...'
                                        }
                                    </Text>
                                    <Text variant="bodyLarge" style={ContainerStyles.cardDate}>
                                        {
                                            loading 
                                            ? '...' 
                                            : eves.length > 1
                                            ? new Date(eves[1].data_crono).toLocaleString('pt-BR', { day: '2-digit', month: 'short' })
                                            : '...'
                                        }
                                    </Text>
                                </Card.Content>
                            </Card>
                        </TouchableRipple>
                    </View>

                    <Button
                        mode="contained"
                        style={ContainerStyles.mainButton}
                        textColor="#fff"
                        labelStyle={{ fontSize: 16 }}
                        onPress={() => navigation.navigate('Cronograma')}
                    >
                        Confira Todos os Eventos
                    </Button>

                    <View style={ContainerStyles.horizontalRule} />

                    {/* Últimos Notícias */}
                    <View style={{ flex: 1, padding: 10 }}>
                        <View style={ContainerStyles.Topo}>
                            <Text style={ContainerStyles.cardTitle}>Últimas Notícias</Text>
                            <Text style={ContainerStyles.subTitle}>
                                Confira um sumário dos últimos acontecimentos
                            </Text>
                        </View>

                        {
                            news.length > 0 ? (
                                news.reverse().map((noticia: NoticiaType) => {
                                    return (
                                        <MinimalNoticia mmanchete_not={noticia.mmanchete_not} autor_not={noticia.autor_not} key={noticia.id_not} />
                                    )
                                })
                            ) : (
                                <></>
                            )
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
