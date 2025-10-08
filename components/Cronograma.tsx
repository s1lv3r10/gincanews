import { useState } from "react";
import { View, ScrollView, ImageBackground } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple, IconButton, Modal, Portal, TextInput,} from "react-native-paper";
import { ContainerStyles, ThemeType } from "../utils/styles";
import { CronogramaNavProps } from "../utils/types";

export default function Cronograma({ navigation }: CronogramaNavProps) {
    const theme = useTheme<ThemeType>();
    const back = require("../img/fundo.png");

    // Estados dos modais
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);

    // Estados do formulário
    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [titulo, setTitulo] = useState("");

    const [editEvento, setEditEvento] = useState({
        dia: "",
        mes: "",
        titulo: "",
    });

    // Funções abrir/fechar modais
    const openAddModal = () => setVisibleAdd(true);
    const closeAddModal = () => setVisibleAdd(false);

    const openEditModal = (evento: { dia: string; mes: string; titulo: string }) => {
        setEditEvento(evento);
        setVisibleEdit(true);
    };
    const closeEditModal = () => setVisibleEdit(false);

    const Evento = ({ dia, mes, titulo }: { dia: string; mes: string; titulo: string }) => {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <TouchableRipple onPress={() => navigation.navigate("Gincanews")}>
                    <Card style={{ backgroundColor: "#fff" }}>
                        <Card.Content>
                            <View style={ContainerStyles.eventoContainer}>
                                {/* Data */}
                                <View style={ContainerStyles.dataContainer}>
                                    <Text style={ContainerStyles.diaGlobal}>{dia}</Text>
                                    <Text style={ContainerStyles.mesGlobal}>{mes}</Text>
                                </View>
                                {/* Texto */}
                                <View
                                    style={[
                                        ContainerStyles.textoContainer,
                                        {
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            ContainerStyles.titulo,
                                            { flexDirection: "row", flex: 1, marginRight: 8 },
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {titulo}
                                    </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <IconButton
                                            icon="pencil"
                                            size={20}
                                            onPress={() => openEditModal({ dia, mes, titulo })}
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
        );
    };

    const Evento2 = ({ dia, mes, titulo }: { dia: string; mes: string; titulo: string }) => {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <TouchableRipple onPress={() => navigation.navigate("Gincanews")}>
                    <Card style={{ backgroundColor: "#fff" }}>
                        <Card.Content>
                            <View style={ContainerStyles.eventoContainer}>
                                {/* Data */}
                                <View style={ContainerStyles.dataContainer}>
                                    <Text style={ContainerStyles.diaEM}>{dia}</Text>
                                    <Text style={ContainerStyles.mesEM}>{mes}</Text>
                                </View>
                                {/* Texto */}
                                <View
                                    style={[
                                        ContainerStyles.textoContainer,
                                        {
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            ContainerStyles.titulo,
                                            { flexDirection: "row", flex: 1, marginRight: 8 },
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {titulo}
                                    </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <IconButton
                                            icon="pencil"
                                            size={20}
                                            onPress={() => openEditModal({ dia, mes, titulo })}
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
        );
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
                            <View style={{ flexDirection: "row" }}>
                                <Text style={ContainerStyles.Title}>Todos os Eventos</Text>
                                <IconButton
                                    icon="plus-circle"
                                    size={30}
                                    onPress={openAddModal}
                                />
                            </View>
                            <Text style={ContainerStyles.subTitle}>
                                Confira aqui seus próximos eventos
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                margin: 10,
                            }}
                        >
                            <Text style={{ fontSize: 15 }}>Cronograma Global</Text>
                            <Text style={ContainerStyles.redDot} children={""} />
                            <Text style={{ fontSize: 15 }}>Cronograma do EM</Text>
                            <Text style={ContainerStyles.grayDot} children={""} />
                        </View>

                        {/* Exemplos */}
                        <Evento dia="27" mes="Jun" titulo="Entrega do Leite" />
                        <Evento2 dia="27" mes="Jun" titulo="Entrega do Leite" />
                        <Evento dia="27" mes="Jun" titulo="Entrega do Leite" />
                        <Evento2 dia="27" mes="Jun" titulo="Entrega do Leite" />
                    </View>
                </ScrollView>
            </ImageBackground>

            {/*  MODAL ADICIONAR*/}
            <Portal>
                <Modal
                    visible={visibleAdd}
                    onDismiss={closeAddModal}
                    contentContainerStyle={{
                        backgroundColor: "transparent",
                        paddingHorizontal: 20,
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <Card
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            maxHeight: "100%",
                        }}
                    >
                        <Card.Title title="Adicionar Evento" />
                        <ScrollView
                            style={{ maxHeight: "100%" }}
                            contentContainerStyle={{ padding: 20 }}
                        >
                            <TextInput
                                label="Dia"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#B20000"
                                activeOutlineColor="#B20000"
                                value={dia}
                                onChangeText={setDia}
                            />
                            <TextInput
                                label="Mês"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#B20000"
                                activeOutlineColor="#B20000"
                                value={mes}
                                onChangeText={setMes}
                            />
                            <TextInput
                                label="Título"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#B20000"
                                activeOutlineColor="#B20000"
                                value={titulo}
                                onChangeText={setTitulo}
                            />

                            <Button
                                mode="contained"
                                style={ContainerStyles.mainButton}
                                textColor="#fff"
                                labelStyle={{ fontSize: 16 }}
                                onPress={() => {
                                    console.log("Adicionar:", { dia, mes, titulo });
                                    closeAddModal();
                                }}
                            >
                                Adicionar
                            </Button>
                        </ScrollView>
                    </Card>
                </Modal>
            </Portal>

            {/* MODAL EDITAR */}
            <Portal>
                <Modal
                    visible={visibleEdit}
                    onDismiss={closeEditModal}
                    contentContainerStyle={{
                        backgroundColor: "transparent",
                        paddingHorizontal: 20,
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <Card
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            maxHeight: "100%",
                        }}
                    >
                        <Card.Title title="Editar Evento" />
                        <ScrollView
                            style={{ maxHeight: "100%" }}
                            contentContainerStyle={{ padding: 20 }}
                        >
                            <TextInput
                                label="Dia"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#B20000"
                                activeOutlineColor="#B20000"
                                value={editEvento.dia}
                                onChangeText={(text) =>
                                    setEditEvento({ ...editEvento, dia: text })
                                }
                            />
                            <TextInput
                                label="Mês"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#B20000"
                                activeOutlineColor="#B20000"
                                value={editEvento.mes}
                                onChangeText={(text) =>
                                    setEditEvento({ ...editEvento, mes: text })
                                }
                            />
                            <TextInput
                                label="Título"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#B20000"
                                activeOutlineColor="#B20000"
                                value={editEvento.titulo}
                                onChangeText={(text) =>
                                    setEditEvento({ ...editEvento, titulo: text })
                                }
                            />

                            <Button
                                mode="contained"
                                style={ContainerStyles.mainButton}
                                textColor="#fff"
                                labelStyle={{ fontSize: 16 }}
                                onPress={() => {
                                    console.log("Editar:", editEvento);
                                    closeEditModal();
                                }}
                            >
                                Salvar Alterações
                            </Button>
                        </ScrollView>
                    </Card>
                </Modal>
            </Portal>
        </View>
    );
}
