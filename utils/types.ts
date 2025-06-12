import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

export type BottomTabParams = {
    Gincanews: undefined,
    Calendario: undefined,
    Eventos: undefined,
    User: undefined,
}

export type UserNavProps = BottomTabScreenProps<BottomTabParams, 'User', 'nav'>