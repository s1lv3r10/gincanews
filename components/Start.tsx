import { View, ScrollView, ImageBackground } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple, TextInput} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ContainerStyles, ThemeType } from "../utils/styles";
import { CalendarioNavProps } from "../utils/types";

export default function Start() {
  const theme = useTheme<ThemeType>();
  const back = require("../img/fundo.png");
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={back}
        resizeMode="cover"
        style={ContainerStyles.background}
      >
        <ScrollView>
          <Card style={{ backgroundColor: "#fff" }}>
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
                <Text style={ContainerStyles.cardTitle2}>Senha</Text>
                <TextInput
                  label="Senha"
                  mode="outlined"
                  style={ContainerStyles.input}
                  outlineColor="#B20000"
                  activeOutlineColor="#B20000"
                />
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
