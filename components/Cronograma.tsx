import { useEffect, useState } from "react";
import { View, ScrollView, ImageBackground } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple, IconButton, Modal, Portal, TextInput,} from "react-native-paper";
import * as SecureStore from 'expo-secure-store'
import { ContainerStyles, ThemeType } from "../utils/styles";
import { CronogramaType, CronogramaNavProps } from "../utils/types";
import { Api } from "../utils/api";

export default function Cronograma({ navigation }: CronogramaNavProps) {
    const theme = useTheme<ThemeType>();
    const back = require("../img/fundo.png");
    const xUserLogged = SecureStore.getItem('userLogged')


    // Estados dos modais
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);

    // Estados do formulário
    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [titulo, setTitulo] = useState("");

    const [editEvento, setEditEvento] = useState({
        id: -1,
        dia: "",
        mes: "",
        titulo: "",
    });

    const [eventos, setEventos] = useState([])

    // Funções abrir/fechar modais
    const openAddModal = () => setVisibleAdd(true);
    const closeAddModal = () => setVisibleAdd(false);

    const openEditModal = (evento: { id: number, dia: string; mes: string; titulo: string }) => {
        setEditEvento(evento);
        setVisibleEdit(true);
    };
    const closeEditModal = () => setVisibleEdit(false);

    const Evento = (
        { data, titulo, global, admin, id_crono }: 
        { data: Date, titulo: string, global: boolean, admin: boolean, id_crono: number }
    ) => {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <TouchableRipple onPress={() => navigation.navigate("Gincanews")}>
                    <Card style={{ backgroundColor: "#fff" }}>
                        <Card.Content>
                            <View style={ContainerStyles.eventoContainer}>
                                {/* Data */}
                                <View style={ContainerStyles.dataContainer}>
                                    <Text 
                                        style={
                                            global 
                                            ? ContainerStyles.diaGlobal 
                                            : ContainerStyles.diaEM
                                        }
                                    >
                                        {data.getDate()}
                                    </Text>
                                    <Text 
                                        style={
                                            global 
                                            ? ContainerStyles.mesGlobal 
                                            : ContainerStyles.mesEM
                                        }
                                    >
                                        {data.toLocaleString('pt-BR', { month: 'short' })}
                                    </Text>
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
                                            { flexDirection: "row", flex: 1, marginRight: 8, textAlign: `left` },
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {titulo}
                                    </Text>
                                    {
                                        admin
                                        ? (
                                            <View style={{ flexDirection: "row" }}>
                                                <IconButton
                                                    icon="pencil"
                                                    size={20}
                                                    onPress={() => openEditModal({ 
                                                        id: id_crono,
                                                        dia: data.getDate().toString(), 
                                                        mes: (data.getMonth() + 1).toString(), 
                                                        titulo 
                                                    })}
                                                />
                                                <IconButton
                                                    icon="delete"
                                                    size={20}
                                                    onPress={async () => {
                                                        await api.deleteCrono(id_crono, parseInt(xUserLogged))
                                                        await generateEvents()
                                                    }}
                                                />
                                            </View>
                                        )
                                        : (
                                            <></>
                                        )
                                    }
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </TouchableRipple>
            </View>
        );
    };

    // Pegar eventos
    const api = new Api()
    const generateEvents = async () => {
        const user = await api.getUsuario(parseInt(xUserLogged))
        const eves = await api.getCronos(user[0].em_user)
        setEventos(eves)
    }
    useEffect(() => {
        generateEvents()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={back}
                resizeMode="cover"
                style={ContainerStyles.background}
            >
                <ScrollView>
                    {/* Próximos Eventos */}
                    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
                        <View style={ContainerStyles.Topo}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Text style={[ContainerStyles.Title, {marginRight: 0}]}>Todos os Eventos</Text>
                                {
                                    parseInt(xUserLogged) <= 12
                                    ? (
                                        <IconButton
                                            icon="plus-circle"
                                            size={30}
                                            onPress={openAddModal}
                                        />
                                    )
                                    :
                                    (<></>)
                                }
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

                        { eventos.map((evento: CronogramaType) => {
                            const dataEv = new Date(evento.data_crono)

                            return (
                                <Evento 
                                    key={evento.id_crono} 
                                    data={dataEv}
                                    titulo={evento.desc_cono} 
                                    global={evento.em_crono == 'EM0'} 
                                    admin={parseInt(xUserLogged) <= 12}
                                    id_crono={evento.id_crono}
                                /> 
                            )
                        }) }
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
                                defaultValue={dia}
                                onChangeText={setDia}
                                inputMode="numeric"
                            />
                            <TextInput
                                label="Mês"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#B20000"
                                activeOutlineColor="#B20000"
                                defaultValue={mes}
                                onChangeText={setMes}
                                inputMode="numeric"
                            />
                            <TextInput
                                label="Título"
                                mode="outlined"
                                style={ContainerStyles.input}
                                outlineColor="#B20000"
                                activeOutlineColor="#B20000"
                                defaultValue={titulo}
                                onChangeText={setTitulo}
                            />

                            <Button
                                mode="contained"
                                style={ContainerStyles.mainButton}
                                textColor="#fff"
                                labelStyle={{ fontSize: 16 }}
                                onPress={async () => {
                                    console.log("Adicionar:", { dia, mes, titulo });
                                    const data = new Date(2025, parseInt(mes) - 1, parseInt(dia))
                                    const dataDb = data.toISOString()
                                    const user = await api.getUsuario(parseInt(xUserLogged))

                                    console.log(dataDb)
                                    console.log(user)

                                    await api.registerCrono(titulo, dataDb, user[0].em_user, parseInt(xUserLogged))
                                    generateEvents()

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
                                defaultValue={editEvento.dia}
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
                                defaultValue={editEvento.mes}
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
                                defaultValue={editEvento.titulo}
                                onChangeText={(text) =>
                                    setEditEvento({ ...editEvento, titulo: text })
                                }
                            />

                            <Button
                                mode="contained"
                                style={ContainerStyles.mainButton}
                                textColor="#fff"
                                labelStyle={{ fontSize: 16 }}
                                onPress={async () => {
                                    console.log("Editar:", editEvento)
                                    const dataEdit = new Date(2025, parseInt(editEvento.mes) - 1, parseInt(editEvento.dia))
                                    const dataDb = dataEdit.toISOString()
                                    const user = await api.getUsuario(parseInt(xUserLogged))

                                    await api.updateCrono(editEvento.id, editEvento.titulo, dataDb, user[0].em_user, parseInt(xUserLogged))
                                    generateEvents()

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
