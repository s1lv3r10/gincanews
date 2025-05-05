import { View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import { UserNavProps } from "../utils/types";

export default function User({ route }: UserNavProps) {
    const login = route?.params?.login;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3306/api/login", {
                username,
                password
            });

            if (response.data) {
                setUserData(response.data);
                setError("");
            } else {
                setError("Usuário ou senha incorretos.");
            }
        } catch (err) {
            setError("Erro ao conectar-se ao servidor.");
        }
    };

    //if (login || userData) {
      //  return (
        //    <View style={{ flex: 1, justifyContent: "center", margin: 30, gap: 20 }}>
          //      <Text>Logado como {userData?.username || login?.username}</Text>
           // </View>
       // );
    //}

    return (
        <View style={{ flex: 1, justifyContent: "center", margin: 30, gap: 20 }}>
            <View style={{ alignItems: "center" }}>
                <Text variant="displayMedium">Fazer Login</Text>
            </View>
            <TextInput 
                label="Nome de usuário"
                mode="outlined"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput 
                label="Senha"
                mode="outlined"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Button 
                mode="contained"
                icon="login"
                onPress={handleLogin}
            >
                Fazer login
            </Button>
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <View style={{ alignItems: "center" }}>
                <Text>
                    Não possui uma conta?
                    <Text style={{ color: "#458cff", fontWeight: "bold" }}> Clique aqui</Text> para criar uma!
                </Text>
            </View>
        </View>
    );
}
