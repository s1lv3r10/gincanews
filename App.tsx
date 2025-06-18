import { StyleSheet, Text, View, Image } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './components/Home';
import User from './components/User';
import News from './components/News'
import { BottomTabParams } from './utils/types';
import { ContainerStyles, MainTheme, ThemeType } from './utils/styles';
import Calendario from './components/Calendario';

const Stack = createBottomTabNavigator<BottomTabParams, 'Nav'>()

function RootStack() {
  const theme = useTheme<ThemeType>()
  return (
    <Stack.Navigator
      id='Nav'
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
        tabBarStyle: {
          backgroundColor: theme.colors.vermelhoPrincipal,
          height: 55,
        },
        tabBarActiveTintColor: theme.colors.onPrimary ?? '#fff',
        tabBarInactiveTintColor: theme.colors.onPrimary ?? "#fff",
        tabBarItemStyle:{
          alignItems: 'center',
          margin: 5,
        }
      }}
    >
      <Stack.Screen
        name='Gincanews'
        component={Home}
        options={{
          title: 'Pagina Inicial',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerTitle:()=><Image 
            source={require('./img/Logo.jpg')}
            style={ContainerStyles.logoHome}
          />
        }}
      />
      <Stack.Screen
        name='Calendario'
        component={Calendario}
        options={{
          title: 'Calendário',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name='Notícias'
        component={News}
        options={{
          title: 'Notícias',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name='User'
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
