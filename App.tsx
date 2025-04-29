import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './components/Home';
import User from './components/User';

import { BottomTabParams } from './utils/types';

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
      <Stack.Screen name='Gincanews' component={Home} />
      <Stack.Screen name='User' component={User} options={{title: 'Central de contas'}} initialParams={{login: {username:'A'}}} />
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
