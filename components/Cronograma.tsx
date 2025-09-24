import { View, ScrollView, ImageBackground } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple, IconButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { ContainerStyles, ThemeType } from '../utils/styles';
import { CronogramaNavProps } from "../utils/types";

export default function Cronograma({ navigation }: CronogramaNavProps) {
    const theme = useTheme<ThemeType>();
    const back = require('../img/fundo.png')

    const Evento = ({ dia, mes, titulo }: { dia: string, mes: string, titulo: string }) => {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <TouchableRipple onPress={() => navigation.navigate('Gincanews')}>
                    <Card style={{ backgroundColor: '#fff' }}>
                        <Card.Content>
                            <View style={ContainerStyles.eventoContainer}>
                                {/* Data */}
                                <View style={ContainerStyles.dataContainer}>
                                    <Text style={ContainerStyles.diaGlobal}>{dia}</Text>
                                    <Text style={ContainerStyles.mesGlobal}>{mes}</Text>
                                </View>
                                {/*Texto */}
                                <View style={[ContainerStyles.textoContainer, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                    <Text style={[ContainerStyles.titulo, { flexDirection: "row", flex: 1, marginRight: 8 }]} numberOfLines={1}>{titulo}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <IconButton
                                            icon="pencil"
                                            size={20}
                                            onPress={() => console.log("Editar:", titulo)}
                                        />
                                        <IconButton
                                            icon="delete"
                                            size={20}
                                            onPress={() => console.log("Excluir:", titulo)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </TouchableRipple>
            </View>
        )
    };
    const Evento2 = ({ dia, mes, titulo }: { dia: string, mes: string, titulo: string }) => {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <TouchableRipple onPress={() => navigation.navigate('Gincanews')}>
                    <Card style={{ backgroundColor: '#fff' }}>
                        <Card.Content>
                            <View style={ContainerStyles.eventoContainer}>
                                {/* Data */}
                                <View style={ContainerStyles.dataContainer}>
                                    <Text style={ContainerStyles.diaEM}>{dia}</Text>
                                    <Text style={ContainerStyles.mesEM}>{mes}</Text>
                                </View>
                                {/*Texto */}
                                <View style={[ContainerStyles.textoContainer, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                    <Text style={[ContainerStyles.titulo, { flexDirection: "row", flex: 1, marginRight: 8 }]} numberOfLines={1}>{titulo}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <IconButton
                                            icon="pencil"
                                            size={20}
                                            onPress={() => console.log("Editar:", titulo)}
                                        />
                                        <IconButton
                                            icon="delete"
                                            size={20}
                                            onPress={() => console.log("Excluir:", titulo)}
                                        />
                                    </View>
                                </View>
                            </View>
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
                style={ContainerStyles.background}
            >
                <ScrollView>
                    {/* Próximos Eventos */}
                    <View style={{ flex: 1, padding: 16 }}>
                        <View style={ContainerStyles.Topo}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={ContainerStyles.Title}>Todos os Eventos</Text>
                                <IconButton
                                    icon="plus-circle"
                                    size={30}
                                    onPress={() => console.log("Adicionar:")}
                                />
                            </View>
                            <Text style={ContainerStyles.subTitle}>
                                Confira aqui seus próximos eventos
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <Text style={{ fontSize: 15 }}>Agenda Global</Text>
                            <Text style={ContainerStyles.redDot} children={""} />
                            <Text style={{ fontSize: 15 }}>Agenda do EM</Text>
                            <Text style={ContainerStyles.grayDot} children={""} />
                        </View>
                        <Evento
                            dia="27"
                            mes="Jun"
                            titulo="Entrega do Leite"
                        />
                        <Evento2
                            dia="27"
                            mes="Jun"
                            titulo="Entrega do Leite"
                        />
                        <Evento2
                            dia="27"
                            mes="Jun"
                            titulo="Entrega do Leite"
                        />
                        <Evento
                            dia="27"
                            mes="Jun"
                            titulo="Entrega do Leite"
                        />
                        <Evento
                            dia="27"
                            mes="Jun"
                            titulo="Entrega do Leite"
                        />
                        <Evento
                            dia="27"
                            mes="Jun"
                            titulo="Entrega do Leite"
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>

    );
}