import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

export type BottomTabParams = {
    Gincanews: undefined,
    Cronograma: undefined,
    Notícias: undefined,
    Info: undefined,
    Start: undefined,
}

export type InfoNavProps = BottomTabScreenProps<BottomTabParams, 'Info', 'nav'>
export type HomeNavProps = BottomTabScreenProps<BottomTabParams, 'Gincanews', 'nav'>
export type CronogramaNavProps = BottomTabScreenProps<BottomTabParams, 'Cronograma', 'nav'>
export type NoticiasNavProps = BottomTabScreenProps<BottomTabParams, 'Notícias', 'nav'>