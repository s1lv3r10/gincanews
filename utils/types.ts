import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

export type UserProps = {
    login?: {
        username: string,
    }
}
export type BottomTabParams = {
    Gincanews: undefined,
    User: UserProps
}

export type UserNavProps = BottomTabScreenProps<BottomTabParams, 'User', 'nav'>