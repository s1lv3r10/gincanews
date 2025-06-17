import { View, ScrollView } from "react-native";
import { Text, useTheme, Card, Button, TouchableRipple } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { ContainerStyles, ThemeType } from '../utils/styles';

export default function Calendario() {
    const theme = useTheme<ThemeType>();
    const navigation = useNavigation();

    return (
        <ScrollView>

        </ScrollView>
    );
}