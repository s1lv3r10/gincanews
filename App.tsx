import { View, Image, Text } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './components/Home';
import User from './components/User';
import News from './components/News';
import Calendario from './components/Calendario';

import { BottomTabParams } from './utils/types';
import { ContainerStyles, MainTheme, ThemeType } from './utils/styles';

const Stack = createBottomTabNavigator<BottomTabParams, 'Nav'>();

// 🔥 Componente do Header com Logo + Texto
function HeaderTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('./img/logo.png')}
        style={{ width: 40, height: 40, marginRight: 8 }}
      />
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
        Gincanews
      </Text>
    </View>
  );
}

function RootStack() {
  const theme = useTheme<ThemeType>();

  return (
    <Stack.Navigator
      id="Nav"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.vermelhoPrincipal,
          height: 85,
        },
        headerTintColor: theme.colors.onPrimary ?? '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerTitleAlign: 'center',
        headerTitle: () => <HeaderTitle />, // 🔥 Aqui define header padrão

        tabBarStyle: {
          backgroundColor: theme.colors.vermelhoPrincipal,
          height: 55,
        },
        tabBarActiveTintColor: theme.colors.onPrimary ?? '#fff',
        tabBarInactiveTintColor: theme.colors.onPrimary ?? '#fff',
        tabBarItemStyle: {
          alignItems: 'center',
          margin: 5,
        },
      }}
    >
      <Stack.Screen
        name="Gincanews"
        component={Home}
        options={{
          title: 'Página Inicial',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name="Calendario"
        component={Calendario}
        options={{
          title: 'Calendário',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name="Notícias"
        component={News}
        options={{
          title: 'Notícias',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{
          title: 'Conta',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={MainTheme}>
        <RootStack />
      </PaperProvider>
    </NavigationContainer>
  );
}
