import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import PlanScreen from '../screens/PlanScreen';
import TrackScreen from '../screens/TrackScreen';
import RecipeScreen from '../screens/RecipeScreen';

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
              iconName = 'clipboard';
            } else if(route.name === 'Track'){
                iconName = 'stats-chart-sharp'
            } else if(route.name === 'Recipe'){
                iconName = 'restaurant'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#C04CFD',
          tabBarInactiveTintColor: 'gray',
          headerShown : false
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Plan" component={PlanScreen} />
        <Tab.Screen name="Track" component={TrackScreen} />
        <Tab.Screen name="Recipe" component={RecipeScreen} />
      </Tab.Navigator>
    );
}

export default TabNavigator;