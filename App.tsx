import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './components/Home';

import User from './components/User';
import { UserProps } from './components/User';

const Stack = createBottomTabNavigator<{
  Gincanews: undefined,
  Usuário: UserProps, 
}, 'Nav'>()

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
      <Stack.Screen name='Gincanews' component={Home} />
      <Stack.Screen name='Usuário' component={User} initialParams={{login: {username:'A'}}} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
