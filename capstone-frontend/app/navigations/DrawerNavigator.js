import { createDrawerNavigator } from '@react-navigation/drawer';
import { useContext } from 'react';
import CustomDrawer from '../components/CustomDrawer';
import ProfileScreen from '../screens/ProfileScreen';
import UserMealScreen from '../screens/UserMealScreen';
import UserSettingScreen from '../screens/UserSettingScreen';
import { MealContext } from '../services/MealContext';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {fetchUserMeals} = useContext(MealContext);

  fetchUserMeals();

  return (
    <Drawer.Navigator initialRouteName="Main" drawerContent={props => <CustomDrawer {...props} />} >
        <Drawer.Screen name="Main" component={TabNavigator} options={{ title: 'Health App' }}/>
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Setting" component={UserSettingScreen} />
        <Drawer.Screen name="My Meals" component={UserMealScreen} />
  </Drawer.Navigator>
  );
}

export default DrawerNavigator;