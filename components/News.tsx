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
    const [addNoticia, setAddNoticia] = useState<NoticiaType>(null)
    const [editNoticia, setEditNoticia] = useState<NoticiaType>(null) // dar um jeito de pegar esse id do banco
    const [editingId, setEditingId] = useState<number | null>(null) 
    
    const [foto, setFoto] = useState('')

    // Estado para detalhe
    const [selectedNoticia, setSelectedNoticia] = useState<NoticiaType>(null);

    // Função para escolher imagem
    const pickImage = async (from: string) => {
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
            if (from == 'edit') {
                setEditNoticia({...editNoticia, midia_not: foto})
            } else if (from == 'add') {
                setAddNoticia({...addNoticia, midia_not: foto})
            }
        }
    };

    // Adicionar notícia
    const handleAdd = () => {
        if (!addNoticia.mmanchete_not  || !addNoticia.desc_not || !addNoticia.midia_not || !addNoticia.data_not) {
            alert("Preencha todos os campos!");
            return;
        }

        // ! ADD TO DATABASE !

        setVisibleAdd(false);
        limparCampos();
    };

    // Editar notícia
    const handleEdit = () => {
        if (!editingId) return;
        // edit in db
        setVisibleEdit(false);
        limparCampos();
    };

    // Excluir notícia
    // const handleDelete = (id: number) => {
    //     setNoticias(noticias.filter((n) => n.id !== id));
    // };

    // Abrir modal de edição
    const abrirEdicao = (noticia: NoticiaType) => {
        setEditNoticia(noticia)
        setEditingId(noticia.id_not);
        setVisibleEdit(true);
    };

    // Abrir modal de detalhes
    const abrirDetalhes = (noticia: NoticiaType) => {
        setSelectedNoticia(noticia);
        setVisibleDetail(true);
    };

    // Limpar campos
    const limparCampos = () => {
        setEditNoticia(null)
        setAddNoticia(null)

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
                                                onPress={() => abrirEdicao(item)}
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
                        {
                            news 
                            ? (
                                news.map((n: NoticiaType) => (
                                    <NoticiasCard key={n.id_not} item={n} />
                                ))
                            )
                            : (<></>)
                        }
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
                            defaultValue={addNoticia ? addNoticia.mmanchete_not : ''}
                            onChangeText={t => setAddNoticia({...addNoticia, mmanchete_not: t})}
                        />
                        <TextInput
                            label="Descrição"
                            mode="outlined"
                            multiline
                            numberOfLines={4}
                            style={[ContainerStyles.input, { height: 100 }]}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={addNoticia ? addNoticia.desc_not : '...'}
                            onChangeText={t => setAddNoticia({...addNoticia, desc_not: t})}
                        />
                        <TextInput
                            label="Data (AAAA-MM-DD)"
                            mode="outlined"
                            style={ContainerStyles.input}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={addNoticia ? addNoticia.data_not : ''}
                            onChangeText={t => setAddNoticia({...addNoticia, data_not: t})}
                        />
                        <Button
                            mode="outlined"
                            onPress={async () => await pickImage('add')}
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
                            onPress={handleAdd}
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
                            defaultValue={editNoticia ? editNoticia.mmanchete_not : ''}
                            onChangeText={t => setEditNoticia({...editNoticia, mmanchete_not: t})}
                        />
                        <TextInput
                            label="Descrição"
                            mode="outlined"
                            multiline
                            numberOfLines={4}
                            style={[ContainerStyles.input, { height: 100 }]}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={editNoticia ? editNoticia.desc_not.replaceAll('%', ',') : ''}
                            onChangeText={t => setEditNoticia({...editNoticia, desc_not: t})}
                        />
                        <TextInput
                            label="Data (AAAA-MM-DD)"
                            mode="outlined"
                            style={ContainerStyles.input}
                            outlineColor="#B20000"
                            activeOutlineColor="#B20000"
                            defaultValue={editNoticia ? editNoticia.data_not.substring(0, 10) : ''}
                            onChangeText={t => setEditNoticia({...editNoticia, data_not: t})}
                        />
                        <Button
                            mode="outlined"
                            onPress={async () => await pickImage('edit')}
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
