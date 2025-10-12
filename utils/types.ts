import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

export type BottomTabParams = {
    Gincanews: undefined,
    Cronograma: undefined,
    Notícias: undefined,
    Info: undefined,
    Start: undefined,
    LoadingSplash: undefined
}

export type InfoNavProps = BottomTabScreenProps<BottomTabParams, 'Info', 'nav'>
export type HomeNavProps = BottomTabScreenProps<BottomTabParams, 'Gincanews', 'nav'>
export type CronogramaNavProps = BottomTabScreenProps<BottomTabParams, 'Cronograma', 'nav'>
export type NoticiasNavProps = BottomTabScreenProps<BottomTabParams, 'Notícias', 'nav'>

export type CronogramaType = {
    id_crono: number,
    desc_cono: string,
    data_crono: string,
    em_crono: string
}

export type UsuarioType = {
    id_user: number,
    email_user: string,
    nome_user: string,
}