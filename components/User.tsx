import { View } from "react-native"
import { Text, TextInput, Button } from "react-native-paper"

export default function User() {
    return (
        <View style={{flex: 1, justifyContent: 'center', margin: 30, gap: 20}}>
            { /* se nao tiver logado, aparece login ao invés da central de conta */ }
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
}