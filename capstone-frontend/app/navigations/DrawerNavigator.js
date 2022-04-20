import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import GoalScreen from '../screens/GoalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main" drawerContent={props => <CustomDrawer {...props} />} >
        <Drawer.Screen name="Main" component={TabNavigator} options={{ title: 'Home' }}/>
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Goal" component={GoalScreen} />
  </Drawer.Navigator>
  );
}

export default DrawerNavigator;