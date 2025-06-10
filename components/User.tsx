import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { UserNavProps } from "../utils/types";
import { ContainerStyles } from "../utils/styles";

export default function User({ route }: UserNavProps) {
    const theme = useTheme()

    return (
        <View 
            style={[{
                backgroundColor: theme.colors.background
            }, ContainerStyles.default]}
        >
            <Text>TBI</Text>
        </View>
    );
}
