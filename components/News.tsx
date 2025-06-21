import { View, ScrollView, Image } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { ContainerStyles, ThemeType } from '../utils/styles';
import { NoticiasNavProps } from "../utils/types";

export default function News({ navigation }: NoticiasNavProps) {
    const theme = useTheme<ThemeType>();
    const Noticias = ({ manchete, foto, autor }: { manchete: string, foto: string, autor: string }) => {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                    <Card style={ContainerStyles.cardNews}>
                        {/*Título*/}
                        <Card.Content>
                            <Text variant="titleMedium" style={ContainerStyles.cardTitle2}>{manchete}</Text>
                        </Card.Content>
                        {/*Foto*/}
                        <Card.Cover source={{ uri: foto }} style={ContainerStyles.imagemCard} />
                        {/*Autor*/}
                        <Card.Content>
                            <Text variant="titleSmall" style={ContainerStyles.cardSubTitle}>Postado por: {autor}</Text>
                        </Card.Content>
                    </Card>
                </TouchableRipple>
            </View>
        )
    };
    return (
        <ScrollView>
            {/* Últimos Eventos */}
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={ContainerStyles.Title}>Últimos os Eventos</Text>
                <Text style={ContainerStyles.subTitle}>
                    Confira um sumário dos últimos acontecimentos
                </Text>
                <Noticias
                    manchete="EM2 Campeão do Vôlei"
                    foto="https://picsum.photos/700"
                    autor="EM2"
                />
                <Noticias
                    manchete="Como abrir recursos?"
                    foto="https://picsum.photos/700"
                    autor="Cordenação"
                />
                <Noticias
                    manchete="Horários da entrega do leite"
                    foto="https://picsum.photos/700"
                    autor="Coordenação"
                />
                <Noticias
                    manchete="Ofícios liberados"
                    foto="https://picsum.photos/700"
                    autor="Coordenação"
                />
                <Noticias
                    manchete="Para onde fazer o pagamento da inscrição?"
                    foto="https://picsum.photos/700"
                    autor="Coordenação"
                />
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
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={ContainerStyles.imagemCard} />
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