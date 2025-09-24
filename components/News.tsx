import { View, ScrollView, ImageBackground } from "react-native";
import { Text, useTheme, Card, TouchableRipple, IconButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { ContainerStyles, ThemeType } from '../utils/styles';
import { NoticiasNavProps } from "../utils/types";

export default function News({ navigation }: NoticiasNavProps) {
    const back = require('../img/fundo.png')
    const theme = useTheme<ThemeType>();

    const Noticias = ({ manchete, foto, autor }: { manchete: string, foto: string, autor: string }) => {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <TouchableRipple onPress={() => navigation.navigate('Cronograma')} borderless>
                    <Card style={ContainerStyles.cardNews}>
                        {/* Título */}
                        <Card.Content>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text variant="titleMedium" style={[ContainerStyles.cardTitle2, { flex: 1, marginRight: 8 }]} numberOfLines={1}>
                                    {manchete}
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => console.log("Editar:", manchete)}
                                    />
                                    <IconButton
                                        icon="delete"
                                        size={20}
                                        onPress={() => console.log("Excluir:", manchete)}
                                    />
                                </View>
                            </View>
                        </Card.Content>

                        {/* Foto */}
                        <Card.Cover source={{ uri: foto }} style={ContainerStyles.imagemCard} />

                        {/* Autor */}
                        <Card.Content>
                            <Text variant="titleSmall" style={ContainerStyles.cardSubTitle}>
                                Postado por: {autor}
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableRipple>
            </View>
        )
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={back}
                resizeMode="cover"
            >
                <ScrollView>
                    {/* Últimos Eventos */}
                    <View style={{ flex: 1, padding: 16 }}>
                        <View style={ContainerStyles.Topo}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[ContainerStyles.Title, {marginRight: -10}]}>Últimos os Eventos</Text>
                                <IconButton
                                        icon="plus-circle"
                                        size={30}
                                        style={{marginLeft: 20}}
                                        onPress={() => console.log("Adicionar:")}
                                />
                            </View>
                            <Text style={ContainerStyles.subTitle}>
                                Confira um sumário dos últimos acontecimentos
                            </Text>
                        </View>

                        <Noticias
                            manchete="EM2 Campeão do Vôlei"
                            foto="https://picsum.photos/700"
                            autor="EM2"
                        />
                        <Noticias
                            manchete="Como abrir recursos?"
                            foto="https://picsum.photos/700"
                            autor="Coordenação"
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

                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
