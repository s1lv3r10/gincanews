import { View, ScrollView } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { ContainerStyles, ThemeType } from '../utils/styles';
import Calendario from './Calendario';
import { HomeNavProps } from "../utils/types";

export default function Home({ navigation }: HomeNavProps) {
    const theme = useTheme<ThemeType>();

    return (
        <ScrollView>
            <View style={{ flex: 1, padding: 16 }}>
                {/* Card de notícia */}
                <Card>
                    <Card.Content>
                        <Text variant="titleLarge" style={ContainerStyles.cardTitle}>
                            Última Notícia
                        </Text>
                        <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                            EM2 Campeão do Vôlei
                        </Text>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions style={{ justifyContent: 'center' }}>
                        <Button
                            mode="outlined"
                            textColor={theme.colors.vermelhoPrincipal}
                            style={{
                                borderColor: theme.colors.vermelhoPrincipal,
                                borderWidth: 1,
                                paddingHorizontal: 20,
                            }}
                        >
                            Veja Mais
                        </Button>
                    </Card.Actions>
                </Card>

                {/* Próximos eventos, clicáveis */}
                <View style={ContainerStyles.row}>
                    <TouchableRipple
                        onPress={() => navigation.navigate('Calendario')}
                        borderless
                    >
                        <Card style={ContainerStyles.cardEvento}>
                            <Card.Content>
                                <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                    Próximo Evento
                                </Text>
                                <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                                    Entrega do Leite
                                </Text>
                                <Text variant="bodyLarge" style={ContainerStyles.cardDate}>
                                    27/06
                                </Text>
                            </Card.Content>
                        </Card>
                    </TouchableRipple>

                    <TouchableRipple
                        onPress={() => navigation.navigate('Calendario')}
                        borderless
                        rippleColor="rgba(0,0,0,0.1)"
                    >
                        <Card style={ContainerStyles.cardEvento}>
                            <Card.Content>
                                <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                    Próximo Evento
                                </Text>
                                <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                                    Quadrilha
                                </Text>
                                <Text variant="bodyLarge" style={ContainerStyles.cardDate}>
                                    27/08
                                </Text>
                            </Card.Content>
                        </Card>
                    </TouchableRipple>
                </View>

                <Button
                    mode="contained"
                    style={ContainerStyles.homeButton}
                    textColor="#fff"
                    labelStyle={{ fontSize: 16 }}
                    onPress={() => navigation.navigate('Calendario')}
                >
                    Confira Todos os Eventos
                </Button>

                <View style={ContainerStyles.horizontalRule} />

                {/* Últimos Eventos */}
                <View style={{ flex: 1, padding: 16 }}>
                    <Text style={ContainerStyles.Title}>Últimos Eventos</Text>
                    <Text style={ContainerStyles.subTitle}>
                        Confira um sumário dos últimos acontecimentos
                    </Text>

                    {/** Cards clicáveis */}
                    <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                        <Card style={ContainerStyles.cardNews}>
                            <Card.Content>
                                <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                    Como abrir recursos?
                                </Text>
                            </Card.Content>
                        </Card>
                    </TouchableRipple>

                    <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                        <Card style={ContainerStyles.cardNews}>
                            <Card.Content>
                                <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                    Cosplay, veja ganhadores
                                </Text>
                            </Card.Content>
                        </Card>
                    </TouchableRipple>

                    <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                        <Card style={ContainerStyles.cardNews}>
                            <Card.Content>
                                <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                    Esportivas, confira modalidades
                                </Text>
                            </Card.Content>
                        </Card>
                    </TouchableRipple>
                </View>
            </View>
        </ScrollView>
    );
}
