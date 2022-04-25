import { View, Text, Image, ScrollView, Button } from "react-native";
import useFetch from "../services/Fetch";

const MealRecipe = ({navigation, route}) => {
    let ingredientList = [];
    let recipe = null;
    const {foodID} = route.params;
    const {apiData, isLoading, serverError} = useFetch(`food/get-recipe?foodID=${foodID}`);
    if(apiData){
    recipe = apiData.data.meals[0];
    
    if(recipe){
        const regex = /[a-z]/ig
        for(let i=1; i<=20; i++){
            if(regex.test(recipe[`strIngredient${i}`])){
                ingredientList.push({ ingredient : recipe[`strIngredient${i}`], measure : recipe[`strMeasure${i}`]});
            }
        }
    }
    }

    const ingredientElements = ingredientList.map(item => (
        <Text>{item.ingredient} : {item.measure}</Text>
    ))

    const handleAddToList = () => {
        
    }

    return (
    apiData &&
    <ScrollView>
        <Image style={{height:200, width: 200}} source={{uri : recipe.strMealThumb}} />
        <Text>{recipe.strMeal}</Text>
        <Button title={'Add to My list'} onPress={handleAddToList} />
        <View>
            <Text>Category : {recipe.strCategory}</Text>
            <View>
                <Text>Ingredients</Text>
                {ingredientElements}
            </View>
            <Text>Instructions : {recipe.strInstructions}</Text>
            <Text>Youtube Link : {recipe.strYoutube}</Text>
        </View>
    </ScrollView>
    );
}

export default MealRecipe;