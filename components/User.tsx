import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { UserNavProps } from "../utils/types";
import { ContainerStyles, ThemeType } from "../utils/styles";

export default function User({ route }: UserNavProps) {
  const theme = useTheme<ThemeType>()

  return (
    <View
      style={[{
        backgroundColor: theme.colors.background
      }, ContainerStyles.default]}
    >
      <Text style={{ color: theme.colors.cinzaPrincipal }}>TBI</Text>
    </View>
  );
}
