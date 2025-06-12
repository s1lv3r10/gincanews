import { MD3LightTheme as BaseTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

export const MainTheme = {
    ...BaseTheme,
    colors: {
        ...BaseTheme.colors,
        // cores cps etc
        vermelhoPrincipal: '#911919',
        cinzaPrincipal: '#383636',
    }
}

export type ThemeType = typeof MainTheme;

export const ContainerStyles = StyleSheet.create({
    default: {
        flex: 1,
        justifyContent: "center", 
        alignItems: 'center',
        padding: 30, 
        gap: 20,
    }
})