import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './components/Home';
import User from './components/User';

import { BottomTabParams } from './utils/types';
import { MainTheme } from './utils/styles';

const Stack = createBottomTabNavigator<BottomTabParams, 'Nav'>()

function RootStack() {
  return (
    <Stack.Navigator 
      id='Nav'
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name='Gincanews' component={Home} 
        options={{title: 'Inicio'}}
      />
      <Stack.Screen name='Calendario' component={User} 
        options={{title: 'Calendario'}} 
      />
      <Stack.Screen name='Eventos' component={User} 
        options={{title: 'Eventos'}} 
      />
      <Stack.Screen name='User' component={User} 
        options={{title: 'Central de contas'}} 
      />
    </Stack.Navigator>
  )
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
