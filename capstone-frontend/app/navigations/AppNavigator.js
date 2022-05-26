import { MealContextProvider } from "../services/MealContext";
import DrawerNavigator from "./DrawerNavigator";
import TabNavigator from "./TabNavigator";


const AppNavigator = () => {
    return (
        <MealContextProvider>
            <DrawerNavigator />
        </MealContextProvider>
    );
}

export default AppNavigator;