import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

export type BottomTabParams = {
    Gincanews: undefined,
    Calendario: undefined,
    Notícias: undefined,
    User: undefined,
    Start: undefined,
}

export type UserNavProps = BottomTabScreenProps<BottomTabParams, 'User', 'nav'>
export type HomeNavProps = BottomTabScreenProps<BottomTabParams, 'Gincanews', 'nav'>
export type CalendarioNavProps = BottomTabScreenProps<BottomTabParams, 'Calendario', 'nav'>
export type NoticiasNavProps = BottomTabScreenProps<BottomTabParams, 'Notícias', 'nav'>