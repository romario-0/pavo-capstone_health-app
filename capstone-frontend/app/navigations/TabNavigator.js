import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import PlanScreen from '../screens/PlanScreen';
import TrackScreen from '../screens/TrackScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Plan') {
              iconName = 'create-outline';
            } else if(route.name === 'Track'){
                iconName = 'stats-chart-sharp'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Plan" component={PlanScreen} />
        <Tab.Screen name="Track" component={TrackScreen} />
      </Tab.Navigator>
    );
}

export default TabNavigator;