import { useState } from "react";
import { View, ScrollView, Image, ImageBackground } from "react-native";
import { Text, useTheme, Button, TextInput, Card, Modal, Portal, TouchableRipple, IconButton } from "react-native-paper";
import { ContainerStyles, ThemeType } from '../utils/styles';
import { UserNavProps } from "../utils/types";
import Start from "./Start"

export default function User({ navigation }: UserNavProps) {
    const theme = useTheme<ThemeType>();
    const back = require('../img/fundo.png');

    const [visible, setVisible] = useState(false);

    const openModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={back}
                resizeMode="cover"
                style={ContainerStyles.background}
            >
                <ScrollView>
                    <View style={{ flex: 1, padding: 16}}>
                        <View style={ContainerStyles.Topo}>
                            <Text style={ContainerStyles.Title}>Conta</Text>
                            <Text style={ContainerStyles.subTitle}>
                                Visualize a configuração atual da sua conta
                            </Text>
                        </View>

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

                        {/* Botão abre modal */}
                        <View>
                            <Button
                                mode="contained"
                                style={ContainerStyles.homeButton}
                                textColor="#fff"
                                labelStyle={{ fontSize: 16 }}
                                onPress={openModal}
                            >
                                Configurar Conta
                            </Button>
                            <Button
                                mode="contained"
                                style={ContainerStyles.homeButton}
                                textColor="#fff"
                                labelStyle={{ fontSize: 16 }}
                                onPress={() => navigation.navigate("Start")}
                            >
                                Logout
                            </Button>
                        </View>
                        <View style={ContainerStyles.horizontalRule}/>
                        <View style={ContainerStyles.Topo}>
                            <Text style={ContainerStyles.Title}>Sobre</Text>
                            <Text style={ContainerStyles.subTitle}>
                                Confira mais informações sobre a Etec Fernando Prestes no site
                            </Text>
                            <Text style={ContainerStyles.subTitle}>
                                https://etecfernandoprestes.cps.sp.gov.br/
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Modal para editar conta */}
                <Portal>
                    <Modal visible={visible} onDismiss={closeModal} contentContainerStyle={{
                        padding: 20,
                        margin: 20,
                    }}>
                        <Card style={{ backgroundColor: '#fff' }}>
                            <Card.Title title="Editar Conta" />
                            <Card.Content>
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
                                    <Text style={ContainerStyles.cardTitle2}>Senha</Text>
                                    <TextInput
                                        label="Senha"
                                        mode="outlined"
                                        style={ContainerStyles.input}
                                        outlineColor="#B20000"
                                        activeOutlineColor="#B20000"
                                    />
                                </View>
                                <View>
                                    <Text style={ContainerStyles.cardTitle2}>EM</Text>
                                    <TextInput
                                        label="EM"
                                        mode="outlined"
                                        style={ContainerStyles.input}
                                        outlineColor="#B20000"
                                        activeOutlineColor="#B20000"
                                    />
                                </View>
                                <Button
                                    mode="contained"
                                    style={ContainerStyles.homeButton}
                                    textColor="#fff"
                                    labelStyle={{ fontSize: 16 }} onPress={closeModal}>
                                    Salvar
                                </Button>
                            </Card.Content>
                        </Card>
                    </Modal>
                </Portal>
            </ImageBackground>
        </View>
    );
}
