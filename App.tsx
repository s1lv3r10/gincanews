import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import User from './components/User';

const Stack = createBottomTabNavigator<{
  Gincanews: undefined,
  User: undefined
}, 'Nav'>()

function RootStack() {
  return (
    <Stack.Navigator id='Nav'>
      <Stack.Screen name='Gincanews' component={Home} />
      <Stack.Screen name='User' component={User} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
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
