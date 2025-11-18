import { useContext, useEffect, useState } from "react";
import { View, ScrollView, Image, ImageBackground } from "react-native";
import { Text, useTheme, Button, TextInput, Card, Modal, Portal, TouchableRipple, IconButton } from "react-native-paper";
import { ContainerStyles, ThemeType } from '../utils/styles';
import { FullUsuarioType, InfoNavProps } from "../utils/types";
import { AuthContext } from "../App";
import { Api } from "../utils/api";
import * as SecureStore from 'expo-secure-store'
//import Start from "./Start"

export default function Info({ navigation }: InfoNavProps) {
    const theme = useTheme<ThemeType>();
    const back = require('../img/fundo.png');
    const api = new Api()

    const { signOut, checkCredentials } = useContext(AuthContext)
    
    const id = parseInt(SecureStore.getItem('userLogged'))

    const [userEdit, setUserEdit] = useState<FullUsuarioType & { senhaOld: string, senhaNew: string }>(
        {} as (FullUsuarioType & { senhaOld: string, senhaNew: string })
    )

    //estado da senha
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    //estado do modal
    const [visible, setVisible] = useState(false);

    const openModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

    useEffect(() => {
        (async () => {
            const user = (await api.getUsuario(id))[0]

            setUserEdit({
                email_user: user.email_user,
                nome_user: user.nome_user,
                em_user: user.em_user,
                login_user: user.login_user,
                senhaOld: "",
                senhaNew: ""
            })
            console.log(userEdit)
        })()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={back}
                resizeMode="cover"
                style={ContainerStyles.background}
            >
                <ScrollView>
                    <View style={{ flex: 1, padding: 16 }}>
                        <View style={ContainerStyles.Topo}>
                            <Text style={[ContainerStyles.Title, { marginEnd: "20%" }]}>Conta</Text>
                            <Text style={ContainerStyles.subTitle}>
                                Visualize a configuração atual da sua conta
                            </Text>
                        </View>
                        {/* Botão abre modal */}
                        <View>
                            <Button
                                mode="contained"
                                style={ContainerStyles.mainButton}
                                textColor="#fff"
                                labelStyle={{ fontSize: 16 }}
                                onPress={openModal}
                            >
                                Configurar Conta
                            </Button>
                            <Button
                                mode="contained"
                                style={ContainerStyles.mainButton}
                                textColor="#fff"
                                labelStyle={{ fontSize: 16 }}
                                onPress={() => signOut()}
                            >
                                Logout
                            </Button>
                        </View>
                        <View style={ContainerStyles.horizontalRule} />
                        <View style={ContainerStyles.Topo}>
                            <Text style={[ContainerStyles.Title, { marginEnd: "20%" }]}>Sobre</Text>
                            <Text style={ContainerStyles.subTitle}>
                                Confira mais informações sobre a Etec Fernando Prestes no site
                            </Text>
                            <Text style={ContainerStyles.subTitle}>
                                https://etecfernandoprestes.cps.sp.gov.br/
                            </Text>
                        </View>
                        <View style={ContainerStyles.horizontalRule} />
                        {
                            id > 12
                            ?
                            (
                                <>
                                    { /* SEÇÃO COMUM */ }
                                    <View style={ContainerStyles.Topo}>
                                        <Text style={[ContainerStyles.Title, { marginEnd: "20%" }]}>Ajuda</Text>
                                        <Text style={ContainerStyles.subTitle}>
                                            Confira aqui como utilizar o aplicativo
                                        </Text>
                                        <Text style={ContainerStyles.txt}>
                                            Como usuário, você pode visualizar os eventos programados na aba cronograma, e definir se quer receber notificações sobre o evento ao clicar sobre a data.
                                        </Text>
                                        <Text style={ContainerStyles.txt}>Você também poderá conferir notícias sobre os útlimos eventos da escola, podendo ver detalhes acerca delas ao clicar sobre a imagem da notícia</Text>
                                        <Text style={[ContainerStyles.Title, { marginEnd: "20%" }]}>F.A.Q</Text>
                                        <Text style={ContainerStyles.txt}>
                                            "Posso adicionar notícias e datas de evento no calendário?"
                                        </Text>
                                        <Text style={ContainerStyles.subTitle}>
                                            Para usuários comuns, essa feature não está disponível.
                                        </Text>
                                        <Text style={ContainerStyles.txt}>
                                            "Como diferenciar as datas de eventos para todos e para o meu EM?"
                                        </Text>
                                        <Text style={ContainerStyles.subTitle}>
                                            Você pode diferenciá-los através das cores da data, vermelho para o Cronograma Global e cinza para o Cronograma do EM
                                        </Text>
                                    </View>
                                </>
                            )
                            :
                            (
                                <>
                                    { /* SEÇÃO ADMINISTRADOR */ }
                                    <View style={ContainerStyles.Topo}>
                                        <Text style={[ContainerStyles.Title, { marginEnd: "20%" }]}>Ajuda</Text>
                                        <Text style={ContainerStyles.subTitle}>
                                            Confira aqui como utilizar o aplicativo 
                                        </Text>
                                        <Text style={ContainerStyles.txt}>
                                            Como usuário administrador, você pode adicionar, editar, atualizar e excluir eventos na aba cronograma. Para adicionar, você deve clicar no ícone "+" no topo da página e preencher o forumulário que abre na tela. Para editar ou excluir, deve-se tocar nos ícones correspondentes, de lápis e lata de lixo no evento específico.
                                        </Text>
                                        <Text style={ContainerStyles.txt}>O processo para as notícias é o mesmo, com os mesmos ícones.</Text>
                                        <Text style={ContainerStyles.txt}>Assim que fizer seu primeiro acesso, deve trocar a senha e o email que estavam sendo utilizados pelo usuário anterior, para poder receber informações necessárias.</Text>
                                        <Text style={[ContainerStyles.Title, { marginEnd: "20%" }]}>F.A.Q</Text>
                                        <Text style={ContainerStyles.txt}>
                                            "Posso editar artigos colocados por outros usuários?"
                                        </Text>
                                        <Text style={ContainerStyles.subTitle}>
                                            Sim, é possível editar artigos colocados por outros usuários.
                                        </Text>
                                    </View>
                                </>
                            )
                        }
                    </View>
                </ScrollView>
                {/* Modal para editar conta */}
                <Portal>
                    <Modal
                        visible={visible}
                        onDismiss={closeModal}
                        contentContainerStyle={{
                            backgroundColor: 'transparent', // deixa fundo transparente
                            paddingHorizontal: 20,
                            paddingVertical: 40,
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Card style={{ backgroundColor: '#fff', borderRadius: 10, maxHeight: '80%' }}>
                            <Card.Title title="Editar Conta" />

                            {/* 🔥 ScrollView dentro do Card */}
                            <ScrollView
                                style={{ maxHeight: '90%' }}
                                contentContainerStyle={{ padding: 20 }}
                                showsVerticalScrollIndicator={true}
                            >
                                <Text style={ContainerStyles.cardTitle2}>Nome de Usuário</Text>
                                <TextInput
                                    label="Nome de Usuário"
                                    mode="outlined"
                                    style={ContainerStyles.input}
                                    outlineColor="#B20000"
                                    activeOutlineColor="#B20000"
                                    defaultValue={userEdit.login_user}
                                    onChangeText={t => setUserEdit({...userEdit, login_user: t})}
                                />

                                <Text style={ContainerStyles.cardTitle2}>Nome de Exibição</Text>
                                <TextInput
                                    label="Nome de Exibição"
                                    mode="outlined"
                                    style={ContainerStyles.input}
                                    outlineColor="#B20000"
                                    activeOutlineColor="#B20000"
                                    defaultValue={userEdit.nome_user}
                                    onChangeText={t => setUserEdit({...userEdit, nome_user: t})}
                                />

                                <Text style={ContainerStyles.cardTitle2}>Senha</Text>
                                <TextInput
                                    label="Senha"
                                    mode="outlined"
                                    style={ContainerStyles.input}
                                    outlineColor="#B20000"
                                    activeOutlineColor="#B20000"
                                    secureTextEntry={!senhaVisivel}
                                    right={
                                        <TextInput.Icon
                                            icon={senhaVisivel ? "eye-off" : "eye"}
                                            onPress={() => setSenhaVisivel(!senhaVisivel)}
                                        />
                                    }
                                    defaultValue={userEdit.senhaOld}
                                    onChangeText={t => setUserEdit({...userEdit, senhaOld: t})}
                                />

                                <Text style={ContainerStyles.cardTitle2}>Nova Senha</Text>
                                <TextInput
                                    label="Nova senha (opcional)"
                                    mode="outlined"
                                    style={ContainerStyles.input}
                                    outlineColor="#B20000"
                                    activeOutlineColor="#B20000"
                                    secureTextEntry={!senhaVisivel}
                                    right={
                                        <TextInput.Icon
                                            icon={senhaVisivel ? "eye-off" : "eye"}
                                            onPress={() => setSenhaVisivel(!senhaVisivel)}
                                        />
                                    }
                                    defaultValue={userEdit.senhaNew}
                                    onChangeText={t => setUserEdit({...userEdit, senhaNew: t})}
                                />

                                <Text style={ContainerStyles.cardTitle2}>EM</Text>
                                <TextInput
                                    label="EM"
                                    mode="outlined"
                                    style={ContainerStyles.input}
                                    outlineColor="#B20000"
                                    activeOutlineColor="#B20000"
                                    defaultValue={userEdit.em_user}
                                    onChangeText={t => setUserEdit({...userEdit, em_user: t})}
                                />

                                <Button
                                    mode="contained"
                                    style={ContainerStyles.mainButton}
                                    textColor="#fff"
                                    labelStyle={{ fontSize: 16 }}
                                    onPress={async () => {
                                        // ver se as credenciais tao certas
                                        const successCredential: boolean = (await checkCredentials(
                                            { username: userEdit.login_user, senha: userEdit.senhaOld}
                                        )) == 0
                                        if (successCredential) {
                                            // editar
                                            const newPass = userEdit.senhaNew == '' ? userEdit.senhaOld : userEdit.senhaNew
                                            const updated = await api.updateUsuario(
                                                id,
                                                userEdit.email_user,
                                                newPass,
                                                userEdit.login_user,
                                                userEdit.em_user,
                                                userEdit.nome_user
                                            )
                                            closeModal()
                                        } else {
                                            // mostrar q deu errado
                                        }
                                    }}
                                >
                                    Salvar
                                </Button>
                            </ScrollView>
                        </Card>
                    </Modal>
                </Portal>

            </ImageBackground>
        </View>
    );
}