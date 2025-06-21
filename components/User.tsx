import { View, ScrollView, Image } from "react-native";
import { Text, useTheme, Button, TouchableRipple, TextInput, Card, IconButton } from "react-native-paper";
import { ContainerStyles, ThemeType } from '../utils/styles';
import { UserNavProps } from "../utils/types";

export default function User({ navigation }: UserNavProps) {
    const theme = useTheme<ThemeType>();

    return (
        <ScrollView>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={ContainerStyles.Title}>Conta</Text>
                <Text style={ContainerStyles.subTitle}>
                    Visualize a configuração atual da sua conta
                </Text>

                {/* Foto de perfil */}
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <View>
                        <Image
                            source={require('../img/semImagem.png')}
                            style={ContainerStyles.foto}
                        />
                        <TouchableRipple
                            onPress={() => console.log('Editar Foto')}
                            style={ContainerStyles.edit}
                            borderless
                        >
                            <IconButton
                                icon="pencil"
                                iconColor="#fff"
                                size={18}
                                style={{ backgroundColor: '#B20000' }}
                            />
                        </TouchableRipple>
                    </View>
                </View>

                {/* Inputs */}
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

                {/* Botões */}
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
                        *Algumas configurações só estão disponíveis na central online
                    </Text>
                </View>

                <View style={ContainerStyles.horizontalRule} />

                {/* Sobre */}
                <View>
                    <Text style={ContainerStyles.Title}>Sobre</Text>
                    <Text style={ContainerStyles.subTitle}>
                        Saiba mais sobre a gincana e a escola no site abaixo, ou no site oficial: https://etecfernandoprestes.cps.sp.gov.br
                    </Text>

                    <Card style={{ marginTop: 10 }}>
                        <Card.Content>
                            <Text variant="titleLarge" style={ContainerStyles.cardTitle}>
                                RelembraFP
                            </Text>
                            <Text variant="bodyMedium" style={ContainerStyles.cardSubTitle}>
                                Relembre e descubra acontecimentos marcantes da nossa ETEC
                            </Text>
                        </Card.Content>
                        <Card.Cover
                            source={{ uri: 'https://picsum.photos/700' }}
                            style={ContainerStyles.imagemCard}
                        />
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
