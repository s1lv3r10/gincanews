import { View } from "react-native"
import { Text, TextInput, Button } from "react-native-paper"
import { UserNavProps } from "../utils/types"


export default function User({ route }: UserNavProps) {
    const login = route.params.login
    if (login === undefined) return (
        <View style={{flex: 1, justifyContent: 'center', margin: 30, gap: 20}}>
            <View style={{alignItems: 'center'}}>
                <Text variant="displayMedium">Fazer Login</Text>
            </View>
            <TextInput 
                label={'Nome de usuário'}
                mode="outlined"
            />
            <TextInput 
                label={'Senha'}
                mode="outlined"
            />
            <Button 
                mode="contained"
                icon='login'
            >
                Fazer login
            </Button>
            <View style={{alignItems: 'center'}}>
                <Text>
                    Não possui uma conta?
                    <Text style={{color: '#458cff', fontWeight: 'bold'}}> Clique aqui</Text> para criar uma!
                </Text>
            </View>
        </View>
    )
    else return (
        <View style={{flex: 1, justifyContent: 'center', margin: 30, gap: 20}}>
            <Text>logado, {login.username}</Text>
        </View>
    )
}