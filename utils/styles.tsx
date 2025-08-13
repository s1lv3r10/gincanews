import { MD3LightTheme as BaseTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Background } from "@react-navigation/elements";

export const MainTheme = {
    ...BaseTheme,
    colors: {
        ...BaseTheme.colors,
        // cores cps etc
        vermelhoPrincipal: '#B20000',
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
    Bg: {
        opacity: 0.6,
    },
    logoHome: {
        height: 50,
        width: 50
    },
    logo:{
        height: 65,
        width: 65,
        marginLeft: '20%',
        flexDirection: 'row',
        marginTop: 3,
        marginRight: 5
    },
    textLogo:{
        fontSize: 30,
        marginTop: '5%',
        fontWeight: 'bold', 
    },
    cardEvento: { //Cards de datas
        width: 180,
        margin: 3,
        backgroundColor: '#fff'
    },
    row: { //separa os cards de data abaixo do de notícia
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    redDot: {
        borderRadius: 360,
        width: 20,
        backgroundColor: '#B20000',
        marginLeft: 5,
        marginRight: 5,
    },
    grayDot: {
        borderRadius: 360,
        width: 20,
        backgroundColor: '#666666',
        marginLeft: 5,
        marginRight: 7
    },
    homeButton: { //Botão de todos os eventos da Home
        backgroundColor: '#B20000',
        margin: 10,
        padding: 5,
        borderRadius: 100
    },
    horizontalRule: { //Linha horizontal
        borderBottomColor: '#7E0000',
        borderBottomWidth: 2,
        marginVertical: 10,
    },
    Title: { //Título padrão
        color: '000',
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTitle: { //Subtítulo padrão
        color: 'rgb(146, 146, 146)',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 4
    },
    cardNews: { //Cards de últimos eventos que fica no final da home
        margin: 5,
        backgroundColor: '#fff'
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
        textAlign: 'left',
        margin: 2,
        marginLeft: 15
    },
    eventoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    dataContainer: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    diaGlobal: {
        color: '#B20000',
        fontSize: 28,
        fontWeight: 'bold',
    },
    mesGlobal: {
        color: '#B20000',
        fontSize: 14,
        marginTop: -4,
    },
    diaEM: {
        color: '#666666',
        fontSize: 28,
        fontWeight: 'bold',
    },
    mesEM: {
        color: '#666666',
        fontSize: 14,
        marginTop: -4,
    },
    textoContainer: {
        flex: 1,
    },
    titulo: {
        fontSize: 20,
        color: '#383636',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    foto: {
        width: 200,
        height: 200,
        borderRadius: 360,
        borderWidth: 2,
        borderColor: '#B20000',
    },
    edit: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#B20000',
        borderRadius: 20,
    },
    input: {
        backgroundColor: '#fff',
        marginVertical: 8,
        margin: 15,
        marginTop: 2,
    },
    imagemCard: {
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginVertical: 10,
    },
    Topo: {
        backgroundColor: '#fff',
        padding: 5,
        marginBottom: 5,
        borderRadius: 10
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    Modal: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    CardLogin: {
        margin: 5,
        backgroundColor: '#B20000',
        marginTop: '50%',
        padding: 5
    },
    NovaConta: { 
        flexDirection: "row", 
        alignItems: "center", 
        marginTop: 4, 
        marginLeft:'20%' 
    },
});
