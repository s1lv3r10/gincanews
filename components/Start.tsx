import { useContext, useEffect, useState } from "react";
import { View, ScrollView, ImageBackground, Image } from "react-native";
import { Text, useTheme, Card, Button, TextInput, Portal, Modal,} from "react-native-paper";
import { ContainerStyles, ThemeType } from "../utils/styles";
import { HomeNavProps } from "../utils/types";
import { AuthContext } from "../App";

export default function Start({ navigation }: HomeNavProps) {
  const theme = useTheme<ThemeType>();
  const back = require("../img/fundo.png");
  const logo = require("../img/logo.png");

  const { signIn, signUp, checkCredentials } = useContext(AuthContext)

  // estado login
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [registerEmail, setRegisterEmail] = useState('')
  const [registerNome, setRegisterNome] = useState('')
  const [registerLogin, setRegisterLogin] = useState('')
  const [registerEm, setRegisterEm] = useState('')
  const [registerSenha, setRegisterSenha] = useState('')
  const [registerSenhaConfirm, setRegisterSenhaConfirm] = useState('')

  // estado modal de cadastro
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const [sucessoCad, setSucessoCad] = useState(false) // msg de sucesso vai aparecer ou nao

  // estado view erro de credencial
  const [credentialError, setCredentialError] = useState(0)

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={back}
        resizeMode="cover"
        style={ContainerStyles.background}
      >
        <ScrollView>
          <View style={{ flex: 1, padding: 16 }}>
            <Card style={ContainerStyles.CardLogin}>
              <Card.Content style={{ backgroundColor: "#fff", borderRadius: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={logo} style={ContainerStyles.logo} />
                  <Text style={ContainerStyles.textLogo}>Gincanews</Text>
                </View>

                {/* Usuário */}
                <View>
                  <Text style={ContainerStyles.cardTitle2}>Nome de Usuário</Text>
                  <TextInput
                    label="Nome de Usuário"
                    mode="outlined"
                    style={ContainerStyles.input}
                    outlineColor="#B20000"
                    activeOutlineColor="#B20000"
                    defaultValue={email}
                    onChangeText={t => setEmail(t)}
                  />
                </View>

                {/* Senha */}
                <View>
                  <Text style={ContainerStyles.cardTitle2}>Senha</Text>
                  <TextInput
                    label="Senha"
                    mode="outlined"
                    style={ContainerStyles.input}
                    outlineColor="#B20000"
                    activeOutlineColor="#B20000"
                    secureTextEntry={!senhaVisivel}
                    defaultValue={senha}
                    onChangeText={t => setSenha(t)}
                    right={
                      <TextInput.Icon
                        icon={senhaVisivel ? "eye-off" : "eye"}
                        onPress={() => setSenhaVisivel(!senhaVisivel)}
                      />
                    }
                  />
                </View>

                <View>
                  <Text style={[ContainerStyles.cardTitle2, { color: '#B20000' }]}>
                    { 
                      credentialError == 401
                      ? 'Erro: Credenciais inválidas! ' 
                      : credentialError == 500
                      ? 'Houve um erro; tente novamente mais tarde!'
                      : '' 
                    }
                  </Text>
                </View>
                <View>
                  <Text style={[ContainerStyles.cardTitle2, { color: '#A0C340' }]}>
                    { sucessoCad ? 'Cadastro bem sucedido! Faça login utilizando suas credenciais' : '' }
                  </Text>
                </View>

                {/* Botão Entrar */}
                <Button
                  mode="contained"
                  style={ContainerStyles.mainButton}
                  labelStyle={{ fontSize: 16, color: "#fff" }}
                  onPress={async () => {
                    const credentialsValid = await checkCredentials({ username: email, senha: senha })
                    if (credentialsValid == 0) {
                      signIn({ username: email, senha: senha })
                    } else {
                      setCredentialError(credentialsValid)
                    }
                    setSucessoCad(false)
                  }}
                >
                  Entrar
                </Button>

                {/* Criar conta */}
                <View style={ContainerStyles.NovaConta}>
                  <Text style={{ fontSize: 15 }}>Não tem conta?</Text>
                  <Button
                    mode="text"
                    compact
                    onPress={openModal}
                    labelStyle={{ fontSize: 15, color: "#B20000" }}
                  >
                    Cadastre-se
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Modal de Cadastro */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeModal}
          contentContainerStyle={{
            backgroundColor: "transparent",
            paddingHorizontal: 20,
            paddingVertical: 40,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Card style={{ backgroundColor: "#fff", borderRadius: 10, maxHeight: "80%" }}>
            <Card.Title title="Criar Conta" />

            <ScrollView
              style={{ maxHeight: "90%" }}
              contentContainerStyle={{ padding: 20 }}
              showsVerticalScrollIndicator={true}
            >
              <Text style={ContainerStyles.cardTitle2}>Nome de Exibição</Text>
              <TextInput
                label="Nome Completo"
                mode="outlined"
                style={ContainerStyles.input}
                outlineColor="#B20000"
                activeOutlineColor="#B20000"
                defaultValue={registerNome}
                onChangeText={t => setRegisterNome(t)}
              />

              <Text style={ContainerStyles.cardTitle2}>Nome de Usuário</Text>
              <TextInput
                label="Nome de Usuário"
                mode="outlined"
                style={ContainerStyles.input}
                outlineColor="#B20000"
                activeOutlineColor="#B20000"
                defaultValue={registerLogin}
                onChangeText={t => setRegisterLogin(t)}
              />

              <Text style={ContainerStyles.cardTitle2}>Email</Text>
              <TextInput
                label="Email"
                mode="outlined"
                style={ContainerStyles.input}
                outlineColor="#B20000"
                activeOutlineColor="#B20000"
                defaultValue={registerEmail}
                onChangeText={t => setRegisterEmail(t)}
              />

              <Text style={ContainerStyles.cardTitle2}>Senha</Text>
              <TextInput
                label="Senha"
                mode="outlined"
                style={ContainerStyles.input}
                outlineColor="#B20000"
                activeOutlineColor="#B20000"
                secureTextEntry={!senhaVisivel}
                defaultValue={registerSenha}
                onChangeText={t => setRegisterSenha(t)}
                right={
                  <TextInput.Icon
                    icon={senhaVisivel ? "eye-off" : "eye"}
                    onPress={() => setSenhaVisivel(!senhaVisivel)}
                  />
                }
              />

              <Text style={ContainerStyles.cardTitle2}>Confirmar Senha</Text>
              <TextInput
                label="Confirmar Senha"
                mode="outlined"
                style={ContainerStyles.input}
                outlineColor="#B20000"
                activeOutlineColor="#B20000"
                defaultValue={registerSenhaConfirm}
                onChangeText={t => setRegisterSenhaConfirm(t)}
                secureTextEntry={!senhaVisivel}
                right={
                  <TextInput.Icon
                    icon={senhaVisivel ? "eye-off" : "eye"}
                    onPress={() => setSenhaVisivel(!senhaVisivel)}
                  />
                }
              />

              <Text style={ContainerStyles.cardTitle2}>EM (digite como "EM(numero)"")</Text>
              <TextInput
                label="EM"
                mode="outlined"
                style={ContainerStyles.input}
                defaultValue={registerEm}
                onChangeText={t => setRegisterEm(t)}
                outlineColor="#B20000"
                activeOutlineColor="#B20000"
              />

              <Button
                mode="contained"
                style={ContainerStyles.mainButton}
                textColor="#fff"
                labelStyle={{ fontSize: 16 }}
                onPress={() => {
                  closeModal()
                  signUp({
                    nome: registerNome,
                    login: registerLogin,
                    senha: registerSenha,
                    email: registerEmail,
                    em: registerEm
                  })
                  setSucessoCad(true)
                }}
              >
                Criar Conta
              </Button>

              <Button
                mode="outlined"
                textColor={theme.colors.vermelhoPrincipal}
                style={{
                  borderColor: theme.colors.vermelhoPrincipal,
                  borderWidth: 1,
                  margin: 10,
                  borderRadius: 100,
                }}
                onPress={closeModal}
              >
                Cancelar
              </Button>
            </ScrollView>
          </Card>
        </Modal>
      </Portal>
    </View>
  );
}
