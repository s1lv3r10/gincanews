import { View, Image, Text } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './components/Home';
import Info from './components/Info';
import News from './components/News';
import Cronograma from './components/Cronograma';

import { BottomTabParams } from './utils/types';
import { ContainerStyles, MainTheme, ThemeType } from './utils/styles';
import Start from './components/Start';

import * as SecureStore from 'expo-secure-store'
import { createContext, useEffect, useMemo, useReducer } from 'react';
import { Api } from './utils/api';
import LoadingSplash from './components/LoadingSplash';

// Tipos dos forms de autenticacao
type LoginData = {
  email: string,
  senha: string,
}

type RegisterData = {
  nome: string,
  login: string,
  em: string,
  email: string,
  senha: string,
}

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

export const AuthContext = createContext(undefined)

function RootStack() {
  const theme = useTheme<ThemeType>();
  const [state, dispatch] = useReducer(
    (previousState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...previousState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...previousState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...previousState,
            isSignout: true,
            userToken: null,
          };
        }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  )

  useEffect(() => {
    (async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    })()
  }, [])

  // Os dados desses objetos do AuthContext vem da screen Start; ou do modal de cadastro, ou da tela de login
  const authContext = useMemo(() => ({
      // login
      signIn: async (data: LoginData) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        const api = new Api()
        const usuario = await api.AuthUsuario(data.email, data.senha) // ignorando o erro por agora

        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        await SecureStore.setItemAsync('userLogged', usuario.id_user.toString())

        dispatch({ type: 'SIGN_IN', token: usuario.id_user });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data: RegisterData) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        const api = new Api()
        await api.RegisterUsuario(data.email, data.senha, data.login, data.em, data.nome)
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data.nome });
      },
    }), [])

  return (
    <AuthContext.Provider value={authContext}>
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
          { 
            state.isLoading
            ? (
              <Stack.Screen name='LoadingSplash' component={LoadingSplash} />
            )
            : state.userToken == null
            ? (
                <Stack.Screen 
                  name='Start'
                  component={Start}
                />
            )
            : (
                <>
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
                    name="Cronograma"
                    component={Cronograma}
                    options={{
                      title: 'Cronograma',
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
                    name="Info"
                    component={Info}
                    options={{
                      title: 'Info',
                      tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="information-outline" color={color} size={size} />
                      ),
                    }}
                  />
                </>
            )
          }
      </Stack.Navigator>
    </AuthContext.Provider>
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
