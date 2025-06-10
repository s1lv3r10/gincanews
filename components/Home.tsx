import { View } from "react-native"
import { Text, useTheme } from "react-native-paper"

export default function Home() {
    const theme = useTheme()
    
    return (
        <View 
            style={{
                margin: 50,
                backgroundColor: theme.colors.background
            }}
        >
            <Text>Home</Text>
        </View>
    )
}