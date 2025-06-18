import { View, ScrollView, Image } from "react-native";
import { Text, useTheme, Button, TouchableRipple, TextInput } from "react-native-paper";
//import { useNavigation } from '@react-navigation/native';
import { ContainerStyles, ThemeType } from '../utils/styles';
import { UserNavProps } from "../utils/types";

export default function User({ navigation }: UserNavProps) {
    const theme = useTheme<ThemeType>()

    return (
        <ScrollView>
            {/* Próximos Eventos */}
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={ContainerStyles.Title}>Conta</Text>
                <Text style={ContainerStyles.subTitle}>
                    Vizualize a configuração atual da sua conta
                </Text>
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <View>
                        <Image
                            source={require('../img/semImagem.png')}
                            style={ContainerStyles.foto}
                        />
                        <TouchableRipple
                            onPress={() => console.log('Editar Foto')}
                            style={ContainerStyles.edit}
                        >
                            <Text>
                                <Button
                                    icon="pencil"
                                    textColor="#fff"
                                    style={{ marginLeft: 2, padding: 0 }}
                                    children={''}
                                />
                            </Text>
                        </TouchableRipple>
                    </View>
                </View>
                <View>
                    <Text style={ContainerStyles.cardTitle2}>Nome de Usuário</Text>
                    <TextInput
                        label="Nome de Usuário"
                        mode="outlined"
                        style={ContainerStyles.input}
                        outlineColor="#B20000"
                        activeOutlineColor="#B20000"
                    />
                </View>
                <View>
                    <Text style={ContainerStyles.cardTitle2}>Nome de Exibição</Text>
                    <TextInput
                        label="Nome de Exibição"
                        mode="outlined"
                        style={ContainerStyles.input}
                        outlineColor="#B20000"
                        activeOutlineColor="#B20000"
                    />
                </View>
                <View>
                    <Button
                        mode="contained"
                        style={ContainerStyles.homeButton}
                        textColor="#fff"
                        labelStyle={{ fontSize: 16 }}
                        onPress={() => navigation.navigate('Calendario')}
                    >
                        Salvar alterações
                    </Button>
                    <Button
                        mode="contained"
                        style={ContainerStyles.homeButton}
                        textColor="#fff"
                        labelStyle={{ fontSize: 16 }}
                        onPress={() => navigation.navigate('Calendario')}
                    >
                        Acessar Central de Contas Online
                    </Button>
                    <Text style={ContainerStyles.subTitle}>
                        *algumas configurações só estão disponíveis na central online
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
