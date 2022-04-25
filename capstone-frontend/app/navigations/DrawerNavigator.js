import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import ProfileScreen from '../screens/ProfileScreen';
import UserSettingScreen from '../screens/UserSettingScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main" drawerContent={props => <CustomDrawer {...props} />} >
        <Drawer.Screen name="Main" component={TabNavigator} options={{ title: 'Health App' }}/>
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Setting" component={UserSettingScreen} />
  </Drawer.Navigator>
  );
}

export default DrawerNavigator;