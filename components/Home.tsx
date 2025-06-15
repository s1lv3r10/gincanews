import { View } from "react-native"
import { Text, useTheme, Card, Button } from "react-native-paper"

export default function Home() {
    const theme = useTheme()

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Card>
                <Card.Content>
                    <Text variant="titleLarge">Última Notícia</Text>
                    <Text variant="bodyMedium">EM2 Campeão do Vôlei</Text>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions style={{ justifyContent: 'center' }}>
                    <Button
                        mode="outlined"
                        textColor={theme.colors.vermelhoPrincipal}
                        style={{
                            borderColor: theme.colors.vermelhoPrincipal,
                            borderWidth: 1,
                            paddingHorizontal: 20,
                        }}
                    >
                        Veja Mais
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    )
}
