import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={TabNavigator} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
  </Drawer.Navigator>
  );
}

export default DrawerNavigator;