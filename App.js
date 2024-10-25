import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Logout from './screens/Logout';
import Details from './screens/Details';
import ThemeContext, { themeContext } from './context/ThemeContext';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function DashboardNavigator() {
  const { theme, toggleHandler } = useContext(themeContext);
  function handleIcon() {
    toggleHandler();
  }

  function header() {
    return (
      <Pressable onPress={handleIcon}>
        {
          theme === 'dark' ?
            <Icon name="sun-o" size={30} color={'black'} />
            :
            <Icon name="moon-o" size={30} color={'black'} />
        }
      </Pressable>
    );
  }
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{
        headerRight: () => { header(); },
      }} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <ThemeContext>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={DashboardNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={Details} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext>
    </>
  );
}
