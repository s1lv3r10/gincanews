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
    logoHome:{
        height: 50,
        width: 50
    },
    cardEvento: { //Cards de datas
        width: 180,
        margin: 3,
    },
    row: { //separa os cards de data abaixo do de notícia
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    homeButton: { //Botão de todos os eventos da Home
        backgroundColor: '#911919',
        margin: 10,
        padding: 5,
        borderRadius: 100
    },
    horizontalRule: { //Linha horizontal
        borderBottomColor: '#911919',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 10,
    },
    Title: { //Título padrão
        color: '000',
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subTitle: { //Subtítulo padrão
        color: 'rgb(146, 146, 146)',
        fontSize: 16,
        textAlign: 'center'
    },
    cardNews: { //Cards de últimos eventos que fica no final da home
        margin: 5,
    },
    cardText: { //Texto padrão do card
        textAlign: 'center'
    },
    cardDate: { //Datas dos cards de data
        fontSize: 20,
        textAlign: 'center'
    },
    cardTitle: { //Título padrão do card
        color: '000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    },
    cardSubTitle: { //Subtítulo padrão do card
        color: 'rgb(146, 146, 146)',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
    },
    cardTitle2: { //Título padrão do card nº2
        color: '000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    },
});
