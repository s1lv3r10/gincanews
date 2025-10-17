import React, { useEffect, useState } from "react";
import { View, ScrollView, ImageBackground, Image } from "react-native";
import { Text, useTheme, Card, TouchableRipple, IconButton, Portal, Modal, Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from 'expo-secure-store'
import { NoticiasNavProps, NoticiaType } from "../utils/types";
import { ContainerStyles, ThemeType } from "../utils/styles";
import { Api } from "../utils/api";

export default function News({ navigation }: NoticiasNavProps) {
    const back = require("../img/fundo.png");
    const theme = useTheme<ThemeType>();

    const api = new Api()
    const id = SecureStore.getItem('userLogged')
    const authorized = parseInt(id) <= 12

    const [news, setNews] = useState<NoticiaType[]>([])

    const generateEvents = async () => {
        const news = await api.getAllNews()
        console.log(news)

        setNews(news)
    }

    useEffect(() => {
        generateEvents()
    }, [])

    // Estados dos modais
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDetail, setVisibleDetail] = useState(false);

    // Inputs
    const [manchete, setManchete] = useState("");
    const [autor, setAutor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [foto, setFoto] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    // Estado para detalhe
    const [selectedNoticia, setSelectedNoticia] = useState<NoticiaType>(null);

    // Função para escolher imagem
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permissão para acessar a galeria é necessária!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    };

    // Adicionar notícia
    // const handleAdd = () => {
    //     if (!manchete || !autor || !descricao || !data || !foto) {
    //         alert("Preencha todos os campos!");
    //         return;
    //     }
    //     const nova = {
    //         id: Date.now(),
    //         manchete,
    //         foto,
    //         autor,
    //         descricao,
    //         data
    //     };
    //     setNoticias([...noticias, nova]);
    //     setVisibleAdd(false);
    //     limparCampos();
    // };

    // // Editar notícia
    // const handleEdit = () => {
    //     if (!editingId) return;
    //     setNoticias(
    //         noticias.map((n) =>
    //             n.id === editingId ? { ...n, manchete, autor, descricao, data, foto } : n
    //         )
    //     );
    //     setVisibleEdit(false);
    //     limparCampos();
    // };

    // // Excluir notícia
    // const handleDelete = (id: number) => {
    //     setNoticias(noticias.filter((n) => n.id !== id));
    // };

    // Abrir modal de edição
    const abrirEdicao = (noticia: any) => {
        setEditingId(noticia.id);
        setManchete(noticia.manchete);
        setAutor(noticia.autor);
        setDescricao(noticia.descricao);
        setData(noticia.data);
        setFoto(noticia.foto);
        setVisibleEdit(true);
    };

    // Abrir modal de detalhes
    const abrirDetalhes = (noticia: NoticiaType) => {
        setSelectedNoticia(noticia);
        setVisibleDetail(true);
    };

    // Limpar campos
    const limparCampos = () => {
        setManchete("");
        setAutor("");
        setDescricao("");
        setData("");
        setFoto("");
        setEditingId(null);
    };

    // Componente do card
    const NoticiasCard = ({ item }: { item: NoticiaType }) => {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <TouchableRipple onPress={() => abrirDetalhes(item)} borderless>
                    <Card style={ContainerStyles.cardNews}>
                        {/* Título */}
                        <Card.Content>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    variant="titleMedium"
                                    style={[ContainerStyles.cardTitle2, { flex: 1, marginRight: 8 }]}
                                    numberOfLines={1}
                                >
                                    {item.mmanchete_not}
                                </Text>
                                {
                                    authorized
                                    ? 
                                    (
                                        <View style={{ flexDirection: "row" }}>
                                            <IconButton
                                                icon="pencil"
                                                size={20}
                                                // onPress={() => abrirEdicao(item)}
                                            />
                                            <IconButton
                                                icon="delete"
                                                size={20}
                                                // onPress={() => handleDelete(item.id)}
                                            />
                                        </View>
                                    )
                                    : (<></>)
                                }
                            </View>
                        </Card.Content>

                        {/* Foto */}
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={ContainerStyles.imagemCard} />

                        {/* Autor */}
                        <Card.Content>
                            <Text variant="titleSmall" style={ContainerStyles.cardSubTitle}>
                                Postado em {new Date(item.data_not).toLocaleString('pt-BR', { dateStyle: 'medium' })}
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableRipple>
            </View>
        );
    };
    
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={back} resizeMode="cover">
                <ScrollView>
                    <View style={{ flex: 1, padding: 16 }}>
                        <View style={ContainerStyles.Topo}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Text style={[ContainerStyles.Title, { marginRight: -10 }]}>
                                    Últimos Eventos
                                </Text>
                                {
                                    authorized
                                    ?
                                    (
                                        <IconButton
                                            icon="plus-circle"
                                            size={30}
                                            style={{ marginLeft: 20 }}
                                            onPress={() => setVisibleAdd(true)}
                                        />
                                    )
                                    : (<></>)
                                }
                            </View>
                            <Text style={ContainerStyles.subTitle}>
                                Confira um sumário dos últimos acontecimentos
                            </Text>
                        </View>
                        {news.map((n: NoticiaType) => (
                            <NoticiasCard key={n.mmanchete_not} item={n} />
                        ))}
                    </View>
                </ScrollView>

                <Portal>
                    {/* MODAL ADICIONAR */}
                    <Modal
                        visible={visibleAdd}
                        onDismiss={() => setVisibleAdd(false)}
                        contentContainerStyle={{
                            backgroundColor: "white",
                            padding: 20,
                            margin: 20,
                            borderRadius: 10,
                        }}
                    >
                        <Text variant="titleLarge" style={{ marginBottom: 10 }}>
                            Adicionar Notícia
                        </Text>
                        <TextInput
                            label="Manchete"
                            mode="outlined"
                            style={ContainerStyles.input}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={manchete}
                            onChangeText={setManchete}
                        />
                        <TextInput
                            label="Autor"
                            mode="outlined"
                            style={ContainerStyles.input}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={autor}
                            onChangeText={setAutor}
                        />
                        <TextInput
                            label="Descrição"
                            mode="outlined"
                            multiline
                            numberOfLines={4}
                            style={[ContainerStyles.input, { height: 100 }]}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={descricao}
                            onChangeText={setDescricao}
                        />
                        <TextInput
                            label="Data (AAAA-MM-DD)"
                            mode="outlined"
                            style={ContainerStyles.input}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={data}
                            onChangeText={setData}
                        />
                        <Button
                            mode="outlined"
                            onPress={pickImage}
                            textColor={theme.colors.vermelhoPrincipal}
                            style={{
                                borderColor: theme.colors.vermelhoPrincipal,
                                borderWidth: 1,
                                marginBottom: 10,
                            }}
                        >
                            Selecionar Foto
                        </Button>
                        {foto ? (
                            <Image
                                source={{ uri: foto }}
                                style={{ width: "100%", height: 150, marginBottom: 10 }}
                            />
                        ) : null}
                        <Button
                            mode="contained"
                            style={ContainerStyles.mainButton}
                            textColor="#fff"
                            // onPress={handleAdd}
                        >
                            Salvar
                        </Button>
                    </Modal>

                    {/* MODAL EDITAR */}
                    <Modal
                        visible={visibleEdit}
                        onDismiss={() => setVisibleEdit(false)}
                        contentContainerStyle={{
                            backgroundColor: "white",
                            padding: 20,
                            margin: 20,
                            borderRadius: 10,
                        }}
                    >
                        <Text variant="titleLarge" style={{ marginBottom: 10 }}>
                            Editar Notícia
                        </Text>
                        <TextInput
                            label="Manchete"
                            mode="outlined"
                            style={ContainerStyles.input}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={manchete}
                            onChangeText={setManchete}
                        />
                        <TextInput
                            label="Autor"
                            mode="outlined"
                            style={ContainerStyles.input}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={autor}
                            onChangeText={setAutor}
                        />
                        <TextInput
                            label="Descrição"
                            mode="outlined"
                            multiline
                            numberOfLines={4}
                            style={[ContainerStyles.input, { height: 100 }]}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={descricao}
                            onChangeText={setDescricao}
                        />
                        <TextInput
                            label="Data (AAAA-MM-DD)"
                            mode="outlined"
                            style={ContainerStyles.input}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={data}
                            onChangeText={setData}
                        />
                        <Button
                            mode="outlined"
                            onPress={pickImage}
                            textColor={theme.colors.vermelhoPrincipal}
                            style={{
                                borderColor: theme.colors.vermelhoPrincipal,
                                borderWidth: 1,
                                marginBottom: 10,
                            }}
                        >
                            Alterar Foto
                        </Button>
                        {foto ? (
                            <Image
                                source={{ uri: foto }}
                                style={{ width: "100%", height: 150, marginBottom: 10 }}
                            />
                        ) : null}
                        <Button
                            mode="contained"
                            style={ContainerStyles.mainButton}
                            textColor="#fff"
                            // onPress={handleEdit}
                        >
                            Salvar Alterações
                        </Button>
                    </Modal>

                    {/* MODAL DETALHES */}
                    <Modal
                        visible={visibleDetail}
                        onDismiss={() => setVisibleDetail(false)}
                        contentContainerStyle={{
                            backgroundColor: "white",
                            padding: 20,
                            margin: 20,
                            borderRadius: 10,
                        }}
                    >
                        {selectedNoticia && (
                            <>
                                <Text variant="titleLarge" style={{ marginBottom: 10 }}>
                                    {selectedNoticia.mmanchete_not}
                                </Text>
                                <Image
                                    source={{ uri: 'https://picsum.photos/700' }}
                                    style={{ width: "100%", height: 180, marginBottom: 10 }}
                                />
                                <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
                                    {selectedNoticia.desc_not.replaceAll('%', ',')}
                                </Text>
                                <Text variant="bodySmall">
                                    Postado em {new Date(selectedNoticia.data_not).toLocaleString('pt-BR', { dateStyle: 'medium' })}
                                </Text>
                            </>
                        )}
                    </Modal>
                </Portal>
            </ImageBackground>
        </View>
    );
}
