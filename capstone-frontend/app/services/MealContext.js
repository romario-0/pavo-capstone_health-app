import { createContext, useContext, useState } from "react"
import { AuthenticationContext } from "./AuthenticationContext";

export const MealContext = createContext();

export const MealContextProvider = ({children}) => {

    const {userToken} = useContext(AuthenticationContext);
    const [userMeals, setUserMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const path = 'https://ultimate-health-app.herokuapp.com/';

    const addUserMeals = (meal) => {
        setIsLoading(true);
          //const token = await SecureStore.getItemAsync('token');
          if(userToken != null){
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'authorization' : userToken },
              body: JSON.stringify(meal)
            };
            fetch(path+'meal/addMeal', requestOptions).then(res => res.json()).then(async data => {
              if(data.message){
                data.message;
              }else{
                setError(data.message);
              }
              false;
            });
          }
          setIsLoading(false);        
    }

    const fetchUserMeals = () => {
        setIsLoading(true);
        
        //const token = await SecureStore.getItemAsync('token');
        if(userToken != null){
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'authorization' : userToken },
            };
            fetch(path+'meal/getMealList', requestOptions).then(res => res.json()).then(async data => {
                if(data.mealList){
                    setUserMeals(data.mealList);
                }else{
                setError(data.message);
                }
            });
        }

        setIsLoading(false);
    }

    const isUserMeal = (mealId) => {
        const index = userMeals.findIndex(ele => ele.mealApiId == mealId);
        if(index < 0){
            return false;
        }else{
            return true;
        }
    }

    return (
        <MealContext.Provider
            value={{userMeals,
                isLoading,
                error,
                addUserMeals,
                fetchUserMeals,
                isUserMeal
            }}
        >
            {children}
        </MealContext.Provider>
    );
}