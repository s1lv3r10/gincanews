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
    },
    cardEvento: { //Cards de datas
        width: 180,
        margin: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    homeButton: {
        backgroundColor: '#911919',
        margin: 10,
        padding: 5,
        borderRadius: 100
    },
    horizontalRule: {
        borderBottomColor: '#911919',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 10,
    },
    Title: {
        color: '000',
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subTitle: {
        color: 'rgb(146, 146, 146)',
        fontSize: 16,
        textAlign: 'center'
    },
    cardNews: { //Cards de últimos eventos
        margin: 5,
    },
    cardText: {
        textAlign: 'center'
    },
    cardDate: {
        fontSize: 20,
        textAlign: 'center'
    },
    cardTitle: {
        color: '000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    },
    cardSubTitle: {
        color: 'rgb(146, 146, 146)',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
    },
    cardTitle2: {
        color: '000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    },
});
