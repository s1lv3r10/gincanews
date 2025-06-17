import { View, ScrollView, Image } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { ContainerStyles, ThemeType } from '../utils/styles';

export default function News() {
    const theme = useTheme<ThemeType>();
    const navigation = useNavigation();

    return (
        <ScrollView>
            {/* Últimos Eventos */}
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={ContainerStyles.Title}>Todos os Eventos</Text>
                <Text style={ContainerStyles.subTitle}>
                    Confira um sumário dos últimos acontecimentos
                </Text>

                {/** Cards clicáveis */}
                <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                    <Card style={ContainerStyles.cardNews}>
                        <Card.Content>
                            <Text variant="titleMedium" style={ContainerStyles.cardTitle2}>
                                Como abrir recursos?
                            </Text>
                            <Text variant="titleSmall" style={ContainerStyles.cardSubTitle}>
                                Postado por "Coordenação" em 05/05
                            </Text>
                        </Card.Content>
                         <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    </Card>
                </TouchableRipple>

                <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                    <Card style={ContainerStyles.cardNews}>
                        <Card.Content>
                            <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                Cosplay, veja ganhadores
                            </Text>
                            <Text variant="titleSmall" style={ContainerStyles.cardText}>
                                Postado por "Coordenação" em 07/05
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
                            <Text variant="titleSmall" style={ContainerStyles.cardText}>
                                Postado por "Coordenação" em 05/05
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
                            <Text variant="titleSmall" style={ContainerStyles.cardText}>
                                Postado por "Coordenação" em 05/05
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
                            <Text variant="titleSmall" style={ContainerStyles.cardText}>
                                Postado por "Coordenação" em 05/05
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
                            <Text variant="titleSmall" style={ContainerStyles.cardText}>
                                Postado por "Coordenação" em 05/05
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableRipple>
                <View style={ContainerStyles.horizontalRule} />
                <View>
                    <Card>
                        <Card.Content>
                            <Text variant="titleLarge" style={ContainerStyles.cardTitle}>
                                RelembraFP
                            </Text>
                            <Text variant="bodyMedium" style={ContainerStyles.cardSubTitle}>
                                Relembre e descubra acontecimentos marcantes da nossa etec
                            </Text>
                        </Card.Content>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Actions style={{ alignSelf: 'center' }}>
                            <Button
                                mode="contained"
                                style={{
                                    backgroundColor: theme.colors.vermelhoPrincipal,
                                    paddingHorizontal: 20,
                                    width: 300,
                                }}
                                labelStyle={{ fontSize: 16 }}
                            >
                                Visite o Site
                            </Button>
                        </Card.Actions>
                    </Card>
                </View>
            </View>
        </ScrollView>
    );
}