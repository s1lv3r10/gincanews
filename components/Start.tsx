import { View, ScrollView, ImageBackground, Image } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ContainerStyles, ThemeType } from "../utils/styles";
import { HomeNavProps } from "../utils/types";

export default function Start({ navigation }) {
  const theme = useTheme<ThemeType>();
  const back = require("../img/fundo.png");
  const logo = require("../img/logo.png");
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
              <Card.Content style={{backgroundColor: '#fff', borderRadius: 10}}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={logo}
                    style={ContainerStyles.logo} />
                  <Text style={ContainerStyles.textLogo}>Gincanews</Text>
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
                  <Text style={ContainerStyles.cardTitle2}>Senha</Text>
                  <TextInput
                    label="Senha"
                    mode="outlined"
                    style={ContainerStyles.input}
                    outlineColor="#B20000"
                    activeOutlineColor="#B20000"
                  />
                </View>
                <Button
                  mode="contained"
                  style={ContainerStyles.homeButton}
                  labelStyle={{ fontSize: 16, color: '#fff' }}
                  onPress={() => navigation.navigate('Gincanews')}>
                  Entrar
                </Button>
                <View style={ContainerStyles.NovaConta}>
                  <Text style={{ fontSize: 15 }}>Não tem conta?</Text>
                  <Button
                    mode="text"
                    compact
                    onPress={() => console.log("Criar conta")}
                    labelStyle={{ fontSize: 15, color: '#B20000' }}
                  >
                    Cadastre-se
                  </Button>
                </View>

              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}