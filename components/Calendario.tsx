import { View, ScrollView } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { ContainerStyles, ThemeType } from '../utils/styles';
import { CalendarioNavProps } from "../utils/types";

export default function Calendario({ navigation }: CalendarioNavProps) {
    const theme = useTheme<ThemeType>();

    return (
        <ScrollView>
            {/* Próximos Eventos */}
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={ContainerStyles.Title}>Todos os Eventos</Text>
                <Text style={ContainerStyles.subTitle}>
                    Confira aqui seus próximos eventos
                </Text>
                {/** Cards clicáveis */}
                <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                    <Card style={ContainerStyles.cardNews}>
                        <Card.Content>
                                <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                    Próximo Evento
                                </Text>
                                <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                                    Entrega do Leite
                                </Text>
                                <Text variant="bodyLarge" style={ContainerStyles.cardDate}>
                                    27/06
                                </Text>
                        </Card.Content>
                    </Card>
                </TouchableRipple>
                <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                    <Card style={ContainerStyles.cardNews}>
                        <Card.Content>
                                <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                    Próximo Evento
                                </Text>
                                <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                                    Entrega do Leite
                                </Text>
                                <Text variant="bodyLarge" style={ContainerStyles.cardDate}>
                                    27/06
                                </Text>
                        </Card.Content>
                    </Card>
                </TouchableRipple>

                <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                    <Card style={ContainerStyles.cardNews}>
                        <Card.Content>
                                <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                    Próximo Evento
                                </Text>
                                <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                                    Entrega do Leite
                                </Text>
                                <Text variant="bodyLarge" style={ContainerStyles.cardDate}>
                                    27/06
                                </Text>
                        </Card.Content>
                    </Card>
                </TouchableRipple>
                <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                    <Card style={ContainerStyles.cardNews}>
                        <Card.Content>
                                <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                    Próximo Evento
                                </Text>
                                <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                                    Entrega do Leite
                                </Text>
                                <Text variant="bodyLarge" style={ContainerStyles.cardDate}>
                                    27/06
                                </Text>
                        </Card.Content>
                    </Card>
                </TouchableRipple>
                <TouchableRipple onPress={() => navigation.navigate('Calendario')} borderless>
                    <Card style={ContainerStyles.cardNews}>
                        <Card.Content>
                                <Text variant="titleMedium" style={ContainerStyles.cardText}>
                                    Próximo Evento
                                </Text>
                                <Text variant="bodyMedium" style={ContainerStyles.cardText}>
                                    Entrega do Leite
                                </Text>
                                <Text variant="bodyLarge" style={ContainerStyles.cardDate}>
                                    27/06
                                </Text>
                        </Card.Content>
                    </Card>
                </TouchableRipple>
            </View>
        </ScrollView>
    );
}