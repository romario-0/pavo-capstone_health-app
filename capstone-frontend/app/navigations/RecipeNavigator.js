import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryList from '../components/CategoryList';
import IngredientList from '../components/IngredientList';
import MealList from '../components/MealList';
import MealRecipe from '../components/MealRecipe';
import MealMenuScreen from '../screens/MealMenuScreen';

const Stack = createNativeStackNavigator();

const RecipeNavigator = () => {
    return(
        <Stack.Navigator headerMode="none">
            <Stack.Screen name={'MealMenu'} component={MealMenuScreen} />
            <Stack.Screen name={'IngredientList'} component={IngredientList} />
            <Stack.Screen name={'CategoryList'} component={CategoryList} />
            <Stack.Screen name={'MealList'} component={MealList} />
            <Stack.Screen name={'MealRecipe'} component={MealRecipe} />
        </Stack.Navigator>
    );
}

export default RecipeNavigator;